import NextAuth from "next-auth/next";
import nodemailer from "nodemailer";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import clientPromise from "../lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      scope: "email",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,

    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Ahmed" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (!credentials.email || !credentials.password) {
          throw new Error('Please enter your email and password');
        }

        const client = await clientPromise;
        const db = client.db('cmsdb'); // Replace with your database name
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user || !user.password) {
          throw new Error('No user found');
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url, baseUrl, provider }) {
        const transporter = nodemailer.createTransport(provider.server);
        const mailOptions = {
          from: provider.from,
          to: email,
          subject: "Email Verification",
          text: `Click the following link to verify your email: ${url}`,
          html: `<p>Click the following link to verify your email: <a href="${url}">${url}</a></p>`,
        };
        await transporter.sendMail(mailOptions);
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/LogIn",
  },
  callbacks: {
    async session({ token, user, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.role = token.role
        session.user.image = token.picture
        // Check if the user signed in with Google or Facebook
        if (user && (user.provider === "google" || user.provider === "facebook")) {
          session.user.verified = true; // Set the email as verified
        } else {
          session.user.verified = token.verified;
        }


        return session;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const client = await clientPromise;
        const db = client.db('cmsdb');
        const usersCollection = db.collection('users');

        const currentUser = await usersCollection.findOne({
          email: user.email,
        });

        if (!currentUser) {
          token.id = user.id;
          return token;
        }

        const googleAccount = (currentUser.accounts || []).find(
          (account) => account.provider === 'google'
        );
        const facebookAccount = (currentUser.accounts || []).find(
          (account) => account.provider === 'facebook'
        );

        return {
          id: currentUser._id, // Assuming your MongoDB uses "_id" as the primary key
          name: currentUser.name,
          email: currentUser.email,
          picture: currentUser.image,
          role: currentUser.role,
          verified:
            googleAccount !== undefined || facebookAccount !== undefined
              ? true
              : currentUser.emailVerified ?? false,
        };
      }

      return token;
    },

  },
  debug: process.env.NODE_ENV === "development",
};
export default NextAuth(authOptions)