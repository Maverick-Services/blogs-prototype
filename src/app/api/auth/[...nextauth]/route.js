// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodbClient';       // ← the MongoClient helper
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { authOptions as sharedOptions } from '@/lib/nextAuthOptions';

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize({ email, password }) {
                // use your mongoose connectDB + model
                await import('@/lib/mongodb').then(m => m.connectDB());
                const user = await User.findOne({ email }).select('+password');
                if (!user) throw new Error('No user found');
                if (user.provider !== 'credentials') throw new Error('Please sign in with Google');
                const valid = await bcrypt.compare(password, user.password);
                if (!valid) throw new Error('Invalid credentials');
                return user;
            }
        })
    ],
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
    callbacks: sharedOptions.callbacks,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


















// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import User from '@/models/userModel';
// import bcrypt from 'bcryptjs';
// import { connectDB } from '@/lib/mongodb';

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials) {
//                 try {

//                     await connectDB();
//                     const user = await User.findOne({ email: credentials.email })
//                         .select('+password');

//                     if (!user) throw new Error('No user found');

//                     if (user.provider !== 'credentials') throw new Error('Use Google Sign-In');

//                     if (user.provider === 'credentials') {
//                         const isValidPassword = await bcrypt.compare(
//                             credentials.password,
//                             user.password
//                         )
//                         if (!isValidPassword) throw new Error('Invalid credentials');
//                     }

//                     return user;
//                 } catch (error) {
//                     return null
//                 }
//             }
//         })
//     ],
//     callbacks: {
//         async signIn({ user, account }) {
//             if (account.provider === 'google' && user.role !== 'user') {
//                 return false;
//             }
//             return true;
//         },

//         async jwt({ token, user }) {
//             if (user) {
//                 token.role = user.role;
//                 token.permissions = user.permissions;
//                 const maxAge = user.role === 'user' ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
//                 token.exp = Math.floor(Date.now() / 1000) + maxAge;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.user.role = token.role;
//             session.user.permissions = token.permissions;
//             return session;
//         }
//     },
//     session: { strategy: 'jwt' },
//     secret: process.env.NEXTAUTH_SECRET
// };