import nodemailer from "nodemailer";
import { EMAIL_SMTP_HOST, EMAIL_SMTP_PORT, EMAIL_SMTP_USER, EMAIL_SMTP_PASS, EMAIL_SMTP_SECURE, EMAIL_SMTP_SERVICE_NAME } from "../env";
import ejs from "ejs";
import path from "path";

const transporter = nodemailer.createTransport({
    host: EMAIL_SMTP_HOST,
    port: EMAIL_SMTP_PORT,
    secure: EMAIL_SMTP_SECURE,
    auth: {
        user: EMAIL_SMTP_USER,
        pass: EMAIL_SMTP_PASS
    },
    requireTLS: true,
} as any);


export interface Isendmail {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export const sendmail = async ({ ...mailparams }: Isendmail) => {

    const result = await transporter.sendMail({
        ...mailparams
    })

    return result;
}


export const renderContentMail = async (template: string, data: any) : Promise<string> => {
    try {
        const content = await ejs.renderFile(path.join(__dirname, `templates${template}`), data);
        return content as string;
    } catch (error) {
        console.error("Error rendering email template:", error);
        throw error;
    }
}
