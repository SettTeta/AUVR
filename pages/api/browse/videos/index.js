import { connect, model, models, Schema } from "mongoose"
const connectionString = process.env.MONGODB_URI


export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method);
    console.log("connectionString:", connectionString);


    if (req.method === 'GET') {
        const docs = await Video.find()
        res.status(200).json(docs)
        console.debug('connection', connectionString)
    } else if (req.method === 'POST') {
        // console.log(typeof(req.body))
        console.log("POST", req.body)
        const doc = await Video.create(req.body)
        res.status(201).json(doc)
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}



const videoSchema = new Schema(
    {
        title: String,
        link: String,
        desc: String,
        type: String,
        duration: String,
        thumbnail: String,
        location: String,
        dateOfUpload: String,
        player: String,
    },
    { strict: false }
);

console.log("Mongoose Models", models)
const Video = models?.video || model('video', videoSchema);