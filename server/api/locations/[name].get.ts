import Location from "~/server/models/Location";
import Photo from "~/server/models/Photo";

export default defineEventHandler(async (event) => {
    try {
        const name = event.context.params?.name;

        const location = await Location.findOne({ link: name }).populate(
            "cover",
            "paths"
        );
        const photos = await Photo.find({ location: location._id });
        return {location, photos}
    }
    catch (error) {
        return error
    }
})