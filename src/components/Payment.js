import React from 'react'
import styled from 'styled-components'

const Payment = ({ className, amount, selectAmount }) => (
  <label className={className} >
    <input
      type='radio'
      name='payment'
      onClick={function () {
        selectAmount(amount)
      }} /> {amount}
  </label>
)

const StyledPayment = styled(Payment)`
  cursor: pointer;
  input {
    margin-left: 10px;
  }
`

export default StyledPayment
