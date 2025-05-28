// lib/nextAuthOptions.js

export const authOptions = {
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google' && user.role !== 'user') {
                return false;
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.permissions = Object.fromEntries(user.permissions);

                const maxAge = user.role === 'user' ? 60 * 60 * 24 * 30 : 60 * 60;
                token.exp = Math.floor(Date.now() / 1000) + maxAge;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.role = token.role;
            session.user.permissions = token.permissions;
            return session;
        }
    }
};
