import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'

interface Props {
	icon: any
	color: string
	name: string
	focused: boolean
}

export function TabIcon({ icon, color, name, focused }: Props) {
	useEffect(() => {
		console.log('name')
	}, [])
	return (
		<View className='items-center justify-center gap-2 mt-3'>
			<Image
				source={icon}
				resizeMode='contain'
				tintColor={color}
				className='w-6 h-6'
			/>
			<Text
				className={`${
					focused ? 'font-psemibold' : 'font-pregular'
				} text-xs text-white`}
			>
				{name}
			</Text>
		</View>
	)
}
