import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListHeader from '@/components/tabs/ListHeader'

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item'
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item'
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item'
	}
]

export default function Home() {
	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={DATA}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <Text>{item.title}</Text>}
				ListHeaderComponent={() => <ListHeader />}
			></FlatList>
		</SafeAreaView>
	)
}
