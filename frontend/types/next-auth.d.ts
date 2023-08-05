// my-project/types/next-auth.d.ts

import NextAuth from 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        token?: string,
        isAdmin?: boolean,
        email?: string,
        isLogin?: boolean,
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        token?: string,
        isAdmin?: boolean,
        email?: string,
        isLogin?: boolean,
    }
}