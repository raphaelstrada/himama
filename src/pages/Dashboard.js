import React, { PureComponent } from 'react'
import {HimamaModalOverlay, 
  HimamaModal, 
  HimamaContainer} from '../styles/components';
import { Segment, Icon, Table, Image } from 'semantic-ui-react';
import img from '../assets/uploads/6825.jpg'
import {
    DateTimeInput,
  } from 'semantic-ui-calendar-react';
import Moment from 'react-moment';
import API from '../api';




class Clock extends PureComponent {
  constructor (props){
    super(props);
    this.state = {
        //timesFrom: ["15-04-2019 12:31 am", "16-04-2019 12:32 am", "17-04-2019 12:33 am", "18-04-2019 12:34", "19-04-2019 12:35"],
        //timesTo: ["15-04-2019 09:01", "16-04-2019 09:02", "17-04-2019 09:03", "18-04-2019 09:04", "19-04-2019 09:05"],
        modalOpacity: "modal-is-visible",
        shifts: {}
    }
  }

  showLoading = () => {this.setState({ loading:true })}
  hideLoading = () => {this.setState({ loading:false })}

  componentDidMount() {
    this.showLoading();
    const { match } = this.props;
    this.setState({ 
      route_api: `schools/${match.params.school_id}/employees/${match.params.employee_id}/shifts`,
      route: '',
    }, this.getShifts);
    
  }

  getShifts = async event => {
    const { route_api, route } = this.state;
    const { history } = this.props;
    const response = await API.get(route_api, route)
      .then(response => {
        //console.log("getEmployee", response)  
          this.setState({
              shifts: response.data,
          });
          this.hideLoading();
      })
      .catch(error => {
        history.push({ pathname: '/' });        
      })
  }

  handleChange = (event, {name, value, index, type}) => {
    //console.log(name, value, index, type)
    if (type === "from"){
        this.setState({
            //timesFrom: { ...this.state.timesFrom, [index]: value }
        });
    }else{
        this.setState({
            //timesTo: { ...this.state.timesTo, [index]: value }
        });
    }
    
  }

  render () {
    const fieldsArray = [];
    const { modalOpacity, shifts } = this.state;
    

    


    Object.keys(shifts).map(key =>{
        fieldsArray.push(
            <Table.Row key={key} style={{ minWidth: "300px", maxWidth: "500px", margin:"auto" }}>
                <Table.Cell><Image src={shifts[key].snapshot_blob_from} size="mini"/></Table.Cell>
                <Table.Cell>
                    <DateTimeInput
                    name={"timesFrom"+key}
                    placeholder="Date Time"
                    value={shifts[key].worked_from}
                    iconPosition="left"
                    index={key}
                    onChange={this.handleChange}
                    type="from"
                    timeFormat="ampm"
                    closable={true}
                    style={{ minWidth: "50px", maxWidth: "150px", margin:"auto" }}
                    />
                </Table.Cell>
                <Table.Cell><Image src={shifts[key].snapshot_blob_to} size="mini"/></Table.Cell>
                <Table.Cell>
                    <DateTimeInput
                    name={"timesTo"+key}
                    placeholder="Date Time"
                    value={shifts[key].worked_to}
                    iconPosition="left"
                    index={key}
                    onChange={this.handleChange}
                    type="to"
                    timeFormat="ampm"
                    closable={true}
                    style={{ minWidth: "50px", maxWidth: "150px", margin:"auto" }}
                    />
                </Table.Cell>
                <Table.Cell><Icon name="delete"/></Table.Cell>
            </Table.Row>
        );
    });
    return (
        <HimamaContainer >
            <HimamaModalOverlay style={{}} className={modalOpacity} onClick={() => { this.props.history.goBack() }}/>
            <HimamaModal className={modalOpacity} style={{ maxWidth: "515px", minWidth: "415px", overflowY: "scroll"}}>

                    <Table striped={true} unstackable={false} >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='6'>Clock-in and out list</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                         {fieldsArray}
                        </Table.Body>
                    </Table>

            </HimamaModal>
        </HimamaContainer >
    )
  }

}

export default Clock