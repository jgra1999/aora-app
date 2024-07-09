import { View, Text, ScrollView, Image } from 'react-native'
import { images } from '../../constants'
import { useState } from 'react'
import FormInput from '@/components/ui/FormInput'
import { CustomButton } from '@/components/ui/CustomButton'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignIn() {
	const [form, setForm] = useState({
		username: '',
		email: '',
		password: ''
	})

	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = () => {}

	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className='w-full h-full justify-center items-center px-4 my-6'>
					<Image
						source={images.logo}
						resizeMode='contain'
						className='w-[115px] h-9'
					/>

					<Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
						Create your account in Aora
					</Text>

					<FormInput
						label='Username'
						placeholder='Type an username'
						value={form.email}
						event={(e: string) =>
							setForm({
								...form,
								email: e
							})
						}
						otherStyles='mt-7'
					/>

					<FormInput
						label='Email'
						placeholder='Type an email'
						value={form.email}
						event={(e: string) =>
							setForm({
								...form,
								email: e
							})
						}
						otherStyles='mt-7'
						keyboardType='email-address'
					/>

					<FormInput
						label='Password'
						placeholder='Type a password'
						value={form.password}
						event={(e: string) =>
							setForm({
								...form,
								password: e
							})
						}
						otherStyles='mt-7'
					/>

					<CustomButton
						title='Sign Up'
						event={handleSubmit}
						containerStyles='mt-7'
						isLoading={isLoading}
					/>

					<View className='justify-center pt-5 flex-row gap-2 text-lg font-pregular'>
						<Text className='text-gray-100'>Have an account already?</Text>
						<Link href='/sign-in' className='text-secondary-100'>
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
