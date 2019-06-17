import { summaryDonations, currencyFormat } from '../../helpers'

describe('helpers', function () {
  test('`summaryDonations` should calculate donations correctly', function () {
    expect(summaryDonations([1, 2, 3, 4])).toEqual(10)
  })

  test('`currencyFormat` should have comma at correct position', function () {
    expect(currencyFormat(10000, '$')).toEqual('$10,000')
  })

  test('`currencyFormat` should put the currency behind if currency is THB', function () {
    expect(currencyFormat(10000, 'THB')).toEqual('10,000 ฿')
  })
})
