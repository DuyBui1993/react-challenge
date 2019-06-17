import React from 'react'
import styled from 'styled-components'

import Button from './Button'

const CardHeader = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

const CardFooter = styled.footer`
  display: flex;
  margin: 15px;
  justify-content: space-between;
  align-items: center;
`

const CharityName = styled.span`
  color: #586675;
  font-family: Arial;
`

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #FFF;
  opacity: ${props => props.isDonating ? 0.9 : 0};
  transition: all 0.5s;
  pointer-events: ${props => props.isDonating ? 'all' : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
`

const CloseButton = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  color: #5d5d5d;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`

const Content = styled.div`
  text-align: center;
  line-height: 2;
  font-family: Arial, Helvetica, sans-serif;
  color: #5d5d5d;
`

class Card extends React.Component {
  constructor (props) {
    super()
    this.state = {
      isDonating: false
    }
  }

  render () {
    const { payments } = this.props
    const { image, name } = this.props.item
    const { isDonating } = this.state
    return (
      <div className={this.props.className} >
        <CardHeader src={`http://localhost:3001/images/${image}`} />
        <CardFooter>
          <CharityName>{name}</CharityName>
          <Button onClick={() => this.setState({ isDonating: true })}>Donate</Button>
        </CardFooter>
        <Backdrop isDonating={isDonating}>
          <CloseButton onClick={() => this.setState({ isDonating: false })}>x</CloseButton>
          <Content>
            <div>
              Select the amount to donate (USD)
            </div>
            <div>
              {payments}
            </div>
            <Button>Pay</Button>
          </Content>
        </Backdrop>
      </div>
    )
  }
}

const StyledCard = styled(Card)`
  border: 1px solid #ddd;
  box-shadow: 5px 5px 15px #888888;
  border-radius: 5px;
  width: 400px;
  flex: 0 auto;
  margin: 25px;
  text-align: center;
  display: inline-block;
  position: relative;
`

export default StyledCard
