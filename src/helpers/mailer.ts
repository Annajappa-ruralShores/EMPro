import UserModel from "@/models/usermodel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendMailer = async ({ Email, emailType, userId }: { Email: string, emailType: string, userId: string }) => {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await UserModel.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })

        }

        else if (emailType === "RESET") {
            await UserModel.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525, // true for 465, false for other ports
            auth: {
                user: "d99a45edbe997b",
                pass: "494be80cf83ea3",
            },
        });

        const mailOptions = {
            from: "annajappa.gadige@gmail.com",
            to: Email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>
            <p>${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</p>`,
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;


    } catch (error: any) {
        throw new Error(error.message)
    }

}