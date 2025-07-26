import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
const Schema = mongoose.Schema;
import { sendmail, renderContentMail } from "../utils/mail/mail";
import { FRONTEND_URL, EMAIL_SMTP_USER } from "../utils/env";
export interface User {
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string;
    isActive: boolean;
    activationCode: string;
}

const userSchema = new Schema<User>({
    fullName: {
        type: Schema.Types.String,
        required: true
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.String,
        enum: ["admin", "user"],
        default: "user"
    },
    profilePicture: {
        type: Schema.Types.String,
        default: "userDefault.png"
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: false
    },
    activationCode: {
        type: Schema.Types.String,

    },
}, {
    timestamps: true
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}
userSchema.pre("save", function (next) {
    const user = this;
    
    // Generate activation code if not exists
    if (!user.activationCode) {
        user.activationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    // Encrypt password
    user.password = encrypt(user.password);
    next();
});

userSchema.post("save", async function (doc, next) {
   try {
    const user = doc;
    console.log(`send email to ${user.email} with activation code ${user.activationCode}`);
    
    // Ensure user has activation code
    if (!user.activationCode) {
        console.log("No activation code found, skipping email");
        return next();
    }
    
    const contentMail = await renderContentMail("/registrasion-success.html", {
        fullName: user.fullName,
        verifyUrl: `${FRONTEND_URL}/auth/verify-email?code=${user.activationCode}`
    });

    await sendmail({
        from: EMAIL_SMTP_USER,
        to: user.email,
        subject: "Activate your account",
        html: contentMail
    });
    
    console.log("Email sent successfully");
    next();
   } catch (error) {
    console.error("Error sending email:", error);
    // Don't fail the save operation if email fails
    next();
   }
})



const UserModel = mongoose.model("User", userSchema);

export default UserModel;