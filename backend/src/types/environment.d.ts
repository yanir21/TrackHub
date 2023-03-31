export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_USERNAME: string;
      MONGO_PASSWORD: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
