import { View, Text, FlatList } from 'react-native'
import React from 'react'

export function Trending({ posts }: { posts: { id: string }[] }) {
	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <Text>{item.id}</Text>}
			horizontal
		/>
	)
}
