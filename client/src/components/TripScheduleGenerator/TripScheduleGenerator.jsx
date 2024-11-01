import { useState } from 'react';
import styles from '../TripGeneratorForm/TripGenerator.module.css';

export default function TripScheduleGenerator() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        location: '',
        tripHighlights: '',
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
        alert('Trip Enhanced!');
    };

    return (
        <div className={styles.tripForm}>
            {step === 1 && (
                <div>
                    <label>To where is your trip?</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter your destination"
                        value={formData.location}
                        onChange={handleChange}
                    />
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <label>How many days are you there?</label>
                    <input
                        type="text"
                        name="tripHighlights"
                        placeholder="e.g., Sightseeing, Specific Landmarks"
                        value={formData.tripHighlights}
                        onChange={handleChange}
                    />
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <label>Do you prefer a tighter schedule or a more relaxed one?</label>
                    <input
                        type="text"
                        name="activities"
                        placeholder="e.g., Local cuisine, Outdoor adventures"
                        value={formData.activities}
                        onChange={handleChange}
                    />
                    <button onClick={submitForm}>Plan</button>
                </div>
            )}
        </div>
    );
}
