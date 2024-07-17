import { createContext, useContext } from 'react'

interface IGlobalContext {
	isLoading: boolean
	isLoggedIn: boolean
	user: any

	setIsLoading: (value: boolean) => void
	setIsLoggedIn: (value: boolean) => void
	setUser: (value: any) => void
}

export const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext)

export const useGlobalContext = () => useContext(GlobalContext)
