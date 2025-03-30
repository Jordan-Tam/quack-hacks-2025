import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

app.use(cors());
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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
