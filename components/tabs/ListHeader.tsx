import { images } from '@/constants'
import { View, Text, Image } from 'react-native'
import { SearchInput } from '../ui/SearchInput'
import { Trending } from './Trending'

export function ListHeader() {
	return (
		<View className='my-6 px-4 space-y-6 items-center'>
			<View className='items-start justify-between flex-row w-full'>
				<View className='justify-between items-start flex-col mb-6'>
					<Text className='font-pmedium text-sm text-gray-100'>Welcome Back</Text>
					<Text className='font-psemibold text-2xl text-white'>Jgra99</Text>
				</View>

				<View className=''>
					<Image
						source={images.logoSmall}
						className='w-9 h-10'
						resizeMode='contain'
					/>
				</View>
			</View>

			<SearchInput />

			<View className='w-full flex-1 pt-5 pb-8'>
				<Text className='text-gray-100 text-lg font-pregular mb-3'>
					Latest Videos
				</Text>
			</View>

			<Trending posts={[{ id: '1' }, { id: '2' }, { id: '3' }] ?? []} />
		</View>
	)
}
