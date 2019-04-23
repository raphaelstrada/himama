import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Webcam from "react-webcam";
import {HimamaModalOverlay, 
  HimamaModal, 
  HimamaContainer, 
  HimamaWelcome, 
  HimamaSection} from '../styles/components';
import { Segment, Icon, Table, Header, Image } from 'semantic-ui-react';
import img from '../assets/uploads/6825.jpg'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
  } from 'semantic-ui-calendar-react';
import Moment from 'react-moment';




class Clock extends PureComponent {
  constructor (props){
    super(props);
    this.state = {
        timesFrom: ["15-04-2019 12:31 am", "16-04-2019 12:32 am", "17-04-2019 12:33 am", "18-04-2019 12:34", "19-04-2019 12:35"],
        timesTo: ["15-04-2019 09:01", "16-04-2019 09:02", "17-04-2019 09:03", "18-04-2019 09:04", "19-04-2019 09:05"],
        modalOpacity: "modal-is-visible"

    }
  }

  handleChange2(i, e) {
    console.log([i], e)
    // this.setState({
    //     timesFrom: { ...this.state.timesFrom, [i]: e.target.value }
    // });
  }

  handleChange = (event, {name, value, index, type}) => {
    console.log(name, value, index, type)
    if (type === "from"){
        this.setState({
            timesFrom: { ...this.state.timesFrom, [index]: value }
        });
    }else{
        this.setState({
            timesTo: { ...this.state.timesTo, [index]: value }
        });
    }
    
  }

  render () {
    const fieldsArray = [];
    const { timesFrom, timesTo , modalOpacity } = this.state;
    for (var i = 0; i <= 4; i++) {
        fieldsArray.push(
            <Table.Row key={i}>
                <Table.Cell collapsing><Image src={img} size="mini"/></Table.Cell>
                <Table.Cell>
                    <Moment diff="2018-04-19T09:59" unit="minutes">2018-04-19T13:22-0500</Moment>
                    <DateTimeInput
                    name={"timesFrom"+i}
                    placeholder="Date Time"
                    value={timesFrom[i]}
                    iconPosition="left"
                    index={i}
                    onChange={this.handleChange}
                    type="from"
                    timeFormat="ampm"
                    closable={true}
                    />
                </Table.Cell>
                <Table.Cell collapsing><Image src={img} size="mini"/></Table.Cell>
                <Table.Cell>
                    <DateTimeInput
                    name={"timesTo"+i}
                    placeholder="Date Time"
                    value={timesTo[i]}
                    iconPosition="left"
                    index={i}
                    onChange={this.handleChange}
                    type="to"
                    timeFormat="ampm"
                    closable={true}
                    icon={img}
                    />
                </Table.Cell>
                <Table.Cell><Icon name="delete"/></Table.Cell>
            </Table.Row>
        );
    }
    return (
        <HimamaContainer >
            <HimamaModalOverlay className={modalOpacity}/>
            <HimamaModal className={modalOpacity} style={{}}>
                <Segment>
                    <span style={{ fontFamily: 'Open Sans', display: "block", color:"#FFFFFF", fontWeight: 600}}> Welcome </span>
                    <Table striped={true} unstackable={true} >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='6'>Clock-in and out list</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                         {fieldsArray}
                        </Table.Body>
                    </Table>
                </Segment> 
            </HimamaModal>
        </HimamaContainer >
    )
  }

}

export default Clock