import NextAuth from 'next-auth'
import InstagramProvider from 'next-auth/providers/instagram'

const handler = NextAuth({
  providers: [
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID || '',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.username) {
        token.username = account.username as string
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub
        session.user.username = token.username
      }
      return session
    },
  },
})

export { handler as GET, handler as POST } 