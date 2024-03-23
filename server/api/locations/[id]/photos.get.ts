import Photo from "~/server/models/Photo";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;
        const photos = await Photo.find({ location: id }).select('_id');
        return photos.map((p: any) => p._id);
    }
    catch (error) {
        return error
    }
})