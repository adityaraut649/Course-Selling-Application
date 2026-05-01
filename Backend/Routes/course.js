const { Router } = require('express');
const courseRoutes = Router();


const { purchaseModel , courseModel} = require('../db');

const { userMiddleware } = require('../middleware/user');
const { ca } = require('zod/v4/locales');

courseRoutes.post('/purchase', userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

        const bodySchema = z.object({
            courseId: z.string().min(5)
        });

        const parsed = bodySchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid input",
                error: parsed.error
            });
        }

        const { courseId } = parsed.data;

        // Check course exists
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check duplicate purchase
        const existingPurchase = await purchaseModel.findOne({
            userId,
            courseId
        });

        if (existingPurchase) {
            return res.status(400).json({
                message: "You have already bought this course"
            });
        }

        await purchaseModel.create({
            userId,
            courseId
        });

        res.status(200).json({
            message: "Course purchased successfully"
        });

    } catch (e) {
        res.status(500).json({
            message: "Internal server error",
            error: e.message
        });
    }
});

courseRoutes.get('/preview', async (req, res) => {
    try {
        const courses = await courseModel.find({});

        res.json({
            message: "Courses found",
            courses
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch courses"
        });
    }
});


module.exports = {
    courseRoutes: courseRoutes
}