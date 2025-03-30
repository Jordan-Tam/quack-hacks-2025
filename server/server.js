import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getAllCourses } from '../data/mongodb_functions/courses.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const exampleUser = {
    email: 'rraj5@stevens.edu',
    password: '1234567890',
};

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt: ${email}`);

    if (email === exampleUser.email && password === exampleUser.password) {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
    }
});

app.get('/course', async (req, res) => {
    try {
        const courses = await getAllCourses();
        console.log(courses);
        res.json(courses);
    } catch (err) {
        // console.error(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
