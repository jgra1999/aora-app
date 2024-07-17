import { useState, useEffect, useContext, createContext } from 'react'
import { GlobalContext } from './global-context'

import { getCurrentUser } from '@/lib/appwrite'

export function GlobalProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [user, setUser] = useState<any>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				if (res) {
					setIsLoggedIn(true)
					setUser(res)
				} else {
					setIsLoggedIn(false)
					setUser(null)
				}
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setIsLoading(false)
			})

		// try {
		// 	const res = getCurrentUser()
		// 	if (res) {
		// 		setIsLoggedIn(true)
		// 		setUser(res)
		// 	} else {
		// 		setIsLoggedIn(false)
		// 		setUser(null)
		// 	}
		// } catch (error) {
		// 	console.log(error)
		// } finally {
		// 	setLoading(false)
		// }
	}, [])

	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				user,
				setUser,
				isLoading,
				setIsLoading
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
