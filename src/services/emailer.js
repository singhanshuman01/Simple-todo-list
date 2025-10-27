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
        const { rows } = await db.pool.query(`
            SELECT u.email, i.title FROM users u
            JOIN items i ON u.id=i.user_id
            WHERE i.target = CURRENT_DATE + INTERVAL '1 day'
            ORDER BY u.email
        `);

        if (!rows?.length) {
            console.log(`No tasks for tomorrow`);
            return;
        }

        for (const { email, title } of rows) {
            if (!email || !title) continue;
            (tasks[email] ||= []).push(title);
        }

        if (Object.keys(tasks).length === 0) {
            console.log(`No valid entries`);
            return;
        }

        await Promise.all(Object.entries(tasks).map(async ([email, tasklist]) => {
            const msg = `
                <h2>Your tasks for tomorrow</h2>
                ${tasklist.join(', ')}
            `;
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: 'Task List',
                    html: msg
                });
                console.log(`Email sent to ${email}`);
            } catch (err) {
                console.error(`Failed to send mail to ${email}:`, err.message);
            }
        }));
    } catch (err) {
        console.error('DB error');
    }
}


module.exports = r;