const fetchForecast = async () => {
    const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=Charleroi,BE&units=metric&appid=35a424094f5768808cd0f9ac43b6d336')
    const result = await response.json()
    console.log(result)
}
fetchForecast()