import axios from "axios";


const fetchProductInformations = async ( cartItems, products ) => {
  const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/products/product-informations`, { cartItems } , { withCredentials: true });
  const result = res.data.map(item => ({...item, quantity: cartItems.find(_item => _item._id === item._id).quantity}))
  return result;
};

export default fetchProductInformations