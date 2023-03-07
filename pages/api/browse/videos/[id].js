import { connect, model, models, Schema } from "mongoose"
const connectionString = process.env.MONGODB_URI


export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)
    console.log("req.query.id", req.query.id)

    const id = req.query.id
    if (req.method === 'GET') {
        // Get only one document
        const doc = await Video.findOne({ _id: id })
        res.status(200).json(doc)
    }  else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)

    }
}



const videoSchema = new Schema({
    title: String,
    link: String,
    desc: String,
    type: Boolean,
    duration: String,
    thumbnail: String,
    location: String,
    dateOfUpload: String,
});

console.log("Mongoose Models", models)
const Video = models?.video || model('video', videoSchema);