'use client'

import { useEffect, useState } from 'react'
import { getWeather } from '@/services/store.service'
import { Card } from './Card'

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
}

const Main = () => {
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

	return (
		<div className='mt-10 flex flex-col justify-center items-center'>
			<div>
				<h1 className='text-3xl text-center'>{weatherData?.name}</h1>
				{weatherData?.current?.temp !== undefined ? (
					<p className='text-[50px] text-center mt-3 mb-3'>{Math.floor(weatherData.current.temp - 273.15)}°C</p>
				) : (
					<p>Данные о температуре не найдены</p>
				)}
				<p className='text-2xl text-center'>{weatherData?.current?.weather[0].description}</p>
			</div>
			<Card />
		</div>
	)
}

export default Main
