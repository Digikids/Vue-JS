<template>
  <div class="weather-app">
    <header><h1>WeatherWise</h1></header>
    <div class="search-bar">
      <input v-model="city" @keyup.enter="fetchWeather" placeholder="Enter city name...."/>
      <button @click="fetchWeather" :disabled="loading">{{ loading ? '⏳' : '🔍'}}</button>
    </div>
    <div v-if="loading" class="loading">Loading</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="weather" class="weather-card">
      <h2>{{ weather.city }}, {{ weather.country }}</h2>
      <div class="temp">{{ weather.temp }}°C</div>
      <div class="desc">{{ weather.desc }}</div>

      <div class="details">
        <span>💨 {{ weather.wind }} km/h</span>
        <span>💧 {{ weather.humidity }} %</span>
      </div>

      <div class="forecast-grid">
        <div v-for="day in forecast" :key="day.date" class="forecast-day">
          <div>{{ day.date }}</div>
          <div>{{ day.high }}°/{{ day.low }}°</div>
        </div>
      </div>

      <div class="tip">💡 {{ weatherTip }}</div>
    </div>
    <div v-else class="welcome">🔍 Search for any city</div>
  </div>
</template>

<script>
const w = {
  0: {desc: '☀️ Clear sky', tip: 'Perfect for outdoor activities!'},
  1: {desc: '🌤️ Mainly clear', tip: 'Great weather for a walk!'},
  2: {desc: '⛅ Partly cloudy', tip: 'Bring a jacket.'},
  3: {desc: '☁️ Overcast', tip: 'Perfect for indoors activities.'},
  45: {desc: '🌫️ Foggy', tip: 'Drive carefully.'},
  48: {desc: '🌫️ Foggy', tip: 'Drive carefully.'},
  51: {desc: '🌦️ Drizzle', tip: 'Keep an umbrella handy.'},
  53: {desc: '🌦️ Drizzle', tip: 'Keep an umbrella handy.'},
  55: {desc: '🌦️ Drizzle', tip: 'Keep an umbrella handy.'},
  56: {desc: '🌧️ Freezing drizzle', tip: 'Watch out for icy roads.'},
  57: {desc: '🌧️ Freezing drizzle', tip: 'Watch out for icy roads.'},
  61: {desc: '🌧️ Light rain', tip: 'Keep an umbrella handy.'},
  63: {desc: '🌧️ Moderate rain', tip: 'Wear waterproof clothing.'},
  65: {desc: '🌧️ Heavy rain', tip: 'Avoid travel if possible.'},
  66: {desc: '🌧️ Freezing rain', tip: 'Dangerous conditions, stay safe!'},
  67: {desc: '🌧️ Freezing rain', tip: 'Dangerous conditions, stay safe!'},
  71: {desc: '❄️ Light snow', tip: 'Bundle up warmly!'},
  73: {desc: '❄️ Moderate snow', tip: 'Bundle up warmly!'},
  75: {desc: '❄️ Heavy snow', tip: 'Avoid travel if possible.'},
  77: {desc: '❄️ Snow grains', tip: 'Be careful on roads.'},
  80: {desc: '🌦️ Rain showers', tip: 'Be prepared for rain.'},
  81: {desc: '🌦️ Rain showers', tip: 'Be prepared for rain.'},
  82: {desc: '🌦️ Violent showers', tip: 'Stay indoors if possible.'},
  85: {desc: '❄️ Snow showers', tip: 'Bundle up warmly!'},
  86: {desc: '❄️ Snow showers', tip: 'Bundle up warmly!'},
  95: {desc: '⛈️ Thunderstorm', tip: 'Stay indoors away from windows.'},
  96: {desc: '⛈️ Thunderstorm with hail', tip: 'Stay indoors away from windows.'},
  99: {desc: '⛈️ Thunderstorm with hail', tip: 'Stay indoors away from windows.'}
}

export default {
  name: 'WeatherApp',
  data() {
    return {
      city: '',
      weather: null,
      forecast: null,
      loading: false,
      error: '',
      weatherTip: ''
    }
  },
  mounted() {
    const saved = localStorage.getItem('lastCity')
    if (saved) {
      this.city = saved
      this.fetchWeather()
    }
  },
  methods: {
    async fetchWeather() {
      if (!this.city.trim()) return
      
      this.loading = true
      this.error = ''
      this.weather = null
      this.forecast = null
      
      try {
        // Geocoding API - get coordinates from city name
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(this.city)}&count=1&language=en&format=json`
        const geoRes = await fetch(geoUrl)
        const geoData = await geoRes.json()
        
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error(`City "${this.city}" not found`)
        }
        
        const { latitude, longitude, name, country } = geoData.results[0]
        
        // Weather API - get current weather and forecast
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
        const weatherRes = await fetch(weatherUrl)
        const data = await weatherRes.json()
        
        // Get weather info based on weather code
        const currentCode = data.current.weathercode
        const weatherInfo = w[currentCode] || w[0]
        
        // Set current weather
        this.weather = {
          city: name,
          country: country,
          temp: Math.round(data.current.temperature_2m),
          wind: Math.round(data.current.windspeed_10m),
          humidity: data.current.relative_humidity_2m,
          desc: weatherInfo.desc
        }
        
        this.weatherTip = weatherInfo.tip
        
        // Process 5-day forecast
        this.forecast = data.daily.time.slice(0, 5).map((date, i) => ({
          date: new Date(date).toLocaleDateString('en-GB', { weekday: 'short' }),
          high: Math.round(data.daily.temperature_2m_max[i]),
          low: Math.round(data.daily.temperature_2m_min[i]),
          code: data.daily.weathercode[i]
        }))
        
        // Save to localStorage
        localStorage.setItem('lastCity', this.city)
        
      } catch (err) {
        console.error('Weather fetch error:', err)
        this.error = err.message || 'Network error. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.weather-app {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

header {
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
  padding: 20px;
}

header h1 {
  font-size: 2.5em;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 60px;
  padding: 5px;
  backdrop-filter: blur(10px);
}

input {
  flex: 1;
  padding: 14px 20px;
  font-size: 16px;
  border: none;
  border-radius: 60px;
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
  outline: none;
}

input:focus {
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

button {
  padding: 12px 28px;
  font-size: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}

.loading, .error, .welcome {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  color: #666;
  font-size: 1.2em;
  backdrop-filter: blur(10px);
}

.error {
  color: #d32f2f;
  background: rgba(255, 243, 243, 0.95);
}

.welcome {
  font-size: 1.3em;
  color: #667eea;
}

.weather-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.weather-card h2 {
  font-size: 1.8em;
  margin-bottom: 15px;
  color: #333;
}

.temp {
  font-size: 72px;
  font-weight: bold;
  color: #667eea; /* Solid color instead of gradient */
  margin: 20px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.desc {
  font-size: 24px;
  margin-bottom: 25px;
  color: #555;
}

.details {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 25px 0;
  flex-wrap: wrap;
}

.details span {
  padding: 10px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 50px;
  font-weight: 500;
  color: #333;
}

.forecast-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin: 25px 0;
}

.forecast-day {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding: 12px;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.2s ease;
}

.forecast-day:hover {
  transform: translateY(-3px);
}

.forecast-day div:first-child {
  font-weight: bold;
  color: #667eea;
  margin-bottom: 8px;
}

.forecast-day div:last-child {
  font-size: 0.9em;
  color: #555;
  font-weight: 600;
}

.tip {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 15px;
  padding: 15px;
  text-align: center;
  color: #2e7d32;
  margin-top: 20px;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .weather-app {
    padding: 15px;
  }
  
  header h1 {
    font-size: 2em;
  }
  
  .temp {
    font-size: 56px;
  }
  
  .desc {
    font-size: 20px;
  }
  
  .forecast-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
  }
  
  .details {
    gap: 15px;
  }
  
  .details span {
    padding: 8px 15px;
    font-size: 14px;
  }
}

@media (max-width: 600px) {
  .search-bar {
    flex-direction: column;
    background: transparent;
    padding: 0;
  }
  
  input {
    border-radius: 50px;
  }
  
  button {
    padding: 12px 20px;
  }
  
  .temp {
    font-size: 48px;
  }
  
  .weather-card {
    padding: 20px;
  }
  
  .forecast-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .forecast-grid {
    grid-template-columns: 1fr;
  }
}
</style>
