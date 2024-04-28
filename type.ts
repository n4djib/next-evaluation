declare namespace NodeJS {
  export interface ProcessEnv {
    APP_NAME: string;
    DATABASE_URL: string;
    AUTH_SECRET: string;
    SMTP_EMAIL: string;
    SMTP_PASS: string;
    NEXT_PUBLIC_BASE_URL: string;
    JWT_USER_ID_SECRET: string;
    JWT_EXPIRY_TIME: string | number;
    JWT_RESET_PASS_EXPIRY_TIME: string | number;
  }
}
