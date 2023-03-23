// models/category.js
import { model, models, Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: String,
    }
);

const Category = models?.category || model("categories", categorySchema);

export default Category;
