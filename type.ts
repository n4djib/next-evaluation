declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    AUTH_SECRET: string;
    SMTP_EMAIL: string;
    SMTP_NAME: string;
    SMTP_PASS: string;
    NEXT_PUBLIC_BASE_URL: string;
    JWT_USER_ID_SECRET: string;
  }
}
