import React from 'react'
import axios from 'axios'

class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      locationRes: {},
      searchQuery: '',
      showAll: false
    }

  }

  cityLoc = async (e) => {
    e.preventDefault();


    await this.setState({
      searchQuery: e.target.city.value
    })

try{     let locURL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchQuery}&format=json`
    let locResult = await axios.get(locURL)
    console.log(locResult.data[0]);

    this.setState({
      locationRes: locResult.data[0],
      showAll:true 

    })
  } catch{
    console.log('something went wrong');
  }



  }
  render() {
    return (
      <div>
        <h2>city explorer app </h2>

   
        <form onSubmit={this.cityLoc}>
          <input type="text" name='city' />
          <input type="submit" value='render all' />


        </form>
          {this.state.showAll && 
          
          <>
          <p>city Nmae : {this.state.searchQuery}</p>
        <p>latitude: {this.state.locationRes.lat}</p>

        <p>longitude:{this.state.locationRes.lon}</p>

        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.locationRes.lat},${this.state.locationRes.lon}&zoom=10`} alt="" />

       </>
    }
    </div>
  )
}
}
export default App
