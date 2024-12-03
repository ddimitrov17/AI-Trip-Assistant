import { useContext, useState } from 'react';
import styles from '../TripGeneratorForm/TripGenerator.module.css';
import { chatSession } from '../../services/ai.service';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getBigPlacePhoto } from '../../services/photo.service';

export default function DestinationSuggestionForm() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        travelStyle: '',
        budget: '',
        activities: '',
    });

    const activitiesOptions = {
        Adventure: ["Hiking", "Skiing", "Zip-lining", "Rock Climbing"],
        Relaxation: ["Beach", "Spa", "Meditation Retreats", "Resort Stay"],
        Cultural: ["Museums", "Historic Landmarks", "City Tours", "Traditional Performances"],
        Romantic: ["Sunset Cruises", "Secluded Retreats", "Couples' Spa", "Fine Dining"],
        Family: ["Theme Parks", "Zoos", "Outdoor Fun", "Aquariums"],
        Nature: ["Safaris", "National Parks", "Scenic Hikes", "Wildlife Watching"],
        Luxury: ["Five-star Hotels", "Exclusive Experiences", "Yacht Cruises", "Fine Dining"],
        Food: ["Culinary Tours", "Wine Tasting", "Street Food Exploration", "Cooking Classes"],
    };

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
        let prompt = import.meta.env.VITE_LOCATION_PROMPT;
        prompt = prompt
            .replace(/{formData.travelStyle}/g, formData.travelStyle)
            .replace(/{formData.budget}/g, formData.budget)
            .replace(/{formData.activities}/g, formData.activities);
        const result = await chatSession.sendMessage(prompt);
        const text = result.response.text();
        const parsedData = JSON.parse(text);
        for (let i = 0; i < parsedData.destinations.length; i++) {
            parsedData.destinations[i].locationImage=await getBigPlacePhoto(parsedData.destinations[i].name);
        }            
        let locationsData = {
            travel_style: formData.travelStyle,
            budget: formData.budget,
            activities: formData.activities,
            destinations: JSON.stringify(parsedData.destinations)
        }
        const createdLocationSuggestions=await saveLocationSuggestions(locationsData);
        setLoading(false);
        navigate(`/locations-details/${createdLocationSuggestions.id}`)
    };

    async function saveLocationSuggestions(locationsData) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/locations/save-location-suggestions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    ...locationsData
                }),
            });

            if (response.ok) {
                const savedLocations = await response.json();
                return savedLocations;
            } else {
                console.error('Failed to save location suggestions:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving location suggestions:', error);
        }
    }

    return (
        <div className={styles.tripForm}>
            {loading && <LoadingSpinner/>}
            {!loading && step === 1 && (
                <div>
                    <label>What type of travel experience are you looking for?</label>
                    <select name="travelStyle" value={formData.travelStyle} onChange={handleChange}>
                        <option value="">Select one</option>
                        {Object.keys(activitiesOptions).map(style => (
                            <option key={style} value={style}>{style}</option>
                        ))}
                    </select>
                    <button onClick={nextStep} disabled={!formData.travelStyle}>Next</button>
                </div>
            )}

            {!loading && step === 2 && (
                <div>
                    <label>What’s your budget?</label>
                    <select name="budget" value={formData.budget} onChange={handleChange}>
                        <option value="">Select one</option>
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                        <option value="Luxury">Luxury</option>
                    </select>
                    <button onClick={nextStep} disabled={!formData.budget}>Next</button>
                </div>
            )}

            {!loading && step === 3 && (
                <div>
                    <label>What activities interest you? (Options are based on the travel style you have chosen)</label>
                    <select name="activities" value={formData.activities} onChange={handleChange}>
                        <option value="">Select one</option>
                        {formData.travelStyle &&
                            activitiesOptions[formData.travelStyle].map(activity => (
                                <option key={activity} value={activity}>{activity}</option>
                            ))}
                    </select>
                    <button onClick={submitForm} disabled={!formData.activities}>Submit</button>
                </div>
            )}
        </div>
    );
}
