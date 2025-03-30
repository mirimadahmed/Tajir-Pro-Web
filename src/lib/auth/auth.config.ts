import type { AuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { User } from 'next-auth';
import type { Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { apiClient } from '../api/client';

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Use the external API endpoint for authentication
          const response = await apiClient.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          if (!response.user) {
            return null;
          }

          return {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            token: response.token,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
    newUser: '/auth/register',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 