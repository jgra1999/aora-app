import { View, Text, TouchableOpacity } from 'react-native'

interface Props {
	title: string
	containerStyles?: string
	textStyles?: string
	isLoading?: boolean
	event: () => void
}

export function CustomButton({
	title,
	containerStyles,
	event,
	isLoading,
	textStyles
}: Props) {
	return (
		<TouchableOpacity
			className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center w-full ${containerStyles} ${
				isLoading ? 'opacity-50' : ''
			}`}
			onPress={event}
			activeOpacity={0.7}
			disabled={isLoading}
		>
			<Text className={`text-primary text-lg font-psemibold ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	)
}
