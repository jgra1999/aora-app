import { useState } from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { createUser } from '@/lib/appwrite'
import { images } from '../../constants'

import { FormInput } from '@/components/ui/FormInput'
import { CustomButton } from '@/components/ui/CustomButton'
import { useGlobalContext } from '@/context/global-context'

export default function SignIn() {
	const [form, setForm] = useState({
		username: '',
		email: '',
		password: ''
	})

	const { setUser, setIsLoggedIn } = useGlobalContext()

	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async () => {
		if (!form.email || !form.password || !form.username) {
			Alert.alert('Error', 'Please fill all the fields')
			return
		}

		setIsSubmitting(true)

		try {
			const result = await createUser(form.email, form.password, form.username)

			setUser(result)
			setIsLoggedIn(true)

			router.replace('/home')
		} catch (e) {
			if (typeof e === 'string') {
				Alert.alert('Error', e.toUpperCase()) // works, `e` narrowed to string
			} else if (e instanceof Error) {
				Alert.alert('Error', e.message)
			}
		} finally {
			setIsSubmitting(false)
		}
	}

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
						value={form.username}
						event={(e: string) =>
							setForm({
								...form,
								username: e
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
						isLoading={isSubmitting}
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
