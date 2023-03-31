export const currencyFormatter = new Intl.NumberFormat('en-US',{
    currency: 'usd',
    style: 'currency',
    minimumFractionDigits: 0,
})