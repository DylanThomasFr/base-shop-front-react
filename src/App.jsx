import React, { useState } from "react"

import Header from "./components/Layout/Header"
import Meals from "./components/Meals/Meals"
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider"

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const toggleCart = () => setCartIsShown((prevState) => !prevState)
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={toggleCart} />}
      <Header onToggleCart={toggleCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
