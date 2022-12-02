import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const fetchProductInformations = async ( cartItems, products ) => {
    let _cartItems = [];
    for (const item of cartItems) {
      const product = products.find(product => product._id === item._id)
      if(product) {
        _cartItems.push({...product, quantity: item.quantity})
      } else {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/products/${item._id}?token=${cookies.get('token')}`);
        if(res && res.data) _cartItems.push({...res.data, quantity: item.quantity})
      }
    }
    return _cartItems;
};

export default fetchProductInformations