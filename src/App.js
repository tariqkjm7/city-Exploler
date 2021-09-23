import React from 'react'
import axios from 'axios'
// http://localhost:3005/weather?city=Amman
// http://localhost:3001/movie?query=Amman
class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      locationResl: {},
      getDatainfo: [],
      searchQuery: '',
      showAll: false,
      movieInfo : [],
      MRes:{}
    }

  }

  //http://localhost:3005/movie?query=
  
  cityLoc = async (e) => {
    e.preventDefault();

    await this.setState({
      searchQuery: e.target.city.value
    })

    try {
      let locURL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchQuery}&format=json`
      let locResult = await axios.get(locURL)
      // console.log(locResult.data[0]);


      this.setState({
        locationResl: locResult.data[0],
        showAll: true

      })
      // getting weather data
      let wthUrl = `http://localhost:3001/weather?city=${this.state.searchQuery}`;
      let weatherData = await axios.get(wthUrl);
      // console.log(weatherData.data);
     await this.setState({

        getDatainfo: weatherData.data
      })
      // console.log(this.state.getDatainfo);


      // getting movie data
      
      let MUrl = `http://localhost:3001/movie?query=${this.state.searchQuery}`;
      let MData = await axios.get(MUrl);
      // console.log(MData);
     await this.setState({

      movieInfo: MData.data
      })
      console.log(this.state.movieInfo);
      






    } catch {
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
            <p>city Name : {this.state.searchQuery}</p>
            <p>latitude: {this.state.locationResl.lat}</p>
            <p>longitude:{this.state.locationResl.lon}</p>
            {
            this.state.getDatainfo.map(element => {
              return( <div>
                    <p>Date{element.Date}</p>
                    <p>description {element.Description}</p>
                    <p>temp {element.Temperature}</p>

              </div>
              )
            })
          }


            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.locationResl.lat},${this.state.locationResl.lon}&zoom=10`} alt="" />

            {
               this.state.movieInfo.map(element => {
                return( <div>
                      <p> title: {element.title}</p>
                      <p> Rate : {element.rate}</p>
                      <img src={element.img} alt="zzzzzzzz" />
  
                </div>
                )
              })
              



            }

          </>
        }
      </div>
    )
  }
}
export default App