import axios from 'axios'

interface WeatherData {
	lat: number
	lon: number
	name: string
	current: {
		temp: number
		weather: {
			description: string
		}[]
	}
	daily: {
		temp: {
			day: number
		}
		weather: {
			description: string
		}[]
	}[]
}

const state = {
	apiKey: '85bcea9fc80f978ed17af89f7cab8f51',
}

export const getWeather = async (cityName: string): Promise<WeatherData | undefined> => {
	try {
		const apiUrl = 'https://api.openweathermap.org'

		const { data: geoData } = await axios.get(`${apiUrl}/geo/1.0/direct`, {
			params: {
				q: cityName,
				appid: state.apiKey,
			},
		})

		if (!geoData.length) {
			throw new Error(`Город ${cityName} не найден`)
		}

		const { lat, lon, name } = geoData[0]

		const { data: weatherData } = await axios.get(`${apiUrl}/data/2.5/onecall`, {
			params: {
				lat,
				lon,
				exclude: 'hourly,minutely',
				appid: state.apiKey,
				lang: 'ru',
			},
		})

		return {
			...weatherData,
			lat,
			lon,
			name,
		} as WeatherData
	} catch (error) {
		console.error('Ошибка при получении данных о погоде:', error)
	}
}
