import { Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import TrendingItem from './TrendingItem'

export function Trending({ posts }: { posts: VideoData[] }) {
	const [activeItem, setActiveItem] = useState(posts[0])

	const viewAbleItemsChanges = ({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].item)
		}
	}

	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.thumbnail}
			renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
			onViewableItemsChanged={viewAbleItemsChanges}
			viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
			// contentOffset={{ x: 170, y: 0 }}
			horizontal
		/>
	)
}
