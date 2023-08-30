declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_URI: string;
      NEXTAUTH_SECRET: string;
      JWT_SECRET: string;
    }
  }
}
export {};
