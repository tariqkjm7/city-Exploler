import React from "react";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class Location extends React.Component {


  render() {


    //
    return (

      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.props.element1.lat},${this.props.element1.lon}&zoom=10`} />
          <Card.Body>
            <Card.Title>city Name : {'Tariq'}</Card.Title>
            <Card.Text>
              <p>latitude: {this.props.element1.lat}</p>
              <p>longitude :{this.props.element1.lon}</p>
            </Card.Text>
          </Card.Body>
        </Card>


      </div>



    )

  }

}
export default Location;