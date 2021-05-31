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
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    const dailyTemp =
      this.state.weatherData &&
      this.state.weatherData.daily.map((item) => {
        let date = new Date(item.dt * 1000);
        let day = date.getDay();
        return (
          <div className="day-temp">
            <p> {daysArray[day]} </p>
            <p className="temp"> {item.temp.day} ° </p>
          </div>
        );
      });
    return (
      <div className="parent-container">
        {this.state.weatherData && (
          <div className="container">
            <div className="upper-container">
              <div>
                <p className="current-temp">
                  {" "}
                  {this.state.weatherData.daily[0].temp.day} °F
                </p>
                <h2>{new Date().toDateString()}</h2>
              </div>

              <img
                src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png"
                alt=""
              />
            </div>

            <div className="daily-temp">{dailyTemp}</div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
