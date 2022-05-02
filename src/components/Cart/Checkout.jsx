import { useRef, useState } from 'react'
import Input from '../UI/Input'

import classes from './Checkout.module.css'

const isEmpty = value => value.trim().length === 0
const isNotFiveChars = value => value.trim().length !== 5

export default function Checkout(props) {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        zip: true
    })
    
    const nameInput = useRef()
    const streetInput = useRef()
    const zipInput = useRef()
    const cityInput = useRef()

    const confirmHandler = event => {
        event.preventDefault()
        const enteredName = nameInput.current.value
        const enteredStreet = streetInput.current.value
        const enteredZip = zipInput.current.value
        const enteredCity = cityInput.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredZipIsValid = !isNotFiveChars(enteredZip)

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            zip: enteredZipIsValid
        })

        const formIsValid = enteredCityIsValid && enteredNameIsValid && enteredStreetIsValid && enteredZipIsValid

        if(!formIsValid) {

            return
        }

        props.onSubmit({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            zip: enteredZip
        })
    }

    return (
        <form
            className={classes.form}
            onSubmit={confirmHandler}
        >
            <Input
                ref={nameInput}
                className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}
                label="Your name"
                input={{
                    id: 'name',
                    type: 'text',
                }}
            />
            {!formInputValidity.name && <p>Please entered a valid name</p>}
            <Input
                ref={streetInput}
                className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`}
                label="Street"
                input={{
                    id: 'street',
                    type: 'text',
                }}
            />
            {!formInputValidity.street && <p>Please entered a valid street</p>}
            <Input
                ref={zipInput}
                className={`${classes.control} ${formInputValidity.zip ? '' : classes.invalid}`}
                label="Postal code"
                input={{
                    id: 'zip',
                    type: 'text',
                }}
            />
            {!formInputValidity.zip && <p>Please entered a valid postal code</p>}
            <Input
                ref={cityInput}
                className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`}
                label="City"
                input={{
                    id: 'city',
                    type: 'text',
                }}
            />
            {!formInputValidity.city && <p>Please entered a valid city</p>}
            <div className={classes.actions}>
                <button
                    type="button"
                    onClick={props.onCancel}
                >
                    Cancel
                </button>
                <button
                    className={classes.submit}
                    type="submit"
                >
                    Confirm
                </button>
            </div>
        </form>
    )
}