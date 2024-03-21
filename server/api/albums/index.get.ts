import Collection from "~/server/models/Collection";

export default defineEventHandler(async (event) => {
    try {
        return await Collection.find().populate("cover", "paths");
    }
    catch (error) {
        return error
    }
})