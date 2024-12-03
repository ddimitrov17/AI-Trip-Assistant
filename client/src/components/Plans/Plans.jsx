import { useContext, useEffect, useState } from 'react';
import styles from './Plans.module.css';
import UserContext from '../../context/UserContext';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import PlanEntry from './PlanEntry/PlanEntry';

export default function Plans() {
    const [currentTab, setCurrentTab] = useState('trips');
    const [loading, setLoading] = useState(false);
    const [currentTypeData, setCurrentTypeData] = useState([]);
    const { user } = useContext(UserContext);
    const location = useLocation();

    async function handleChange(current) {
        setCurrentTab(current);
    }

    useEffect(() => {
        const fetchAllOfType = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/plans/get-all/${currentTab}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setCurrentTypeData(data);
            } catch (error) {
                console.error('Error fetching types data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllOfType();
    }, [currentTab]);
    return (
        <div className={styles.plansContainer}>
            <section className={styles.upper}>
                <div className={styles.menu}>
                    <a
                        className={`${styles.menuItem} ${currentTab === 'trips' ? styles.active : ''}`}
                        onClick={() => handleChange('trips')}
                    >
                        Trips
                    </a>
                    <a
                        className={`${styles.menuItem} ${currentTab === 'trip_destinations' ? styles.active : ''}`}
                        onClick={() => handleChange('trip_destinations')}
                    >
                        Locations
                    </a>
                    <a
                        className={`${styles.menuItem} ${currentTab === 'itineraries' ? styles.active : ''}`}
                        onClick={() => handleChange('itineraries')}
                    >
                        Itineraries
                    </a>
                </div>
            </section>
            <section className={styles.content}>
                {loading ? (
                    <LoadingSpinner />
                ) : currentTypeData && currentTypeData.length > 0 ? (
                    currentTypeData.map((currentEntry, index) => (
                        <PlanEntry key={index} entry={currentEntry} index={index} entryType={currentTab} image={currentTypeData[index].location_image}/>
                    ))
                ) : (
                    <p>No data available for {currentTab}</p>
                )}
            </section>
        </div>
    );
}
