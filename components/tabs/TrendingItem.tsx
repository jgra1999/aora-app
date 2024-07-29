import { icons } from '@/constants'
import { useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'

interface Props {
	activeItem: Video
	item: Video
}

const zoomIn = {
	0: {
		// opacity: 0,
		scale: 0.9
	},
	1: {
		// opacity: 1,
		scale: 1
	}
}

const zoomOut = {
	0: {
		// opacity: 1,
		scale: 1
	},
	1: {
		// opacity: 0,
		scale: 0.9
	}
}

export default function TrendingItem({ activeItem, item }: Props) {
	const [play, setPlay] = useState(false)
	return (
		<Animatable.View
			className='mr-5'
			animation={activeItem === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			{play ? (
				<Text>TrendingItem</Text>
			) : (
				<TouchableOpacity
					className='relative justify-center items-center'
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
				>
					<ImageBackground
						source={{ uri: item.thumbnail }}
						className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
						resizeMode='cover'
					/>

					<Image
						source={icons.play}
						className='w-12 h-12 absolute'
						resizeMode='contain'
					/>
				</TouchableOpacity>
			)}
		</Animatable.View>
	)
}
