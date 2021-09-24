import React from 'react'
import axios from 'axios'
import Movie from './components/Movie'
import Weather from './components/Weather'
import Location from './components/Location'



class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      locationResl: [],
      getDatainfo: [],
      searchQuery: '',
      showAll: false,
      movieInfo: [],
      MRes: {}
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
      console.log(locResult.data);


      this.setState({
        locationResl: locResult.data,
        showAll: true

      })



      // getting weather data
      let wthUrl = `http://localhost:3001/weather?city=${this.state.searchQuery}`;
      let weatherData = await axios.get(wthUrl);
      await this.setState({

        getDatainfo: weatherData.data,
        showAll: true

      })
      console.log(this.state.getDatainfo);

      // getting movie data

      let MUrl = `http://localhost:3001/movie?query=${this.state.searchQuery}`;
      let MData = await axios.get(MUrl);
      // console.log(MData);
      await this.setState({
        showAll: true,
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
            {/* {
              this.state.locationResl.map(element => {
                return (

                  <Location element1={element} />
                )

              })

            } */}


            {
              this.state.getDatainfo.map(element => {
                return (
                  <Weather element1={element} />
                )
              })
            }




            {
              this.state.movieInfo.map(element => {
                return (
                  <Movie element1={element} />
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