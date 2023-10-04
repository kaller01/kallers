const getPhotoMonth = (photo) => new Date(photo.date).toLocaleDateString("en-SE", {
    month: "long",
});

const getPhotoCaption = (photo) => {
    if (photo.description) {
        return photo.description;
    }
    if (!photo.date) {
        return undefined;
    }
    const month = getPhotoMonth(photo);
    const photoName = photo.title ? `"${photo.title}"` : photo.filename
    if (photo.location) {
        return `Photograph ${photoName} was taken during ${month} in ${photo.location.title} with a ${photo.lens} .`
    }
    return `Photograph ${photoName} was photographed during ${month} with a ${photo.lens}.`
}


module.exports = {
    getPhotoMonth,
    getPhotoCaption
}