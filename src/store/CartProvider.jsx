import { useReducer } from "react"

import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        let updatedItem
        let updatedItems

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)

        if(existingCartItemIndex >= 0) {
            const existingCartItem = state.items[existingCartItemIndex]
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingCartItem.price
       let updatedItems
       console.log(existingCartItem)
       if(existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== existingCartItem.id)
       } else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
       }

       return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
}

export default function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCart = item => dispatchCartAction({ type: 'ADD', item })
    const removeItemFromCart = id => dispatchCartAction({ type: 'REMOVE', id })

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}