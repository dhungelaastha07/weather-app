import { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: null,
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&appid=bee07d385df69518b4590d18cd27d4e5&units=imperial"
      )
      .then((res) => {
        this.setState({
          weatherData: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const daysArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dailyTemp =
      this.state.weatherData &&
      this.state.weatherData.daily.map((item) => {
        let date = new Date(item.dt * 1000);
        let day = date.getDay();
        return (
          <div>
            {daysArray[day]}: {item.temp.day}
          </div>
        );
      });
    return (
      <div>
        {this.state.weatherData && (
          <div>
            <h1>{dailyTemp}</h1>
            <h1>
              {" "}
              Current Temperature : {this.state.weatherData.daily[0].temp.day}
            </h1>
          </div>
        )}
      </div>
    );
  }
}

export default App;
