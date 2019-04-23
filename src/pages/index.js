import React from 'react'
import styled from 'styled-components'
import { Background } from '../styles/components'
import Loading from '../components/Loading'
import GoogleFontLoader from 'react-google-font-loader';
import { Container, Grid, Segment } from 'semantic-ui-react';
import logo from '../assets/horizontal-logo.png'
import Moment from 'react-moment'

export { default as Home } from './Home'
export { default as Clock } from './Clock'
export { default as Dashboard } from './Dashboard'


const Main = styled.main`
  position: relative;
`


const Index = ({ children, loading }) => {
  return(<Main>
    <Background />
    <GoogleFontLoader
      fonts={[
        {
          font: 'Bree Serif',
          weights: [400, 600],
        },
        {
          font: 'Open Sans',
          weights: [400, 600],
        }    
      ]}
    />
    <Grid padded verticalAlign="middle" columns={1} centered style={{height: '100vh'}}>
      <Grid.Row>
        <Grid.Column width={16} textAlign="center" verticalAlign="middle">
          <Segment style={{ minWidth: "380px", maxWidth: "500px", margin:"auto" }}  align="center">
            <Container style={{display: "flex", flexDirection: "row"}}>
                <div style={{flex: "0 0 160",textAlign: "left",}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <img  alt='Himama' width='160' src={logo}/>
                    </div>
                  </div>
                  <div style={{flex: 1, textAlign: "right",}}>
                    <ul style={{margin: 0, padding: 0, bottom: 0, marginRight: "5px", paddingLeft: "10px"}}>
                      <li style={{fontFamily: 'Bree Serif',color: "#108790",fontSize: "36px",listStyle: "none",paddingTop: "10px"}}>
                        <Moment format="HH:mm">{Date.now()}</Moment>
                      </li>
                      <li style={{fontFamily: 'Bree Serif',color: "#108790",fontSize: "12px",listStyle: "none",paddingTop: "10px"}}>
                        <Moment format="dddd">{Date.now()}</Moment>
                      </li>
                    </ul>
                  </div>
            </Container>
            <Container style={{ margin: 20 }}>
                {children}
            </Container>
            <Loading visible={loading} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>

  </Main>
)};


export default Index

// export default withRouter(
//   connect(
//     ({ ui: { loading } }) => ({loading}), 
//     {}
//   )
//   (Index))