const currencyFormatter = (amount, currency='USD') => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2
      })
       
      return formatter.format(amount)
}
export default currencyFormatter;

