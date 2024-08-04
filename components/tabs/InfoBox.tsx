import { View, Text } from 'react-native'

interface Props {
	title: string | number
	subtitle: string
	containerStyles?: string
	titleStyles?: string
}

export function InfoBox({ title, subtitle, containerStyles, titleStyles }: Props) {
	return (
		<View className={containerStyles}>
			<Text className={`text-white text-center font-psemibold ${titleStyles}`}>
				{title}
			</Text>
			<Text className='text-sm text-gray-100 text-center font-pregular'>
				{subtitle}
			</Text>
		</View>
	)
}
