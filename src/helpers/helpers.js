export const summaryDonations = (donation) => (
  donation.reduce((accumulator, value) => (accumulator + value))
)

export const currencyFormat = (amount, currency = '') => {
  let currencySymbol = currency
  let isPrefix = true
  switch (currency) {
    case '฿':
    case 'THB': {
      currencySymbol = '฿'
      isPrefix = false
      break
    }
    case 'USD': {
      currencySymbol = '$'
      isPrefix = true
      break
    }
    case 'VND': {
      currencySymbol = 'VND'
      isPrefix = false
      break
    }
  }
  if (isPrefix) {
    return `${currencySymbol}${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')}`
  }
  return `${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')} ${currencySymbol}`
}
