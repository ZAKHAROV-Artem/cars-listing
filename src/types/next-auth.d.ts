import NextAuth from "next-auth";
declare module "next-auth" {
  interface JWT {
    /** OpenID ID Token */
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      createdAt: Date;
      updatedAt: Date;
      name: string;
      phone: string;
      seller_type?: string;
    };
  }
  interface Session {
    token: JWT;
  }
  interface User {
    id: string;
    jwt: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      createdAt: Date;
      updatedAt: Date;
      name: string;
      phone: string;
      seller_type?: string;
    };
  }
}
