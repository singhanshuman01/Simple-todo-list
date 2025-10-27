
const nodemailer = require('nodemailer');
require('dotenv').config();
const db = require('../config/db');

console.log(__dirname);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.APP_PASS
    }
});
const tasks = {};

const r = async function () {
    try {
        const result = await db.pool.query("select u.email, i.title from users u join items i on u.id=i.user_id where i.target=CURRENT_DATE+INTERVAL '1 day' order by u.email");
        for (let row of result.rows) {
            if (!tasks[row.email]) tasks[row.email] = [];
            tasks[row.email].push(row.title);
        }
        console.log(tasks);
        for (let [email, task] of Object.entries(tasks)) {
            const msg = `Your tasks for tomorrow are: ${task.join(', ')}`;
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Your tasks for tomorrow',
                html: msg
            });
            console.log(`Email sent to ${email}: the tasks ${msg}`);
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = r;