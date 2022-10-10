import React from "react";

const CartContext = React.createContext({
    products: [],
    addProduct: (product) => { }
});

export default CartContext;