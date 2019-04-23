import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Webcam from 'react-webcam';
import {HimamaModalOverlay, 
  HimamaModal, 
  HimamaContainer, 
  HimamaWelcome, 
  HimamaSection} from '../styles/components';
import { Icon, Button, Message } from 'semantic-ui-react';
import API from '../api';
import moment from 'moment';
import b64toBlob from 'b64-to-blob';




class Clock extends PureComponent {
  constructor (props){
    super(props);
    this.state = {
      modalOpacity: "modal-is-invisible",
      employee: {
        name: "",
      },
      
      hideClockInError: true,
      hideClockOutError: true
    }
  }

  showLoading = () => {this.setState({ loading:true })}
  hideLoading = () => {this.setState({ loading:false })}

  componentDidMount() {
    const { match } = this.props;
    this.setState({ 
      route_api: `schools/${match.params.school_id}/employees/${match.params.employee_id}/`,
      route: '',
    }, this.getEmployee);
    
  }
  
  setRef = webcam => {
    this.webcam = webcam;
  };

  getEmployee = async event => {
    const { route_api, employee, route } = this.state;
    const { history } = this.props;
    const response = await API.get(route_api, employee)
      .then(response => {
        //console.log("getEmployee", response)  
          this.setState({
              employee: response.data,
          }, history.push({ pathname: route + response.data.uid }))
          this.hideLoading();
      })
      .catch(error => {
        history.push({ pathname: '/' });        
      })
  }

  handleClockIn = () => {
    this.routeClockIn();
  }
  handleClockOut = () => {
    this.routeClockOut();
  }

  routeClockOut = () => {
    const { match } = this.props;
    const { value, employee } = this.state;
    this.setState({ 
      uid: value,
      route_api: `schools/${match.params.school_id}/employees/${match.params.employee_id}/shifts/${employee.shift_id_last}`,
      callApi: API.put,
      route: '',
      shift: {
        worked_to: moment(Date.now()).format(),
        action:'clockout'
      }
    }, this.capture);
  }

  routeClockIn = () => {
    const { match } = this.props;
    const { value } = this.state;
    
    this.setState({ 
      uid: value,
      route_api: `schools/${match.params.school_id}/employees/${match.params.employee_id}/shifts`,
      callApi: API.post,
      route: '',
      shift: {
        worked_from: moment(Date.now()).format(),
        business_day: moment(Date.now()).format(),
        uploads: '',
        action:'clockin'
      }
    }, this.capture);
  }

  
  
  clock =  async event => {
    const { route_api, shift, route, callApi } = this.state;
    const { history } = this.props;
    
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    
    //console.log("adsasd", shift);
    const formData = new FormData();

    if(shift.action === 'clockin'){  
      formData.append('uploads', shift.uploads);
      formData.append('worked_from',shift.worked_from);
      formData.append('business_day',shift.business_day);
    }else{
      formData.append('uploads', shift.uploads);
      formData.append('worked_to',shift.worked_to);
    }
    
    

    const response = await callApi(route_api, formData, config)
      .then(response => {
        //console.log("response.data", response.data)
          this.setState({
              employee: response.data              
          },  history.push({pathname: route}) )
          this.hideLoading();
      })
      .catch(error => {
        //console.log("error", error)
        this.setState({ 
          logIn:true,
          logInError: true,
          value:''
        })
        this.hideLoading();
        setTimeout(() => {
          this.setState({ logInError: false });
        }, 4000);
      })
  }
  
 
  capture = () => {
    const { shift } = this.state;
    const imageSrc = this.webcam.getScreenshot();
    // const newShift = {...shift, uploads:imageSrc}
    const b64Data = imageSrc.split(",", 2)[1]; 
    
    const blob = b64toBlob(b64Data, 'image/png');

    this.setState({ imageSrc:imageSrc, modalOpacity: "modal-is-visible", shift: {...shift, uploads: blob} }, () => this.clock() );
    
    setTimeout(() => {
      this.setState({modalOpacity: "modal-is-invisible"});
    }, 4000);
    
  };

  clockInAlert = () => {
    this.setState({ hideClockInError: false });
    setTimeout(() => {
        this.setState({ hideClockInError: true });
    }, 4000)    
  }

  clockOutAlert = () => {
    this.setState({ hideClockOutError: false });
    setTimeout(() => {
        this.setState({ hideClockOutError: true });
    }, 4000)    
  }
  
  render () {
    const { imageSrc , modalOpacity, employee, hideClockInError, hideClockOutError } = this.state;
    const { match } = this.props;
    return (
      <HimamaContainer >
        <HimamaWelcome>
          <div style={{flex: 1,textAlign: "center"}}>
            <span style={{ fontFamily: 'Open Sans', fontSize: '13px', color: "#FFFFFF" }} > <Icon name="user circle" size="small"/> {employee.name}</span>
          </div>
        </HimamaWelcome>
        <HimamaSection>
          <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{flex: "1", textAlign: "center", height: "220px", paddingTop:"30px"}}>
              <Webcam 
              style={{ 
                border: "5px solid #FFFFFF",
                borderRadius: "100%",
                objectFit: "cover"
                }}
                screenshotFormat = "image/jpeg"
                imageSmoothing = {true}
                width = "160"
                height = "160"
                ref={this.setRef}
              />
            </div>
            <div style={{flex: "1", textAlign: "center"}}>
              <span style={{ fontFamily: 'Open Sans', display: "block", color:"#FFFFFF", fontWeight: 600}}>Good Morning, {employee.name}</span>
              <span style={{ fontFamily: 'Open Sans', display: "block", color:"#FFFFFF", fontWeight: 400, fontSize: "11px"}}>
                {employee.clocked_in ? 'You are currently clocked in' : 'You are currently clocked out'}
                
              </span>
            </div>
            <div style={{flex: "1", textAlign: "center", paddingTop: "30px"}}>
              
              
              <Button onClick={
                  employee.clocked_in ? this.clockInAlert : this.handleClockIn
              } positive size="massive"> Clock In 
              </Button>
              <Button onClick={
                  !employee.clocked_in ? this.clockOutAlert : this.handleClockOut
              } negative size="massive"> Clock Out </Button>
              <Message
                error
                hidden = {hideClockInError}
                header='You are already clocked in'
                list={[
                  'Please make sure that you\'ve clocked out before to clock in.',
                ]}
                />
              <Message
                error
                hidden = {hideClockOutError}
                header='You are already clocked out'
                list={[
                  'Please make sure that you\'ve clocked in before to clock out.',
                ]}
                />
              <HimamaModalOverlay className={modalOpacity}/>
              <HimamaModal className={modalOpacity}>
                <img src={imageSrc}
                  style={{
                    border: "10px solid #FFFFFF",
                    borderRadius: "100%",
                    width: "200px",
                    height: "200px",
                    objectFit: "cover"                    
                  }}
                />
                <span style={{ fontFamily: 'Open Sans', display: "block", color:"#FFFFFF", fontWeight: 600}}>
                  <Icon name="user circle" size="small"/> 
                    {employee.clocked_in ? `Clocked in at ${moment(Date.now()).format('LT')}` : `Clocked out at ${moment(Date.now()).format('LT')}`}
                  </span> 
              </HimamaModal>
            </div>
          </div>
         </HimamaSection>
         <HimamaWelcome>
          <div style={{display: "flex", flexDirection: "row"}}>
              <div style={{flex: "0 0 50%",textAlign: "left",}}>
                <Link to={`${match.url}/dashboard`} style={{ fontFamily: 'Open Sans', fontSize: '13px', color: "#FFFFFF" }} > <Icon name="clock" size="small"/> Clock Events</Link>
              </div>
              <div style={{flex: "1", textAlign: "right",}}>
                <Link  to="/" style={{ fontFamily: 'Open Sans', fontSize: '13px', color: "#FFFFFF" }} > Exit <Icon name="log out" size="small"/></Link> 
              </div>
          </div>          
        </HimamaWelcome>
      </HimamaContainer>
    )
  }
}

export default Clock