import { FlatList, RefreshControl, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ListHeader } from '@/components/tabs/ListHeader'
import EmptyState from '@/components/tabs/EmptyState'
import { useState } from 'react'
import { getAllPosts } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { CardVideo } from '@/components/tabs/CardVideo'

export default function Home() {
	const { data: posts, refetch } = useAppwrite(getAllPosts)
	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = async () => {
		setRefreshing(true)
		await refetch()
		setRefreshing(false)
	}

	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <CardVideo video={item} />}
				ListHeaderComponent={() => <ListHeader />}
				ListEmptyComponent={() => (
					<EmptyState
						title='No Videos Found'
						subtitle='Be the first one to upload a video'
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			></FlatList>
		</SafeAreaView>
	)
}
