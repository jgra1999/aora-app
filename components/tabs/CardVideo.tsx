import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'

interface Props {
	video: VideoData
}

export function CardVideo({ video }: Props) {
	const [play, setPlay] = useState(false)
	return (
		<View className='flex-col items-center px-4 mb-14'>
			<View className='flex-row gap-3 items-start'>
				<View className='justify-center items-center flex-row flex-1'>
					<View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5 '>
						<Image
							source={{ uri: video.creator.avatar }}
							className='w-full h-full rounded-lg'
							resizeMode='cover'
						/>
					</View>
					<View className='justify-center ml-3 flex-1 gap-y-1'>
						<Text className='text-white font-psemibold tex-sm' numberOfLines={1}>
							{video.title}
						</Text>
						<Text className='text-white font-psemibold tex-sm' numberOfLines={1}>
							{video.creator.username}
						</Text>
					</View>
				</View>
				<View className='mt-2'>
					<Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
				</View>
			</View>
			{/* Video */}
			{play ? (
				<Video
					source={{ uri: video.video }}
					className='w-full h-60 rounded-xl mt-3'
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					onPlaybackStatusUpdate={(status) => {
						if (status.didJustFinish) setPlay(false)
					}}
				/>
			) : (
				<TouchableOpacity
					className='w-full h-60 rounded-xl mt-3 justify-center items-center relative'
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
				>
					<Image
						source={{ uri: video.thumbnail }}
						className='w-full h-full rounded-xl mt-3'
						resizeMode='cover'
					/>

					<Image
						source={icons.play}
						className='w-12 h-12 absolute'
						resizeMode='contain'
					/>
				</TouchableOpacity>
			)}
		</View>
	)
}
