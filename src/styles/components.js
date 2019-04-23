import styled from 'styled-components'

export const Background = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #34b9c6;
  background-size: 500px 500px;
  background-repeat: no-repeat;
  background-position: center fixed;
  background-size:cover;

  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;  
`


export const HimamaContainer = styled.div`
    padding-top: 40px;
    width: 100%;
    height: 440px;
    position: relative;
    border: 1px solid #eee;
    margin-top: 20px;
    padding: 0px;
    
`

export const HimamaSection = styled.div`
    width: 100%;
    height: 85%;
    position: relative;
    padding: 0px;
    background-color:#2dacb5
    
`
export const HimamaModalOverlay = styled.div`
    background-color: rgba(34, 36, 38, .9);
    display: none;
    position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    z-index: 980;

    &.modal-is-visible {
      display: block;
      z-index: 1009;
    }
`
export const HimamaModal = styled.div`
    border-radius: 10px;
    display: none;
    max-height: calc(100% - 100px);
    position: fixed;
      top: 50%;
      left: 50%;
      right: auto;
      bottom: auto;
    transform: translate(-50%, -50%);
    z-index: 990;

    &.modal-is-visible {
      display: block;
      z-index: 1010;
    }
    
`

export const HimamaWelcome = styled.div`
    text-align: right;
    padding-top:10px;
    padding-left:10px;
    padding-right:10px;
    width: 100%;
    height: 40px;
    border: 0px;
    background-color: #108790
`

export const NumpadInput = styled.input.attrs({
    type: 'password',
    size: props => (props.small ? 5 : undefined),
  })`
      font-size: 31px;
      padding: 3px 10px;
      border: 0;
      border-bottom: 2px solid #3498db;
      margin: 0 15px;
      width: 84%;
      outline: 0;
      text-align: center;
      border-radius: 0;
      color: ${props => (props.color)};
      background-color: ${props => (props.backgroundColor)};
      ::placeholder {
        color: ${props => (props.color)};
        text-align:center;
        font-size:20px
      }
`

export const NumpadUl = styled.ul`
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-left: 0px;
    padding-left: 10px;
    padding-bottom: 20px;
`


export const NumpadLi = styled.li`
    &:hover {opacity: .5;visibility: visible;}
    &:after {transition: all .5s;}
    &:before {transition: all .5s;}
    background-color: ${props => (props.backgroundColor)};
    margin:1px
    font-size: 42px;
    float: left;
    list-style: none;
    text-align: center;
    height: 72px;
    padding-top: 25px;
    width: 32%;
    border-radius: 6px!important;
    -webkit-font-smoothing: antialiased;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
`