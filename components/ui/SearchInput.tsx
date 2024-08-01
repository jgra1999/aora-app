import { useState } from 'react'
import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { router, usePathname } from 'expo-router'
import { icons } from '@/constants'

export function SearchInput() {
	const pathname = usePathname()
	const [query, setQuery] = useState('')

	const searchData = () => {
		if (!query) return Alert.alert('Input Empty', 'Please type something to search')

		if (pathname.startsWith('/search')) {
			router.setParams({ query })
		} else {
			router.push(`/search/${query}`)
		}
	}
	return (
		<View className='space-y-2 w-full'>
			<View className='flex-row items-center border-2 border-black-200 bg-black-100 w-full h-16 px-4 rounded-2xl focus:border-secondary'>
				<TextInput
					className='flex-1 mt-0.5 text-white font-pregular'
					placeholder='Search a video'
					placeholderTextColor='#7b7b8b'
					onChangeText={(e) => setQuery(e)}
				/>
				<TouchableOpacity onPress={searchData}>
					<Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
				</TouchableOpacity>
			</View>
		</View>
	)
}
