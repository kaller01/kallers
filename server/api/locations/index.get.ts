import Location from "~/server/models/Location";

export default defineEventHandler(async (event) => {
    try {
        const locations = await Location.find().sort("-rating");
        return locations.reduce((result: any, p: any) => {
            result[p._id] = p;
            return result;
        }, {});
    }
    catch (error) {
        return error
    }
})