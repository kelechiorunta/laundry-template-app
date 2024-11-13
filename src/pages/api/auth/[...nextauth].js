import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// import { FirestoreAdapter } from '@next-auth/firebase-adapter'; // Uncomment if needed
// import { db } from '@/app/Firebase/firebase.config'; // Uncomment if needed

export const AuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email',
             redirect_uri: process.env.NEXT_URL
            
        },
      },
    }),
  ],
  // adapter: FirestoreAdapter(db), // Uncomment if needed
  secret: process.env.NEXT_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/',  // Custom sign-in page
    signOut: '/login',// Custom sign-out redirect
  },
  callbacks: {
    async redirect({ url, baseUrl, session }) {
    
      // Log information for debugging
      console.log('Redirect callback triggered:', { url, baseUrl });
    //   if (!session){
    //     return `${baseUrl}/about`;
    //   }
        return `${baseUrl}`;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.picture;
      }
      if (account?.provider === 'google') {
        token.idToken = account.id_token; // Store the Google OAuth token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.picture = token.picture;
      session.idToken = token.idToken; 
      return session;
    },
  },
  debug: true,
};

export default NextAuth(AuthConfig)