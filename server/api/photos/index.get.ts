import Photo from "~/server/models/Photo"

export default defineEventHandler(async (event) => {
    try {
        return await Photo.find().populate("location", "title").populate("collections", "title").sort("-date");
    }
    catch (error) {
        return error
    }
})