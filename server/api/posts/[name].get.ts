import Post from "~/server/models/Post";

export default defineEventHandler(async (event) => {
    try {
        const name = event.context.params?.name;
        const post = await Post.findOne({ link: name }).populate("cover", "paths").populate("photos", "paths");
        return { post };
    }
    catch (error) {
        return error
    }
})