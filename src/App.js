import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import fetch from 'isomorphic-fetch'

import { summaryDonations, currencyFormat } from './helpers'
import { Config } from './common'
import Card from './components/Card'
import Payment from './components/Payment'
import Message from './components/Message'

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
`

export default connect((state) => state)(
  class App extends Component {
    constructor (props) {
      super()

      this.state = {
        charities: [],
        selectedAmount: [],
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
          self._showMessageWithDuration(`Thanks for donate ${currencyFormat(amount, currency)}!`)
        })
    }

    _showMessageWithDuration (message, messageType, duration = 2000) {
      const self = this
      self.props.dispatch({
        type: 'UPDATE_MESSAGE',
        messageType,
        message
      })

      setTimeout(function () {
        self.props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: ''
        })
      }, duration)
    }

    render () {
      const self = this
      const { donate, message, messageType } = self.props
      const { currency, selectedAmount, charities } = self.state
      const cards = charities.map(function (item, i) {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <Payment
            key={j}
            currency={currency}
            amount={amount}
            charityName={charities[i].id}
            selectAmount={(selected) => {
              const updatedSelectedAmount = [...self.state.selectedAmount]
              const updatedCharities = [...charities]
              updatedSelectedAmount[i] = selected
              updatedCharities[i].message = ''
              self.setState({ selectedAmount: updatedSelectedAmount, charities: updatedCharities })
            }}
          />
        ))

        return (
          <Card
            key={i}
            item={item}
            currency={currency}
            handlePay={() => {
              const updatedCharities = [...charities]
              let message = ''
              let messageType = ''
              if (selectedAmount[i] && selectedAmount[i] > 0) {
                self._handlePay(item.id, selectedAmount[i], currency)
                message = `Thanks for donate ${currencyFormat(selectedAmount[i], currency)}!`
              } else {
                message = 'Please select amount to donate'
                messageType = 'error'
                self._showMessageWithDuration(message, 'error')
              }
              updatedCharities[i].message = message
              updatedCharities[i].messageType = messageType
              self.setState({
                charities: updatedCharities
              })
            }}
            payments={payments}
          />
        )
      })
      return (
        <div>
          <HeaderText>
            <h1>Tamboon React</h1>
            <p>All donations: {currencyFormat(donate, currency)}</p>
          </HeaderText>
          <Message type={messageType}>{message}</Message>
          <CardContainer>
            {cards}
          </CardContainer>
        </div>
      )
    }
  }
)
