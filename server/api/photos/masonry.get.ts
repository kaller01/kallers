import Photo from "~/server/models/Photo"

export default defineEventHandler(async (event) => {
    try {
        const photos = await Photo.find({ show: { $ne: false } }).sort("-date");

        const sizes = [3];
        const result: any = {};
        sizes.forEach((n) => {
            const heightMap: any = [];
            const masonry: any = [];
            for (let i = 0; i < n; i++) {
                heightMap[i] = 0;
                masonry[i] = [];
            }
            photos.forEach((photo: any) => {
                let i = heightMap.indexOf(Math.min(...heightMap));
                heightMap[i] += photo.height / photo.width;
                masonry[i].push(photo._id);
            });
            result[n] = masonry;
        });

        return result;
    }
    catch (error) {
        return error
    }
})