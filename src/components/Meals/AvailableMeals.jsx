import { useEffect, useState } from 'react'
import axios from 'axios'

import Card from '../UI/Card'
import MealItem from './MealItem';

import classes from './AvailableMeals.module.css'

export default function AvailableMeals() {
    const [meals, setMeals] = useState([])
    useEffect(() => {
        axios.get(process.env.VITE_APP_DATABASE_URL) 
            .then(response => {
                const loadedMeals = []
                for (const key in response.data) {
                    loadedMeals.push({
                        id: key,
                        ...response.data[key]
                    })
                }
                setMeals(loadedMeals)
            })
    }, [])

    const mealsList = meals.map(meal =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    )

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}