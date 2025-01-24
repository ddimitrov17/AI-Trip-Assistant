import { useContext, useState } from 'react';
import styles from '../TripGeneratorForm/TripGenerator.module.css';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { chatSession } from '../../services/ai.service';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getBigPlacePhoto } from '../../services/photo.service';
import ErrorComponent from '../Error/ErrorComponent.jsx';
import { apiAccess } from '../../services/api.access.jsx';

export default function TripScheduleGenerator() {
    const [isNumberOfDaysValid, setIsNumberOfDaysValid] = useState(true);
    const [step, setStep] = useState(1);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        location: '',
        days: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        if (name == "days") {
            if (value < 1 || value > 10) {
                setIsNumberOfDaysValid(false);
            } else {
                setIsNumberOfDaysValid(true);
            }
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    function nextStep() {
        setStep(step + 1);
    };

    async function submitForm() {
        try {
            const getAccess = await apiAccess();
            console.log(getAccess);
            setLoading(true);
            let prompt = import.meta.env.VITE_ITINERARY_PROMPT;
            prompt = prompt
                .replace(/{formData.location}/g, formData.location)
                .replace(/{formData.days}/g, formData.days);
            const result = await chatSession.sendMessage(prompt);
            const text = result.response.text();
            const parsedData = JSON.parse(text);
            const locationImage = await getBigPlacePhoto(formData.location);
            let itineraryData = {
                location: formData.location,
                days: formData.days,
                itinerary: JSON.stringify(parsedData.itinerary),
                location_image: locationImage
            }
            const createdItinerary = await saveItinerary(itineraryData);
            navigate(`/itinerary-details/${createdItinerary.id}`);
        } catch (error) {
            setErrorMessage(error.message);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage('');
            }, 5000);
            setLoading(false);
        }
    };

    async function saveItinerary(itineraryData) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/itinerary/save-itinerary`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    ...itineraryData
                }),
            });

            if (response.ok) {
                const savedItinerary = await response.json();
                return savedItinerary;
            } else {
                setShowError(true);
            }
        } catch (error) {
            console.error('Error saving itinerary:', error);
        }
    }

    function handleLocationSelect(location) {
        setFormData({
            ...formData,
            location: location.label
        });
    }

    return (
        <>
            {showError && <ErrorComponent errorMessage={errorMessage} />}
            <div className={styles.tripForm}>
                {loading && <LoadingSpinner />}
                {!loading && step === 1 && (
                    <div>
                        <label>To where is your trip?</label>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_PLACES_API}
                            selectProps={{
                                value: formData.location ? { label: formData.location, value: formData.location } : null,
                                onChange: handleLocationSelect
                            }}
                            autocompletionRequest={{
                                types: ['(cities)'],
                            }}
                        />
                        <button onClick={nextStep} disabled={!formData.location}>Next</button>
                    </div>
                )}

                {!loading && step === 2 && (
                    <div>
                        <label>How many days are you planning to stay? (Maximum 10)</label>
                        <input
                            type="number"
                            name="days"
                            value={formData.days}
                            onChange={handleChange}
                            placeholder='Between 1 and 10'
                        />
                        <button onClick={submitForm} disabled={!formData.days || !isNumberOfDaysValid}>Generate Itinerary</button>
                    </div>
                )}
            </div>
        </>
    );
}
