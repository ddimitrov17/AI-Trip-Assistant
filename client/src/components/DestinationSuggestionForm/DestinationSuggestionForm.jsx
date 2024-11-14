import { useState } from 'react';
import styles from '../TripGeneratorForm/TripGenerator.module.css';
import { chatSession } from '../../services/ai.service';

export default function DestinationSuggestionForm() {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        travelStyle: '',
        budget: '',
        activities: '',
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
        console.log('Form Data:', formData);
        setLoading(true);
        let prompt = import.meta.env.VITE_LOCATION_PROMPT;
        prompt = prompt
            .replace(/{formData.travelStyle}/g, formData.travelStyle)
            .replace(/{formData.budget}/g, formData.budget)
            .replace(/{formData.activities}/g, formData.activities);
        console.log(prompt) //TODO REMOVE
        console.log(formData.budget)
        const result = await chatSession.sendMessage(prompt);
        const text = result.response.text();
        console.log(text)
        const parsedData = JSON.parse(text);

        console.log('Parsed Data:', parsedData); //TODO REMOVE
        let filledData = {
            travelStyle: formData.travelStyle,
            budget: formData.budget,
            activities: formData.activities
        }
        console.log(filledData)
        // const createdTrip=await saveTrip(tripData);
        setLoading(false);
        // navigate(`/trip-details/${createdTrip.id}`)
    };

    return (
        <div className={styles.tripForm}>
            {step === 1 && (
                <div>
                    <label>What type of travel experience are you looking for?</label>
                    <select name="travelStyle" value={formData.travelStyle} onChange={handleChange}>
                        <option value="">Select one</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Relaxation">Relaxation</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Romantic">Romantic</option>
                    </select>
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <label>What’s your budget?</label>
                    <select name="budget" value={formData.budget} onChange={handleChange}>
                        <option value="">Select one</option>
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                        <option value="Luxury">Luxury</option>
                    </select>
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <label>What activities interest you?</label>
                    <select name="activities" value={formData.activities} onChange={handleChange}>
                        <option value="">Select one</option>
                        <option value="Beach">Beach</option>
                        <option value="Skiing">Skiing</option>
                        <option value="Sightseeing">Sightseeing</option>
                        <option value="Hiking">Hiking</option>
                        <option value="Nightlife">Nightlife</option>
                    </select>
                    <button onClick={submitForm}>Submit</button>
                </div>
            )}
        </div>
    );
}
