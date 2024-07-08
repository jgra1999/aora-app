import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { TabIcon } from '@/components/tabs/TabIcon'
import { icons } from '../../constants'

export default function TabsLayout() {
	return (
		<>
			<Tabs screenOptions={{ tabBarShowLabel: false }}>
				<Tabs.Screen
					name='home'
					options={{
						title: 'home',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.home}
								name='Home'
								color={color}
								focused={focused}
							/>
						)
					}}
				/>
			</Tabs>
		</>
	)
}
