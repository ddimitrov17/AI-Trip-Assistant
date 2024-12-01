import { GetPlaceDetails } from "./photo.api";

export const getBigPlacePhoto = async (location) => {
    const data = {
        textQuery: location
    };

    const result = await GetPlaceDetails(data);
    const PHOTO_REF_URL = `https://places.googleapis.com/v1/${result.data.places[0].photos[0].name}/media?maxHeightPx=800&maxWidthPx=1200&key=${import.meta.env.VITE_PLACES_API}`
    return PHOTO_REF_URL;
};

export const getSmallPlacePhoto = async (location) => {
    const data = {
        textQuery: location
    };

    const result = await GetPlaceDetails(data);
    const PHOTO_REF_URL = `https://places.googleapis.com/v1/${result.data.places[0].photos[0].name}/media?maxHeightPx=400&maxWidthPx=800&key=${import.meta.env.VITE_PLACES_API}`
    return PHOTO_REF_URL;
};