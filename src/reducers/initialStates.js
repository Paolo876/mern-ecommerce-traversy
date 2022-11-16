export const cartInitialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || null,
    paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')) || "PayPal",
    isLoading: false,
    error: null
}

export const productsInitialState = {
    products: [],
    isLoading: false,
    error: null
}

export const userInitialState = {
    userData: null,
    isLoading: false,
    error: null,
    success: false, 
    isAuthReady: false
}

export const orderInitialState = {
    isLoading: false,
    error: null,
    success: false, 
}