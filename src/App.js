import React from 'react'
import axios from 'axios'
//http://localhost:3005/weather?city=Amman
// http://localhost:3005/movie?query=Amman
class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      locationResl: {},
      getDatainfo: [],
      searchQuery: '',
      showAll: false,
      movieInfo : {},
      MRes:{}
    }

  }
  weather = async (e) => {
    e.preventDefault();
    await this.setState({
      moQuery: e.target.city.value
    })

    try {
      let MURL = `http://localhost:3005/movie?query=${this.state.moQuery}`
      let movieInfo = await axios.get(MURL)
      console.log(movieInfo.data[0]);


      this.setState({
        MRes: movieInfo.data[0],
        showAll: true

      })



      let wthUrl = `http://localhost:3005/weather?city=${this.state.moQuery}`;
      let weatherData = await axios.get(wthUrl);
      console.log(weatherData.data);
     await this.setState({

        getDatainfo: weatherData.data
      })



    } catch {
      console.log('something went wrong');
    }
    

  }












  cityLoc = async (e) => {
    e.preventDefault();

    await this.setState({
      searchQuery: e.target.city.value
    })

    try {
      let locURL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchQuery}&format=json`
      let locResult = await axios.get(locURL)
      console.log(locResult.data[0]);


      this.setState({
        locationResl: locResult.data[0],
        showAll: true

      })
      // getting weather data
      let wthUrl = `http://localhost:3001/weather?cityName=${this.state.searchQuery}`;
      let weatherData = await axios.get(wthUrl);
      console.log(weatherData.data);
     await this.setState({

        getDatainfo: weatherData.data
      })
      // console.log(getDatainfo);


    } catch {
      console.log('something went wrong');
    }

    this.weather();

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
            <p>city Name : {this.state.searchQuery}</p>
            <p>latitude: {this.state.locationResl.lat}</p>
            <p>longitude:{this.state.locationResl.lon}</p>

            <p>movie Name : {this.state.moQuery}</p>
            <p>latitude: {this.state.MRes.lat}</p>
            <p>longitude:{this.state.MRes.lon}</p>






            {
            this.state.getDatainfo.map(element => {
              return( <div>
                    <p>Date{element.date}</p>
                    <p>description {element.description}</p>
              </div>
              )
            })
          }


            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.locationResl.lat},${this.state.locationResl.lon}&zoom=10`} alt="" />
          </>
        }
      </div>
    )
  }
}
export default App