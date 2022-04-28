import React from 'react'

import HeaderCartButton from './HeaderCartButton'

import mealsImage from '../../assets/meals.jpeg'

import classes from './Header.module.css'

function Header(props) {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Foodora</h1>
                <HeaderCartButton onClick={props.onToggleCart}/>
            </header>
            <div className={classes['main-image']}>
                <img
                    src={mealsImage}
                    alt="A table full of delicious food!"
                />
            </div>
        </React.Fragment>
    )
}

export default Header