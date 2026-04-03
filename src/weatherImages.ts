import Clear from "/src/assets/weather/sun.png"
import Clouds from "/src/assets/weather/clouds.png"
import Rain from  "/src/assets/weather/rain.png"
import Drizzle from  "/src/assets/weather/rain.png"
import Thunderstorm from "/src/assets/weather/storm.png"
import Snow from "/src/assets/weather/snow.png"
import Mist from "/src/assets/weather/foggy.png"
import Fog from "/src/assets/weather/foggy.png"
import Haze from "/src/assets/weather/foggy.png"
import Smoke from "/src/assets/weather/foggy.png"
import Dust from "/src/assets/weather/foggy.png"
import Sand from "/src/assets/weather/foggy.png"
import Ash from "/src/assets/weather/foggy.png"
import Squall from "/src/assets/weather/wind.png"
import Tornado from "/src/assets/weather/wind.png"
import FewClouds from "/src/assets/weather/few-clouds.png"



export const weatherIcons: Record<string, string> = {
  Clear,
  Clouds,
  Rain,
  Drizzle,
  Thunderstorm,
  Snow,
  Mist,
  Fog,
  Haze,
  Smoke,
  Dust,
  Sand,
  Ash,
  Squall,
  Tornado,

  "few clouds": FewClouds,
  "scattered clouds": FewClouds,
  "broken clouds": FewClouds,

};