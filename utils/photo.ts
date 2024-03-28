export const getMonthString = (photo: any) => new Date(photo.date).toLocaleDateString("en-SE", {
    month: "long"
});

export const getDateString = (photo: any) => dateToString(new Date(photo.date));

export const getPhotoDescription = (photo: any) =>
    photo.description ||
    (photo.location &&
        `Photograph ${photo.filename} was photographed in ${photo.location.title} with a ${photo.lens} during ${getMonthString(photo)}.`) ||
    `Photograph ${photo.filename} was photographed during ${getMonthString(photo)} with a ${photo.lens}.`