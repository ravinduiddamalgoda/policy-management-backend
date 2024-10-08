const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

app.use(express.json());
//app.use(cookieParser());
dotenv.config({ path: './.env' });


dotenv.config();


const port = process.env.PORT || 3400;
const url = process.env.MONGODB_URL;
app.use(express.static('./public'));

async function connectDB(url, connectionParams) {
    await mongoose.connect(url, connectionParams);
    console.log('Database Connected');
}

app.use(cors());

app.use(bodyParser.json());



connectDB(url, {})
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Connection Error', err);
});

app.use('/api/user', require('./src/routes/user.route'));
app.use('/api/mcq', require('./src/routes/mcq.route'));
app.use('/api/quiz', require('./src/routes/quiz.route'));
app.use('/api/policy', require('./src/routes/policy.route'));
app.use('/api/quiz-history', require('./src/routes/user.quiz.route'));
app.use('/api/department', require('./src/routes/department.route'));
app.use('/api/auth' , require('./src/routes/auth.route'));

