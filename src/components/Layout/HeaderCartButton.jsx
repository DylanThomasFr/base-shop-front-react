import { useContext } from 'react'

import CartContext from '../../store/cart-context'

import CartIcon from '../Cart/CartIcon'

import classes from './HeaderCartButton.module.css'

function HeaderCartButton(props) {
    const ctx = useContext(CartContext)
    const numberOfItems = ctx.items.reduce((currentNumber, item) => currentNumber + item.amount, 0)
    return (
        <button 
            className={classes.button}
            onClick={props.onClick}
        >
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartButton