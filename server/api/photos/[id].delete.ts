import Photo from "~/server/models/Photo";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;
        return await Photo.deleteOne({ _id: id });
    }
    catch (error) {
        return error
    }
})