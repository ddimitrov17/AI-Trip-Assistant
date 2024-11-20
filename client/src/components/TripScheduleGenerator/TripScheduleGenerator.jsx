import { useContext, useState } from 'react';
import styles from '../TripGeneratorForm/TripGenerator.module.css';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { chatSession } from '../../services/ai.service';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function TripScheduleGenerator() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        location: '',
        days: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    function nextStep() {
        setStep(step + 1);
    };

    async function submitForm() {
        setLoading(true);
        console.log('Form Data:', formData);
        let prompt = import.meta.env.VITE_ITINERARY_PROMPT;
        prompt = prompt
            .replace(/{formData.location}/g, formData.location)
            .replace(/{formData.days}/g, formData.days);
        console.log(prompt) //TODO REMOVE
        const result = await chatSession.sendMessage(prompt);
        const text = result.response.text();
        console.log(text)
        const parsedData = JSON.parse(text);

        console.log('Parsed Data:', parsedData); //TODO REMOVE
        let itineraryData = {
            location: formData.location,
            days: formData.days,
            itinerary: JSON.stringify(parsedData.itinerary)
        }
        console.log(itineraryData)
        const createdItinerary = await saveItinerary(itineraryData);
        setLoading(false);
        navigate(`/itinerary-details/${createdItinerary.id}`)
    };

    async function saveItinerary(itineraryData) {
        try {
            const response = await fetch('http://localhost:5000/api/itinerary/save-itinerary', {
                method: 'POST',
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
                console.error('Failed to save itinerary:', response.statusText);
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
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {!loading &&  step === 2 && (
                <div>
                    <label>How many days are you planning to stay? (Maximum 10)</label>
                    <input
                        type="number"
                        name="days"
                        value={formData.days}
                        onChange={handleChange}
                        min="1"
                        max="10"
                    />
                    <button onClick={submitForm}>Generate Itinerary</button>
                </div>
            )}
        </div>
    );
}
