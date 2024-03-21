import Photo from "~/server/models/Photo";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    const body = await readBody(event)
    return await Photo.findOneAndUpdate({ _id: id }, body);
  }
  catch (error) {
    return error
  }
})