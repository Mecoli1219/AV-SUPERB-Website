import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios';

type BackendResponse = {
    isAdmin: boolean;
    email: string;
    access_token: string;
    message: string;

}

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        maxAge: 1 * 60 * 60,
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async jwt({ token, user, account }) {
            // Persist the OAuth access_token to the token right after signin

            if (account) {
                // send id token to backend
                const response = await axios.post(`${process.env.BACKEND_URL}/api/user/login`, {
                    id_token: account.id_token,
                });
                const text = response.data as BackendResponse;
                // log error message
                token.isAdmin = text.isAdmin;
                token.email = text.email;
                token.token = text.access_token;
                token.isLogin = !!text.access_token;;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.isAdmin = token.isAdmin;
            session.email = token.email;
            session.token = token.token;
            session.isLogin = token.isLogin;
            return session;
        },
    }
})