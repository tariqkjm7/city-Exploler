import React from 'react'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class Movie extends React.Component {


    render() {




        return (

            <div>



                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.element1.img} />
                    <Card.Body>
                        <Card.Title>Title: {this.props.element1.title}</Card.Title>
                        <Card.Text>
                            <p>Rate: {this.props.element1.rate}</p>

                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        )

    }


}

export default Movie;