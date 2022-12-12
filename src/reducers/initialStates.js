export const cartInitialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingAddress: JSON.parse(sessionStorage.getItem('shippingAddress')) || null,
    savedAddresses: [],
    paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')) || "PayPal",
    isLoading: false,
    error: null
}

export const productsInitialState = {
    products: [],
    showcaseProducts: [],
    isLoading: false,
    error: null,
    success: null,
    pages: null,
    page: 1,
}

export const userInitialState = {
    userData: null,
    isLoading: false,
    error: null,
    success: false, 
    isAuthReady: false
}

export const orderInitialState = {
    orders: [],
    isLoading: false,
    error: null,
    success: false, 
    createdOrder: null,
}