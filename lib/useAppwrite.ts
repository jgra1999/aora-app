import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

export const useAppwrite = (fn: () => any) => {
	//TODO: any
	const [data, setData] = useState<any>([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchData = async () => {
		setIsLoading(true)

		try {
			const res = await fn()
			setData(res)
		} catch (error) {
			Alert.alert('Error', error.message)
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		fetchData()
	}, [])

	const refetch = () => fetchData()

	return { data, isLoading, refetch }
}
