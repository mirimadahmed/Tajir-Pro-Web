import 'next-auth';
import type { DefaultSession, DefaultUser } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
    } & DefaultSession['user'];
    accessToken: string;
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  }
} 