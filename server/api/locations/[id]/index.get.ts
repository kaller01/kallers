import Location from "~/server/models/Location";

export default defineEventHandler(async (event) => {
    try {
        return await Location.findById(event.context.params?.id);
    }
    catch (error) {
        return error
    }
})