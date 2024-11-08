import axios from "axios"

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_PLACES_API,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
};

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);
