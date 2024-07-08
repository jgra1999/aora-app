import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { TabIcon } from '@/components/tabs/TabIcon'
import { icons } from '../../constants'

export default function TabsLayout() {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: '#FFA001',
					tabBarInactiveTintColor: '#CDCDE0',
					tabBarStyle: {
						backgroundColor: '#161622',
						borderTopWidth: 1,
						borderTopColor: '#232533',
						height: 84
					}
				}}
			>
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
				<Tabs.Screen
					name='bookmark'
					options={{
						title: 'bookmark',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.bookmark}
								name='Bookmark'
								color={color}
								focused={focused}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name='create'
					options={{
						title: 'create',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.plus}
								name='Create'
								color={color}
								focused={focused}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name='profile'
					options={{
						title: 'profile',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.profile}
								name='Profile'
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
