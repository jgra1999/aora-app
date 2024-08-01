import { images } from '@/constants'
import { View, Text, Image } from 'react-native'
import { SearchInput } from '../ui/SearchInput'
import { Trending } from './Trending'
import { useAppwrite } from '@/lib/useAppwrite'
import { getLatestPosts } from '@/lib/appwrite'

interface Props {
	showTrending?: boolean
	title: string
	subtitle: string | string[] | undefined
	query: string | string[] | undefined
}

export function ListHeader({ showTrending, title, query, subtitle }: Props) {
	const { data: latestPosts } = useAppwrite(getLatestPosts)

	return (
		<View className='my-6 px-4 space-y-6 items-center'>
			<View className='items-start justify-between flex-row w-full'>
				<View className='justify-between items-start flex-col mb-6'>
					<Text className='font-pmedium text-sm text-gray-100'>{title}</Text>
					<Text className='font-psemibold text-2xl text-white'>{subtitle}</Text>
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

			{showTrending && (
				<>
					<View className='w-full flex-1 pt-5'>
						<Text className='text-gray-100 text-lg font-pregular mb-3'>
							Latest Videos
						</Text>
					</View>
					<Trending posts={latestPosts ?? []} />
				</>
			)}
		</View>
	)
}
