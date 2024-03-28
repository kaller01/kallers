import Collection from "~/server/models/Collection";

export default defineEventHandler(async (event) => {
    try {
        var albums = await Collection.find();
        return albums.reduce((result: any, p: any) => {
            result[p._id] = p;
            return result;
        }, {});
    }
    catch (error) {
        return error
    }
})