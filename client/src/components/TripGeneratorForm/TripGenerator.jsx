import { useState } from 'react';
import styles from './TripGenerator.module.css'

export default function TripGeneratorForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        location: '',
        days: '',
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
        console.log('Trip Generated!');
    };

    return (
        <div className={styles.tripForm}>
            {step === 1 && (
                <div>
                    <label>Where in the world are you dreaming of exploring?</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <label>How many days will your adventure last?</label>
                    <input
                        type="number"
                        name="days"
                        placeholder="Enter the number of days"
                        value={formData.days}
                        onChange={handleChange}
                    />
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <label>Any activities on your wishlist?</label>
                    <input
                        type="text"
                        name="activities"
                        placeholder="e.g., Hiking, city tours, beach time..."
                        value={formData.activities}
                        onChange={handleChange}
                    />
                    <button onClick={submitForm}>Create</button>
                </div>
            )}
        </div>
    );
};
