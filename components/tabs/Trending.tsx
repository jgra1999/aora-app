import { Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import TrendingItem from './TrendingItem'

export function Trending({ posts }: { posts: Video[] }) {
	const [activeItem, setActiveItem] = useState(posts[1])

	const viewAbleItemsChanges = ({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].item.$id)
		}
	}

	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.title}
			renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
			onViewableItemsChanged={viewAbleItemsChanges}
			viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
			contentOffset={{ x: 170 }}
			horizontal
		/>
	)
}
