import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { icons } from '@/constants'

interface Props {
	label: string
	placeholder: string
	value: any
	event: (e: string) => void
	keyboardType?: string
	otherStyles?: string
}

export function FormInput({
	label,
	value,
	event,
	keyboardType,
	otherStyles,
	placeholder
}: Props) {
	const [showPass, setShowPass] = useState(false)
	return (
		<View className={`space-y-2 w-full ${otherStyles}`}>
			<Text className='text-gray-100 font-pmedium'>{label}</Text>
			<View className='flex-row items-center border-2 border-black-200 w-full h-16 px-4 rounded-2xl focus:border-secondary'>
				<TextInput
					className='flex-1 text-white font-psemibold'
					placeholder={placeholder}
					placeholderTextColor='#7b7b8b'
					value={value}
					onChangeText={event}
					secureTextEntry={label === 'Password' && !showPass}
				/>

				{label === 'Password' && (
					<TouchableOpacity onPress={() => setShowPass(!showPass)}>
						<Image
							source={!showPass ? icons.eye : icons.eyeHide}
							className='w-6 h-6'
							resizeMode='contain'
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}
