import { useState } from 'react';
import styles from '../TripGeneratorForm/TripGenerator.module.css';

export default function DestinationSuggestionForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        travelStyle: '',
        budget: '',
        activities: ''
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

    function submitForm() {
        console.log('Form Data:', formData);
        console.log('Destination Suggestion Generated!');
    };

    return (
        <div className={styles.tripForm}>
            {step === 1 && (
                <div>
                    <label>What type of travel experience are you looking for?</label>
                    <input
                        type="text"
                        name="travelStyle"
                        placeholder="Adventure, Relaxation, Cultural"
                        value={formData.travelStyle}
                        onChange={handleChange}
                    />
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <label>What’s your budget?</label>
                    <input
                        type="text"
                        name="budget"
                        placeholder="Low, Moderate, High"
                        value={formData.budget}
                        onChange={handleChange}
                    />
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <label>What activities or experiences interest you?</label>
                    <input
                        type="text"
                        name="activities"
                        placeholder="Skiing, Beach, Museums"
                        value={formData.activities}
                        onChange={handleChange}
                    />
                    <button onClick={submitForm}>Suggest</button>
                </div>
            )}
        </div>
    );
}
