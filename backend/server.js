const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Contact = require('./contact');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.post("/api/contacts", async (req, res) => {
    const contact = await Contact.create(req.body);
    res.send(contact);
});

app.get("/api/contacts", async (req, res) => {
    const contacts = await Contact.find(req.body);
    res.send(contacts);
});

app.put("/api/contacts/:id", async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.send(contact);
});

app.delete("/api/contacts/:id", async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.send({ message: "Deleted" });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});