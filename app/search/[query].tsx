import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'

import { useAppwrite } from '@/lib/useAppwrite'
import { searchPosts } from '@/lib/appwrite'

import EmptyState from '@/components/tabs/EmptyState'
import { ListHeader } from '@/components/tabs/ListHeader'
import { CardVideo } from '@/components/tabs/CardVideo'

export default function Query() {
	const { query } = useLocalSearchParams()
	const { data: posts, refetch } = useAppwrite(() => searchPosts(query))

	useEffect(() => {
		refetch()
	}, [query])

	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <CardVideo video={item} />}
				ListHeaderComponent={() => (
					<ListHeader title='Search Results' subtitle={query} query={query} />
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title='No Videos Found'
						subtitle={`No video found for this search: ${query}`}
					/>
				)}
			></FlatList>
		</SafeAreaView>
	)
}
