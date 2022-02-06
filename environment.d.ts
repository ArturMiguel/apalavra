declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_CONNECT_URL: string;
    }
  }
}

export { }