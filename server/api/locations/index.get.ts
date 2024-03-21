import Location from "~/server/models/Location";

export default defineEventHandler(async (event) => {
    try {
        return await Location.find()
            .populate("cover", "paths")
            .sort("-rating");
    }
    catch (error) {
        return error
    }
})