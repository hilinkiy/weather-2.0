// Card.tsx

'use client'

import { useEffect, useState } from 'react'
import { getWeather } from '@/services/store.service'

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

export function Card() {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
	const [city, setCity] = useState('Tashkent')
	const [loading, setLoading] = useState(true)
	console.log(weatherData)

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				setLoading(true)
				const data = await getWeather(city)
				if (data) {
					setWeatherData(data)
				}
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchWeather()
	}, [city])

	if (loading) {
		return <p>Загрузка...</p>
	}

	const today = new Date()

	return (
		<div className='mt-10 grid grid-cols-4 grid-rows-2 justify-center items-center gap-3'>
			{weatherData?.daily.map((daily, index) => {
				// Вычисление даты для каждого элемента
				const forecastDate = new Date(today)
				forecastDate.setDate(today.getDate() + index)

				let displayDate: string

				// Проверка на "Вчера" и "Сегодня"
				if (index === 0) {
					displayDate = 'Вчера'
				} else if (index === 1) {
					displayDate = 'Сегодня'
				} else if (index === 2) {
					displayDate = "Завтра"
				} else {
					displayDate = forecastDate.toLocaleDateString('ru-RU', {
						day: 'numeric',
						month: 'numeric',
						year: 'numeric',
					})
				}

				return (
					<div key={index} className='bg-[#222222] p-3 h-[120px] flex justify-center flex-col rounded-xl'>
						<p>{displayDate}</p>
						<p>{Math.floor(daily.temp.day - 273.15)}°C</p>
						<p>{daily.weather[0].description}</p>
					</div>
				)
			})}
		</div>
	)
}
