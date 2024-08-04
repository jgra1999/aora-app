import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { FormInput } from '@/components/ui/FormInput'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'
import { CustomButton } from '@/components/ui/CustomButton'

interface FormData {
	title: string
	video: string | null
	thumbnail: any | null
	prompt: string
}

export default function Create() {
	const [uploading, setUploading] = useState(false)
	const [form, setForm] = useState<FormData>({
		title: '',
		video: null,
		thumbnail: null,
		prompt: ''
	})

	const handleSubmit = () => {
		console.log('Submitting')
	}

	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView className='px-4 my-6'>
				<Text className='text-2xl text-white font-psemibold'>Upload Video</Text>

				<FormInput
					label='Video Title'
					value={form.title}
					placeholder='Give your video a catch title...'
					otherStyles='mt-10'
					event={(e) =>
						setForm({
							...form,
							title: e
						})
					}
				/>

				<View className='mt-7 space-y-2'>
					<Text className='text-gray-100 font-pmedium'>Upload Video</Text>
					<TouchableOpacity className=''>
						{form.video ? (
							<Video
								source={{ uri: form.video }}
								className='w-full h-64 rounded-2xl'
								useNativeControls
								resizeMode={ResizeMode.COVER}
								isLooping
							/>
						) : (
							<View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
								<View className='w-16 h-16 border border-dashed border-secondary-100 justify-center items-center'>
									<Image
										source={icons.upload}
										className='w-1/2 h-1/2'
										resizeMode='contain'
									/>
								</View>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<View className='mt-7 space-y-2'>
					<Text className='text-gray-100 font-pmedium'>Thumbnail Image</Text>
					<TouchableOpacity className=''>
						{form.video ? (
							<Image
								source={{ uri: form.thumbnail }}
								className='w-full h-64 rounded-2xl'
								resizeMode='cover'
							/>
						) : (
							<View className='w-full h-16 px-4 bg-black-100 rounded-2xl flex-row justify-center items-center space-x-2'>
								<Image
									source={icons.upload}
									className='w-5 h-5'
									resizeMode='contain'
								/>
								<Text className='text-sm text-gray-100 font-pmedium'>
									Choose a image
								</Text>
							</View>
						)}
					</TouchableOpacity>

					<FormInput
						label='AI Prompt'
						value={form.prompt}
						placeholder='Share the prompt you used to create this video'
						otherStyles='mt-10'
						event={(e) =>
							setForm({
								...form,
								prompt: e
							})
						}
					/>

					<CustomButton
						title='Submit & Publish'
						event={handleSubmit}
						containerStyles='mt-7'
						isLoading={uploading}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
