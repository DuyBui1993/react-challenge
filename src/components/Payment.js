import React from 'react'
import styled from 'styled-components'

import { currencyFormat } from '../helpers'

const Payment = ({ className, amount, selectAmount, currency, charityName }) => (
  <label className={className} >
    <input
      type='radio'
      required
      name={`payment-${charityName}`}
      onClick={function () {
        selectAmount(amount)
      }} /> {currencyFormat(amount, currency)}
  </label>
)

const StyledPayment = styled(Payment)`
  cursor: pointer;
  input {
    margin-left: 10px;
  }
`

export default StyledPayment
