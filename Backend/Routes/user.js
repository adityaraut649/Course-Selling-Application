const { Router } = require('express');
const userRoutes = Router();
const { userModel } = require('../db');
const { purchaseModel } = require('../db');
const { userMiddleware } = require('../middleware/user')

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const z = require("zod");
const { JWT_USER_PASSWORD } = require("../config")
userRoutes.post('/signup', async (req, res) => {

    const Usersignup = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        firstName: z.string().min(3),
        lastName: z.string().min(3),
    });

    const parsedData = Usersignup.safeParse(req.body);

    if (!parsedData.success) {
        return res.json({
            message: "Incorrect data format",
            error: parsedData.error,
        });
    }

    const { email, password, firstName, lastName } = req.body;

    const hashpassword = await bcrypt.hashSync(password, 5);

    try {

        const user = await userModel.create({
            email,
            password: hashpassword,
            firstName,
            lastName,
        });
        res.json({
            message: "Signup Successfull",
            user
        });
    } catch (e) {
        res.json({
            message: "Signup Failed",
            error: e.message,
        });
    }
});

userRoutes.post('/signin', async (req, res) => {

    const Usersignin = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const parsedData = Usersignin.safeParse(req.body);

    if (!parsedData.success) {
        return res.json({
            message: "Incorrect data format",
            error: parsedData.error,
        });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({
            email,
        });

        console.log(user);
        if (!user) {
            return res.status(403).json({
                message: "Invalid Credentials",
            });
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(403).json({
                message: "Invalid Password",
            });
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_USER_PASSWORD);

        res.status(200).json({
            token,
        });
    } catch (e) {
        res.status(403).json({
            message: "Invalid Credentials",
        });
    }
});

userRoutes.get('/purchases', userMiddleware, async (req, res) => {

    try {
        const userId = req.userId;

        const purchase = await purchaseModel.find({
            userId: userId
        });

        if (!purchase) {
            return res.status(404).json({
                message: "No purchases found"
            });
        }


        const purchases = purchase.map((p) => p.courseId);

        const coursesData = await courseModel.find({
            _id: {
                $in: purchases
            }
        });

        res.json({
            message: "Purchases found",
            purchases: coursesData
        });
    } catch (e) {
        res.status(500).json({
            message: "No purchases found",
            error: e.message
        });
    }
});

module.exports = {
    userRoutes: userRoutes
}