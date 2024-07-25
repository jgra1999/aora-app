import { images } from '@/constants'
import { View, Text, Image } from 'react-native'
import { CustomButton } from '../ui/CustomButton'
import { router } from 'expo-router'

interface Props {
	title: string
	subtitle: string
}

export default function EmptyState({ title, subtitle }: Props) {
	return (
		<View className='justify-center items-center px-4 text-center'>
			<Image
				source={images.empty}
				className='w-[270px] h-[215px]'
				resizeMode='contain'
			/>
			<Text className='font-psemibold text-xl text-white mt-2'>{title}</Text>
			<Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>

			<CustomButton
				title='Create Video'
				event={() => router.push('/create')}
				containerStyles='mt-5'
			/>
		</View>
	)
}
