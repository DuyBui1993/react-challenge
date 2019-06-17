import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import fetch from 'isomorphic-fetch'

import { summaryDonations, currencyFormat } from './helpers'
import { Config } from './common'
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
  color: #4BB543;
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
        selectedAmount: 10,
        currency: 'THB'
      }
    }

    componentDidMount () {
      const self = this
      fetch(`${Config.SERVER_URL}/charities`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
          self.setState({ charities: data })
        })

      fetch(`${Config.SERVER_URL}/payments`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => (item.amount)))
          })
        })
    }

    _handlePay (id, amount, currency) {
      const self = this
      fetch(`${Config.SERVER_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          charitiesId: id,
          amount,
          currency
        })
      })
        .then(function (resp) { return resp.json() })
        .then(function () {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount
          })
          self.props.dispatch({
            type: 'UPDATE_MESSAGE',
            message: `Thanks for donate ${currencyFormat(amount, currency)}!`
          })

          setTimeout(function () {
            self.props.dispatch({
              type: 'UPDATE_MESSAGE',
              message: ''
            })
          }, 2000)
        })
    }

    render () {
      const self = this
      const { donate, message } = self.props
      const { currency, selectedAmount } = self.state
      const cards = this.state.charities.map(function (item, i) {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <Payment key={j} currency={currency} amount={amount} selectAmount={(selected) => self.setState({ selectedAmount: selected })} />
        ))

        return (
          <Card
            key={i}
            item={item}
            currency={self.state.currency}
            handlePay={() => self._handlePay(item.id, selectedAmount, currency)}
            selectedAmount={self.state.selectedAmount}
            payments={payments}
          />
        )
      })
      return (
        <div>
          <HeaderText>
            <h1>Tamboon React</h1>
            <p>All donations: {currencyFormat(donate, currency)}</p>
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
