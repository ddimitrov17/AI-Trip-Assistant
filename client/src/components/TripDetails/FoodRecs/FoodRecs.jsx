import { IoFastFoodOutline } from "react-icons/io5";
import { LuVegan } from "react-icons/lu";
import { FaPizzaSlice, FaFish, FaHamburger, FaUtensils } from "react-icons/fa";
import { GiTacos } from "react-icons/gi";
import { BiSolidSushi,BiBaguette } from "react-icons/bi";
import {GiGreekTemple } from "react-icons/gi";
import { TbSausage } from "react-icons/tb";
import { GiDonerKebab } from "react-icons/gi";
import styles from './FoodRecs.module.css';

export default function FoodRecs({ index, restaurant }) {
    const iconMap = {
        Vegan: <LuVegan className={styles.foodIconVegan} />,
        Vegetarian: <LuVegan className={styles.foodIconVegan} />,
        FastFood: <IoFastFoodOutline className={styles.foodIcon} />,
        Italian: <FaPizzaSlice className={styles.foodIcon} />,
        Seafood: <FaFish className={styles.foodIcon} />,
        German: <TbSausage className={styles.foodIcon} />,
        Japanese: <BiSolidSushi className={styles.foodIcon} />,
        Sushi: <BiSolidSushi className={styles.foodIcon} />,
        Mexican: <GiTacos className={styles.foodIcon} />,
        French: <BiBaguette  className={styles.foodIcon} />,
        MiddleEastern: <GiDonerKebab className={styles.foodIcon} />,
        Turkish: <GiDonerKebab className={styles.foodIcon} />,
        American: <FaHamburger className={styles.foodIcon} />,
        Greek: <GiGreekTemple className={styles.foodIcon} />,
        Spanish: <FaUtensils className={styles.foodIcon} />,
    };

    let icon = iconMap[restaurant.cuisine_type] || <IoFastFoodOutline className={styles.foodIcon} />;

    return (
        <div key={index} className={styles.food}>
            <div className={styles.resturantImage}>
                {icon}
            </div>
            <div className={styles.restaurantDescription}>
                <p className={styles.resturantName}>{restaurant.restaurant_name}</p>
                <p className={styles.restaurantAdress}>Address: {restaurant.address}</p>
                <p className={styles.priceRange}><span>Price Range:</span> {restaurant.price_range}</p>
                <p className={styles.cuisineType}><span>Cuisine Type:</span> {restaurant.cuisine_type}</p>
                <p className={styles.openingHours}><span>Opening Hours:</span> {restaurant.opening_hours}</p>
            </div>
        </div>
    );
}
