import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'

import { useGlobalContext } from '@/context/global-context'
import { images } from '../constants'

import { StatusBar } from 'expo-status-bar'
import { CustomButton } from '@/components/ui/CustomButton'

export default function Index() {
	const { isLoading, isLoggedIn } = useGlobalContext()

	if (!isLoading && isLoggedIn) return <Redirect href='/home' />

	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className='w-full justify-center items-center h-full px-4'>
					<Image
						source={images.logo}
						resizeMode='contain'
						className='w-[130px] h-[84px]'
					/>

					<Image
						source={images.cards}
						resizeMode='contain'
						className='w-full max-w-[380px] h-[300px]'
					/>

					<View className='relative mt-5'>
						<Text className='text-3xl text-white font-bold text-center'>
							Discover Endless Possibilities with{' '}
							<Text className='text-secondary-200'>Aora</Text>
						</Text>

						<Image
							source={images.path}
							className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
							resizeMode='contain'
						/>
					</View>

					<Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
						where creativity meets innovation: embark on a journey of limitless
						exploration with Aora
					</Text>

					<CustomButton
						title='Continue with email'
						containerStyles='mt-7'
						event={() => router.push('/sign-in')}
					/>
				</View>
			</ScrollView>

			<StatusBar backgroundColor='#161622' style='light' />
		</SafeAreaView>
	)
}
