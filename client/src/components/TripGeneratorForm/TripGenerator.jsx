import { useState } from 'react';
import styles from './TripGenerator.module.css';
import { chatSession } from '../../services/ai.service';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function TripGeneratorForm() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        location: '',
        number_of_days: '',
        number_of_people: '',
        budget: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
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
        console.log(prompt)
        const result = await chatSession.sendMessage(prompt);
        console.log(result.response.text());

        setLoading(false);
    }

    return (
        <div className={styles.tripForm}>
            {loading && <LoadingSpinner />}

            {!loading && step === 1 && (
                <div>
                    <label>To which destination are you planning your trip?</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                    <button onClick={nextStep}>Next</button>
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
                    />
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {!loading && step === 3 && (
                <div>
                    <label>Who do you plan on traveling with?</label>
                    <select
                        name="number_of_people"
                        value={formData.number_of_people}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="one">Just me</option>
                        <option value="two">Trip for two</option>
                        <option value="3">A group of 3</option>
                        <option value="4">A group of 4</option>
                        <option value="5">A group of 5</option>
                        <option value="6">A group of 6</option>
                        <option value="7">A group of 7</option>
                        <option value="8">A group of 8</option>
                        <option value="9">A group of 9</option>
                    </select>
                    <button onClick={nextStep}>Next</button>
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
                        <option value="">Select</option>
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                    </select>
                    <button onClick={submitForm}>Create</button>
                </div>
            )}
        </div>
    );
}
