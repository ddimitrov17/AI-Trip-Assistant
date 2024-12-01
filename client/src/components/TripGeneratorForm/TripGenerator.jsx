import { useContext, useEffect, useState } from 'react';
import styles from './TripGenerator.module.css';
import { chatSession } from '../../services/ai.service';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { getBigPlacePhoto } from '../../services/photo.service';

export default function TripGeneratorForm() {
    const [isNumberOfDaysValid, setIsNumberOfDaysValid] = useState(true); 
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.id) {
            console.log("currentUser:", user.id);
        } else {
            console.log("User not found or not logged in.");
        }
    }, [user]);

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        location: '',
        number_of_days: '',
        number_of_people: '',
        budget: ''
    });

    function handleLocationSelect(location) {
        setFormData({
            ...formData,
            location: location.label 
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        if (name=="number_of_days") {
            if (value < 1 || value > 30) {
                console.log('Please type in number of days between 1 and 30'); 
                setIsNumberOfDaysValid(false);  
            } else {
                setIsNumberOfDaysValid(true);  
            }
        }
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function nextStep() {
        setStep(step + 1);
    }

    async function submitForm() {
        setLoading(true);
        console.log('Form Data:', formData);
        let prompt = import.meta.env.VITE_FINAL_PROMPT;
        prompt = prompt
            .replace(/{formData.location}/g, formData.location)
            .replace(/{formData.number_of_days}/g, formData.number_of_days)
            .replace(/{formData.number_of_people}/g, formData.number_of_people)
            .replace(/{formData.budget}/g, formData.budget);
        console.log(prompt) //TODO REMOVE
        console.log(formData.budget)
        const result = await chatSession.sendMessage(prompt);
        const text = result.response.text();
        console.log(text)
        const parsedData = JSON.parse(text);
        const locationImage=await getBigPlacePhoto(formData.location);
        console.log(locationImage) //TODO REMOVE
        console.log('Parsed Data:', parsedData); //TODO REMOVE
        let tripData = {
            location: formData.location,
            number_of_days: formData.number_of_days,
            number_of_people: formData.number_of_people,
            budget: formData.budget,
            hotels: JSON.stringify(parsedData.hotels),
            places_to_visit: JSON.stringify(parsedData.places_to_visit),
            food_recommendations: JSON.stringify(parsedData.food_recommendations),
            location_image: locationImage
        }
        console.log(tripData)
        const createdTrip=await saveTrip(tripData);
        setLoading(false);
        navigate(`/trip-details/${createdTrip.id}`)
    }

    async function saveTrip(tripData) {
        try {
            const response = await fetch('http://localhost:5000/api/trips/save-trip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    ...tripData
                }),
            });

            if (response.ok) {
                const savedTrip = await response.json();
                return savedTrip;
            } else {
                console.error('Failed to save trip:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving trip:', error);
        }
    }

    return (
        <div className={styles.tripForm}>
            {loading && <LoadingSpinner />}

            {!loading && step === 1 && (
                <div>
                    <label>To which destination are you planning your trip?</label>
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
                    <label>For how many days do you want your trip to last?</label>
                    <input
                        type="number"
                        name="number_of_days"
                        value={formData.number_of_days}
                        onChange={handleChange}
                        placeholder='Between 1 and 30'
                    />
                    <button onClick={nextStep} disabled={!isNumberOfDaysValid && !formData.number_of_days}>Next</button>
                </div>
            )}

            {!loading && step === 3 && (
                <div>
                    <label>Who do you plan on traveling with?</label>
                    <select
                        name="number_of_people"
                        value={formData.number_of_people}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Select number of people</option>
                        <option value="1">Just me</option>
                        <option value="2">Trip for two</option>
                        <option value="3">A group of 3</option>
                        <option value="4">A group of 4</option>
                        <option value="5">A group of 5</option>
                        <option value="6">A group of 6</option>
                        <option value="7">A group of 7</option>
                        <option value="8">A group of 8</option>
                        <option value="9">A group of 9</option>
                    </select>
                    <button onClick={nextStep} disabled={!formData.number_of_people}>Next</button>
                </div>
            )}

            {!loading && step === 4 && (
                <div>
                    <label>What's your budget for the trip?</label>
                    <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                    >
                        <option value="">Select budget</option>
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                    </select>
                    <button onClick={submitForm} disabled={!formData.budget}>Create</button>
                </div>
            )}
        </div>
    );
}
