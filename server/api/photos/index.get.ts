import Photo from "~/server/models/Photo"

export default defineEventHandler(async (event) => {
    try {
        const photos = await Photo.find().populate("location", "title").populate("collections", "title").sort("-date");
        return photos.reduce((result: any, p: any) => {
            result[p._id] = p;
            return result;
        }, {});
    }
    catch (error) {
        return error
    }
})