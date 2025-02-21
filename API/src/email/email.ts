import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

export const sendConfirmationEmail = async (email : string, token: string) => { 
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject:"Confirmation d'inscription",
        html:
        `
        <div style="font-family: Inter, sans-serif; text-align: center; padding: 20px;">
            <h1 style="color: #023D29;">Bienvenue sur ShopCart !</h1>
            <p style="margin: 10px 0px">Nous sommes ravis de vous compter parmi nous.</p>
            <p>Pour activer votre compte, cliquez sur le bouton ci-dessous :</p>
            <a href="http://localhost:5000/api/users/verifyMail/${token}" style="display: inline-block; padding: 10px 20px; background-color: #023D29; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Activer mon compte
            </a>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">Si vous n'avez pas fait cette demande, ignorez cet e-mail.</p>
        </div>
        `
    }
    await transporter.sendMail(mailOptions)
}
export const sendValidationAccount = async (email : string) => { 
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject:"Votre compte a été créé chez Shopcart",
        html:
        `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h1 style="color: #023D29;">Bienvenue sur ShopCart !</h1>
            <p style="margin: 10px 0px">Nous sommes ravis de vous compter parmi nous.</p>
            <p>Vous pouvez continuer vos achats sur notre site</p>
            <a href="http://localhost:5173" style="display: inline-block; padding: 10px 20px; background-color: #023D29; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Voir notre site
            </a>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">Si vous n'avez pas fait cette demande, ignorez cet e-mail.</p>
        </div>
        `
    }
    await transporter.sendMail(mailOptions)
}
export const sendInvalidToken = async (email : string) => { 
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject:"Problème lors de la validation de vortre compte.",
        html:
        `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h1 style="color: #023D29;">Le temps d'inscription a expiré</h1>
            <p style="margin: 10px 0px">Problème de votre inscription, cliquez sur le lien pour recommencer votre inscription.</p>

            <a href="http://localhost:5173/signup" style="display: inline-block; padding: 10px 20px; background-color: #023D29; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
                S'inscrire de nouveau
            </a>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">Si vous n'avez pas fait cette demande, ignorez cet e-mail.</p>
        </div>
        `
    }
    await transporter.sendMail(mailOptions)
}