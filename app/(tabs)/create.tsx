import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ResizeMode, Video } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'

import { icons } from '@/constants'

import { FormInput } from '@/components/ui/FormInput'
import { CustomButton } from '@/components/ui/CustomButton'
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/global-context'

interface FormData {
	title: string
	video: any | null
	thumbnail: any | null
	prompt: string
}

export default function Create() {
	const { user } = useGlobalContext()
	const [uploading, setUploading] = useState(false)
	const [form, setForm] = useState<FormData>({
		title: '',
		video: null,
		thumbnail: null,
		prompt: ''
	})

	const handlePicker = async (fileType: string) => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes:
				fileType === 'image'
					? ImagePicker.MediaTypeOptions.Images
					: ImagePicker.MediaTypeOptions.Videos,
			aspect: [4, 3],
			quality: 1
		})

		if (!result.canceled) {
			if (fileType === 'image') setForm({ ...form, thumbnail: result.assets[0] })
			if (fileType === 'video') setForm({ ...form, video: result.assets[0] })
		} else {
			setTimeout(() => {
				Alert.alert('You did not select any file')
			}, 1000)
		}
	}

	const handleSubmit = async () => {
		if (!form.title || !form.video || !form.thumbnail || !form.prompt)
			return Alert.alert('Please fill all fields')
		setUploading(true)

		try {
			await createVideo({
				...form,
				userId: user.$id
			})

			Alert.alert('Success', 'Video uploaded successfully')
			router.push('/home')
		} catch (error) {
			Alert.alert('Something went wrong', error.message)
		} finally {
			setUploading(false)
			setForm({
				title: '',
				video: null,
				thumbnail: null,
				prompt: ''
			})
		}
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
					<TouchableOpacity onPress={() => handlePicker('video')}>
						{form.video ? (
							<Video
								source={{ uri: form.video.uri }}
								className='w-full h-64 rounded-2xl'
								resizeMode={ResizeMode.COVER}
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
					<TouchableOpacity onPress={() => handlePicker('image')}>
						{form.thumbnail ? (
							<Image
								source={{ uri: form.thumbnail.uri }}
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
