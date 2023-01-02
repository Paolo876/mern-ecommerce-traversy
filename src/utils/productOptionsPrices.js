import currencyFormatter from "./currencyFormatter";

const productOptionsPrices = (productOptions) => {
    let pricesList = productOptions.map(item => item.price)
    return `${currencyFormatter(Math.min(...pricesList))} - ${currencyFormatter(Math.max(...pricesList))}`;
  }

export default productOptionsPrices