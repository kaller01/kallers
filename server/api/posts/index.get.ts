import Post from "~/server/models/Post";

export default defineEventHandler(async (event) => {
    try {
        return await Post.find().populate("cover", "paths").sort("-date");
    }
    catch (error) {
        return error
    }
})