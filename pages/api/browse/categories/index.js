// pages/api/categories/index.js
import { connect } from "mongoose";
import Category from "../../../../models/category";

const connectionString = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method);

    if (req.method === "GET") {
        const docs = await Category.find();
        res.status(200).json(docs);
    } else if (req.method === "POST") {
        const doc = await Category.create(req.body);
        res.status(201).json(doc);
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
