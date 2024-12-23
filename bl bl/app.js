const express = require('express');
const app = express();

// In-memory database (MongoDB ছাড়া)
let teaches = [];

// Teach অ্যাড করার API
app.get('/bby/teach', (req, res) => {
    const { teach, reply } = req.query;

    // Teach এবং reply প্যারামিটার চেক করা
    if (!teach || !reply) {
        return res.json({ error: "Both 'teach' and 'reply' parameters are required." });
    }

    // Teach ইন-মেমরি ডেটাবেসে অ্যাড করা
    teaches.push({ teach, reply });
    res.json({
        message: "added successfully",
        teach: teach,
        reply: reply
    });
});

// Teach রিমুভ করার API
app.get('/bby/remove-teach', (req, res) => {
    const { teach } = req.query;

    // Teach প্যারামিটার চেক করা
    if (!teach) {
        return res.json({ error: "Teach parameter is required." });
    }

    // Teach মুছে ফেলা
    const index = teaches.findIndex(t => t.teach === teach);
    if (index === -1) {
        return res.json({ error: `Teach '${teach}' not found.` });
    }

    teaches.splice(index, 1); // Teach মুছে ফেলা
    res.json({
        message: `Teach '${teach}' removed successfully.`,
        teaches: teaches
    });
});

// Teach গুলোর তালিকা দেখানোর API
app.get('/bby/list-teach', (req, res) => {
    if (teaches.length === 0) {
        return res.json({ message: "No teaches found." });
    }

    res.json({
        message: "Current teaches:",
        teaches: teaches
    });
});

// Msg এর সাথে reply দেখানোর API
app.get('/bby/msg', (req, res) => {
    const { msg } = req.query;

    if (!msg) {
        return res.json({ error: "Message parameter is required." });
    }

    const teachData = teaches.find(t => t.teach === msg);
    if (!teachData) {
        return res.json({ error: `No teach found for message: '${msg}'.` });
    }

    res.json({
        message: ` '${msg}`,
        reply: teachData.reply
    });
});

// সার্ভার চালু করা
const PORT = process.env.PORT || 30001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
