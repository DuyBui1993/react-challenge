import styled from 'styled-components'

const Button = styled.button`
  color: #799FF9;
  border: 1px solid #799FF9;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.5;
  outline: none;
  padding: 6px 8px;
  cursor: pointer;
  :hover {
    transition: all 0.5s;
    color: #FFFFFF;
    background: #799FF9;
  }
  :active {
    background: #526dff;
  }
`

export default Button
