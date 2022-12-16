import currencyFormatter from "./currencyFormatter";

const productOptionsPrices = (productOptions) => {
    let pricesList = []
    productOptions.forEach(item => { pricesList = [...pricesList, ...item.options.map(_item => _item.price)] })
    return `${currencyFormatter(Math.min(...pricesList))} - ${currencyFormatter(Math.max(...pricesList))}`;
  }

export default productOptionsPrices