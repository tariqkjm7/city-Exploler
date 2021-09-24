import React from 'react'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


import Col from "react-bootstrap/Col";

class Weather extends React.Component {

    render() {


        return (
            <div>
                {/* <p>Date{this.props.element1.Date}</p>
                <p>description {this.props.element1.Description}</p>
                <p>temp {this.props.element1.Temperature}</p> */}
                <Col>
                <Card style={{ width: '18rem' }}>
                
                    <Card.Body>
                        <Card.Title>Date: {this.props.element1.Date}</Card.Title>
                        <Card.Text>
                            <p>Temperature: {this.props.element1.Temperature}</p>

                        </Card.Text>
                    </Card.Body>
                </Card>

                </Col>
            </div>

        )
    }




}

export default Weather;