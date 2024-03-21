import Photo from "~/server/models/Photo";

export default defineEventHandler(async (event) => {
  try {
    const filename = event.context.params?.photo;

    const filter: any = {}

    const query = getQuery(event)

    if (query.collection) {
      filter.collections = query.collection;
    }
    if (query.location) {
      filter.location = query.location;
    }

    let photo = await Photo.findOne({ ...{ filename }, ...filter })
      .populate({
        path: "location",
        populate: { path: "cover", select: "paths" },
      })
      .populate({
        path: "collections",
        populate: { path: "cover", select: "paths" },
      });
    if (photo) {

      filter.show = { $ne: false };
      filter.filename = { $ne: photo.filename }

      // Finds photo which has a date less than current file.
      // https://stackoverflow.com/questions/9153329/how-to-fetch-next-and-previous-item-of-the-current-one-with-mongoose
      let next = await Photo.findOne({ ...{ date: { $lt: photo.date } }, ...filter }).sort({
        date: -1,
      });
      // Finds photo which has a date grater than current photo.
      let prev = await Photo.findOne({ ...{ date: { $gt: photo.date } }, ...filter }).sort({
        date: 1,
      });
      //If next/prev isn't found, loop around.
      if (!next) next = await Photo.findOne(filter).sort({ date: 1 });
      if (!prev) prev = await Photo.findOne(filter).sort({ date: -1 });

      return {
        photo,
        next,
        prev
      }
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not found',
      })
    }
  }
  catch (error) {
    return error
  }
})