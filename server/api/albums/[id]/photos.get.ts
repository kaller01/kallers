import Photo from "~/server/models/Photo";
import Collection from "~/server/models/Collection";

const populateSpecialCollections = async (collection: any) => {
    if (collection.link == "prints-in-stock") {
        const photos = await Photo.find({ prints: { $gt: 0 } }).select('_id');
        collection.cover = photos[0]._id;
        return photos;
    }
    return [];
}

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;
        const collection = await Collection.findById(id).select('link');
        const photos = await Photo.find({ collections: id });
        const specialPhotos = await populateSpecialCollections(collection);
        photos.push(...specialPhotos);
        return photos.map((p: any) => p._id);
    }
    catch (error) {
        return error
    }
})