import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'

import { useAppwrite } from '@/lib/useAppwrite'
import { searchProfileVideos, signOut } from '@/lib/appwrite'

import EmptyState from '@/components/tabs/EmptyState'
import { CardVideo } from '@/components/tabs/CardVideo'
import { useGlobalContext } from '@/context/global-context'
import { icons } from '@/constants'
import { InfoBox } from '@/components/tabs/InfoBox'

export default function Profile() {
	const { user, setUser, setIsLoggedIn } = useGlobalContext()
	const { query } = useLocalSearchParams()
	const { data: posts, refetch } = useAppwrite(() => searchProfileVideos(user.$id))

	const handleLogout = async () => {
		await signOut()
		setUser(null)
		setIsLoggedIn(false)

		router.replace('/sign-in')
	}
	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <CardVideo video={item} />}
				ListHeaderComponent={() => (
					<View className='w-full mt-6 mb-12 px-4 space-y-6 justify-center items-center'>
						<TouchableOpacity
							className='w-full items-end px-4'
							onPress={handleLogout}
						>
							<Image
								source={icons.logout}
								resizeMode='contain'
								className='w-6 h-6'
							/>
						</TouchableOpacity>

						<View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
							<Image
								source={{ uri: user?.avatar }}
								className='w-[90%] h-[90%] rounded-lg'
								resizeMode='cover'
							/>
						</View>

						<InfoBox
							title={user?.username}
							subtitle='VideoMaker | Photographer | Editions'
							containerStyles='mt-5'
							titleStyles='text-lg mb-4'
						/>

						<View className='mt-5 flex-row'>
							<InfoBox
								title={posts.length || 0}
								subtitle='Posts'
								containerStyles='mr-10'
								titleStyles='text-xl'
							/>
							<InfoBox title='1.2k' subtitle='Followers' titleStyles='text-xl' />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title='No Videos Found'
						subtitle={`No video found for this search`}
					/>
				)}
			></FlatList>
		</SafeAreaView>
	)
}
