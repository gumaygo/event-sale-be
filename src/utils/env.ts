import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL || "mongodb://localhost:27017/event-sale";
export const PORT = process.env.PORT || 3000;
export const SECRET = process.env.SECRET || "your-secret-key-change-this-in-production";

// Email configuration
export const EMAIL_SMTP_HOST = process.env.EMAIL_SMTP_HOST || "";
export const EMAIL_SMTP_PORT = process.env.EMAIL_SMTP_PORT || 465;
export const EMAIL_SMTP_USER = process.env.EMAIL_SMTP_USER || "";
export const EMAIL_SMTP_PASS = process.env.EMAIL_SMTP_PASS || "";
export const EMAIL_SMTP_SECURE = process.env.EMAIL_SMTP_SECURE === "true" || false;
export const EMAIL_SMTP_SERVICE_NAME = process.env.EMAIL_SMTP_SERVICE_NAME || "Zoho";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";