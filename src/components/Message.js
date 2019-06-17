import styled from 'styled-components'

const Message = styled.p`
  text-align: center;
  color: ${props => props.type === 'error' ? 'red' : '#4BB543'};
  margin: 1em 0;
  font-weight: bold;
  font-size: 16px;
`

export default Message
