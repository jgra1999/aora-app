import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants'

export function SearchInput() {
	return (
		<View className='space-y-2 w-full'>
			<View className='flex-row items-center border-2 border-black-200 bg-black-100 w-full h-16 px-4 rounded-2xl focus:border-secondary'>
				<TextInput
					className='flex-1 mt-0.5 text-white font-pregular'
					placeholder='Search a video'
					placeholderTextColor='#7b7b8b'
				/>
				<TouchableOpacity>
					<Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
				</TouchableOpacity>
			</View>
		</View>
	)
}
