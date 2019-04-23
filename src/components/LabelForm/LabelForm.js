import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import { Label } from 'semantic-ui-react';


const pulse = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`

export default class extends PureComponent {
    constructor (props){
        super(props);
        this.state = {
            display: "none"
        }
      }
   
//   onTimeout = () => {
//     this.setState({ showSlowLoading: true })
//   }

//   componentWillReceiveProps (nextProps) {
//     if (nextProps.visible) {
//       this.interval = setTimeout(this.onTimeout, 20000)
//     }

//     if (nextProps.visible === false) {
//       clearTimeout(this.interval)
//     }
//   }
    
  render () {
    const { display , errorMessage} = this.props;
    const WrapError = styled.div`
        width: 100%;
        height: 100%;
        z-index: 999;
        display: ${display ? 'block' : 'none'}
        animation: ${pulse} 1s ${({ theme: { easings } }) => easings.easeOutSine};
    `
    // const { visible } = this.props
    // const { showSlowLoading } = this.state
    return (
        <WrapError>
            <Label  
                basic color='red' 
                pointing 
                {...this.props}
                >
                { errorMessage }
                
            </Label>
        </WrapError>
    )
  }
}
