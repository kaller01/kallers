import Collection from "~/server/models/Collection";
import Photo from "~/server/models/Photo";

const populateSpecialCollections = async (collection: any) => {
    if (collection.link == "prints-in-stock") {
        const photos = await Photo.find({ prints: { $gt: 0 } });
        collection.cover = photos[0];
        return photos;
    }
    return [];
}

export default defineEventHandler(async (event) => {
    try {
        const name = event.context.params?.name;

        let collection = await Collection.findOne({ link: name }).populate(
            "cover",
            "paths"
        );
        console.log(collection);
        const photos = await Photo.find({ collections: collection._id });
        const specialPhotos = await populateSpecialCollections(collection);
        photos.push(...specialPhotos);
        return { album: collection, photos }
    }
    catch (error) {
        return error
    }
})