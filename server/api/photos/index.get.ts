import Photo from "~/server/models/Photo"

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);

        const filter: any = {}

        if (query.collection) {
            filter.collections = query.collection;
        }
        if (query.location) {
            filter.location = query.location;
        }

        const photos = await Photo.find(filter).populate("location", "title").populate("collections", "title").sort("-date");
        return photos.reduce((result: any, p: any) => {
            result[p._id] = p;
            return result;
        }, {});
    }
    catch (error) {
        return error
    }
})