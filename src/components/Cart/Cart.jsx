import { useContext, useState, Fragment } from 'react'

import Modal from '../UI/Modal'
import CartItem from './CartItem'
import Checkout from './Checkout'

import classes from './Cart.module.css'

import CartContext from '../../store/cart-context'

const Cart = (props) => {
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    )

    const [isCheckout, setIsCheckout] = useState(false)
    const [submittingState, setSubmittingState] = useState(false)
    const [didSubmit, setDidSubmitState] = useState(false)

    const orderHandler = () => setIsCheckout(true)

    const submitOrderHandler = async userData => {
        setSubmittingState(true)
        await fetch(process.env.VITE_APP_DATABASE_URL + '/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setSubmittingState(false)
        setDidSubmitState(true)
        cartCtx.clearCart()
    }

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
                Close
            </button>
            {hasItems &&
                <button
                    className={classes.button}
                    onClick={orderHandler}
                >
                    Order
                </button>
            }
        </div>
    )

    const cartModalContent = <Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {
            isCheckout &&
            <Checkout
                onCancel={props.onClose}
                onSubmit={submitOrderHandler}
            />
        }
        {!isCheckout && modalActions}
    </Fragment>

    const isSubmittingModalContent = <p>Submitting modal data...</p>
    const didSubmitModalContent = <Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
                Close
            </button>
        </div>
    </Fragment>


    return (
        <Modal onClose={props.onClose}>
            {!submittingState && !didSubmit && cartModalContent}
            {submittingState && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart