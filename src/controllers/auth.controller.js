import userModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../service/mail.service.js";


export async function registerUser(req, res) {

    try {
        const { username, email, password } = req.body;

        const isUserAlreadyExits = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserAlreadyExits) {
            return res.status(400).json({
                message: "User with this email or username already exits",
                success: false,
                err: "User already exists"
            });
        }

        // create user 
        const user = await userModel.create({ username, email, password });

        // send mail
        await sendMail({
            to: email,
            subject: "Verify your email address in perflexity clone",
            html: `
        <h1>hii ${username} verify your email address</h1>
        <p>Click on the link below to verify your email address</p>`
        })

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            err: error
        });
    }
}