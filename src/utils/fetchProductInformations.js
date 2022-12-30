import axios from "axios";


const fetchProductInformations = async ( cartItems, products ) => {
    let _cartItems = [];
    const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/products/product-informations`, { cartItems } , { 
      withCredentials: true

    });
   const result = res.data.map(item => {
    return {...item, quantity: cartItems.find(_item => _item._id === item._id).quantity}
   })
   console.log(result)
    // for (const item of cartItems) {
    //   const product = products.find(product => product._id === item._id);
    //   console.log(product)
      
    //   if(product) {
    //     _cartItems.push({...product, quantity: item.quantity})
    //   } else {
    //     const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/products/${item._id}`);
    //     if(res && res.data) _cartItems.push({...res.data, quantity: item.quantity})
    //   }
    // }
    return result;
};

export default fetchProductInformations