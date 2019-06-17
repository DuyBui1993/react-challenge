import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import fetch from 'isomorphic-fetch'

import { summaryDonations } from './helpers'
import Card from './components/Card'
import Payment from './components/Payment'

const CardContainer = styled.div`
  display: block;
  @media (max-width: 919px) {
    text-align: center;
  }
`

const HeaderText = styled.div`
text-align: center;
h1 {
  color: #5f85db;
}
p {
  color: #90b8f8;
}

.message {
  color: red;
  margin: 1em 0;
  font-weight: bold;
  font-size: 16px;
}
`

export default connect((state) => state)(
  class App extends Component {
    constructor (props) {
      super()

      this.state = {
        charities: [],
        selectedAmount: 10
      }
    }

    componentDidMount () {
      const self = this
      fetch('http://localhost:3001/charities')
        .then(function (resp) { return resp.json() })
        .then(function (data) {
          self.setState({ charities: data })
        })

      fetch('http://localhost:3001/payments')
        .then(function (resp) { return resp.json() })
        .then(function (data) {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => (item.amount)))
          })
        })
    }

    render () {
      const self = this
      const { donate, message } = this.props
      const cards = this.state.charities.map(function (item, i) {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <Payment key={j} amount={amount} selectAmount={(selected) => self.setState({ selectedAmount: selected })} />
        ))

        return (
          <Card
            key={i}
            item={item}
            handlePay={handlePay}
            selectedAmount={self.state.selectedAmount}
            payments={payments}
          />
        )
      })
      return (
        <div>
          <HeaderText>
            <h1>Tamboon React</h1>
            <p>All donations: {donate}</p>
            <p className='message'>{message}</p>
          </HeaderText>
          <CardContainer>
            {cards}
          </CardContainer>
        </div>
      )
    }
  }
)

function handlePay (id, amount, currency) {
  const self = this
  return function () {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`
    })
      .then(function (resp) { return resp.json() })
      .then(function () {
        self.props.dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount
        })
        self.props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: `Thanks for donate ${amount}!`
        })

        setTimeout(function () {
          self.props.dispatch({
            type: 'UPDATE_MESSAGE',
            message: ''
          })
        }, 2000)
      })
  }
}
