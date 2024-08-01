import { TouchableOpacity, ImageBackground, Image } from 'react-native'
import { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '@/constants'

interface Props {
	activeItem: VideoData
	item: VideoData
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
			animation={activeItem?.$id === item?.$id ? zoomIn : zoomOut}
			duration={500}
		>
			{play ? (
				<Video
					source={{ uri: item.video }}
					className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					onPlaybackStatusUpdate={(status) => {
						if (status.didJustFinish) setPlay(false)
					}}
				/>
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
