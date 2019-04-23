import React, { PureComponent } from 'react'
import LabelForm from '../components/LabelForm'
import API from '../api';
import {HimamaContainer, NumpadUl, NumpadInput, NumpadLi} from '../styles/components';
import Loading from '../components/Loading'
import { Icon } from 'semantic-ui-react';


class Home extends PureComponent {
  constructor (props){
    super(props);
    this.state = {
        value: '',
        logIn: false,
        logInError: false,
        lists: [],
        home: true,
        //change this to dynamic value
        school_id: 1,
        loading: true,
        route_api: '', 
        employee: ''
    }
  }

  handleButtonPress = (e) => {
    this.setState({ 
        value:this.state.value+e
    }, this.uidCheck )
  }

  handleButtonDelete = () => {this.setState({ value: '' })}
  showLoading = () => {this.setState({ loading:true })}
  hideLoading = () => {this.setState({ loading:false })}
  
  uidCheck = () => {
    const { value, home, school_id } = this.state;
    const { match } = this.props;

    if(value.length >= 4){
      //console.log("state?", this.state);
      //loading
      this.showLoading();
      if(home){
        this.setState({ 
          uid: value,
          route_api: 'employee_uid',
          route: '/login/',
          employee: {
            school_id: school_id,
            uid: value
          }
        }, this.handleSubmit);
      }else{
        this.setState({ 
          route_api: 'employee_login',
          route: `/schools/${school_id}/employees/1/clock/`,
          employee: {
            school_id: school_id,
            uid: match.params.uid,
            password: value
          }
        }, this.handleSubmit);
      }
    }
  }

  handleSubmit = async event => {
    const { route_api, employee, route } = this.state;
    const { history } = this.props;
    const response = await API.post(route_api, employee)
      .then(response => {
          //console.log("success", response.data);
          //console.log("event_props", this.props);
          //console.log("event_state", this.state);
          
          this.setState({
              lists: response.data,
              uid: response.data.uid
          }, history.push({ pathname: route + response.data.uid }))
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



  componentDidMount() {
    const { history } = this.props;
    const home = (history.location.pathname.indexOf("login") < 0);
    //console.log("uri", home);
    this.setState({ 
      home: home,
      loading:false
    })
  }
  
   
  render () {
    const { value, logInError, home, loading } = this.state;
    const buttonColor = home ? "#f8f8f8" : "#34b9c6"; 
    return (
      <HimamaContainer >
         <NumpadInput 
            ref={input => {
                this.uid = input;
            }} 
            id="uid"  
            value = { value }  
            readOnly
            backgroundColor = { home ? "#FFFFFF" : "#FFFFFF" }
            color = { home ? "#34b9c6" : "#000" }
            placeholder = { home ? "Enter your 4 Digits UID" : "Now use your password"}
            />
            <LabelForm 
              errormessage={ home ? "Please check your UID employee number and try again. hint: 3757" : "Please check your UID employee number and try again. hint: 1234"}
              showlabel={logInError}
              />
            <NumpadUl>
            <NumpadLi backgroundColor =  { buttonColor}  onClick={() => this.handleButtonPress(1)}>1</NumpadLi>
            <NumpadLi backgroundColor =  { buttonColor} onClick={() => this.handleButtonPress(2)}>2</NumpadLi>
            <NumpadLi backgroundColor =  { buttonColor}  onClick={() => this.handleButtonPress(3)}>3</NumpadLi>
            <NumpadLi backgroundColor =  { buttonColor} onClick={() => this.handleButtonPress(4)}>4</NumpadLi>
            <NumpadLi backgroundColor =  { buttonColor}  onClick={() => this.handleButtonPress(5)}>5</NumpadLi>
            <NumpadLi backgroundColor =  { buttonColor} onClick={() => this.handleButtonPress(6)}>6</NumpadLi>
            <NumpadLi backgroundColor =  { buttonColor}  onClick={() => this.handleButtonPress(7)}>7</NumpadLi>
            <NumpadLi backgroundColor =  { buttonColor} onClick={() => this.handleButtonPress(8)}>8</NumpadLi>
            <NumpadLi backgroundColor =  { buttonColor}  onClick={() => this.handleButtonPress(9)}>9</NumpadLi>
            <NumpadLi></NumpadLi>
            <NumpadLi backgroundColor =  { buttonColor} onClick={() => this.handleButtonPress(0)}>0</NumpadLi>
            <NumpadLi onClick={this.handleButtonDelete}><Icon style={{fontSize: "25px"}} name="arrow left" /></NumpadLi>
            </NumpadUl>
            <Loading visible={loading} />
      </HimamaContainer>
    )
  }
}

export default Home