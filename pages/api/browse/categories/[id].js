// pages/api/categories/[id].js
import { connect } from "mongoose";
import Category from "../../../../models/category";

const connectionString = process.env.MONGODB_URI;
set('strictQuery', false);

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method);
    console.log("req.query.id", req.query.id);

    const id = req.query.id;
    if (req.method === "GET") {
        const doc = await Category.findOne({ _id: id });
        res.status(200).json(doc);
    } else if (req.method === "DELETE") {
        const deletedDoc = await Category.deleteOne({ _id: id });
        res.status(200).json(deletedDoc);
    } else if (req.method === "PUT") {
        const updatedDoc = await Category.updateOne({ _id: id }, req.body);
        res.status(200).json(updatedDoc);
    } else {
        res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
