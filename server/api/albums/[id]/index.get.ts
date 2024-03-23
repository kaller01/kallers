import Collection from "~/server/models/Collection";

export default defineEventHandler(async (event) => {
    try {
        return await Collection.findById(event.context.params?.id)
    }
    catch (error) {
        return error
    }
})