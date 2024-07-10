import { Username } from '@/types/database'
import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite'

export const config = {
	enpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.joserojas.aora',
	projectId: '668d6b5a00115fd1e964',
	databaseId: '668d7402002a5b6b6a49',
	userCollectionId: '668d74a2000d7b777a41',
	videoCollectionId: '668d74b80020361212ca',
	storageId: '668d8440002816266dc5'
}

// Init your React Native SDK
const client = new Client()

client
	.setEndpoint(config.enpoint) // Your Appwrite Endpoint
	.setProject(config.projectId) // Your project ID
	.setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client)
const avatar = new Avatars(client)
const database = new Databases(client)

export const signIn = async (email: string, password: string) => {
	try {
		// Create a session with the user email and password
		const session = await account.createEmailPasswordSession(email, password)

		return session
	} catch (error) {
		console.log(error)
		// throw new Error(error)
	}
}

export const createUser = async (
	email: string,
	password: string,
	username: string
) => {
	try {
		// Register User
		const newAccount = await account.create(ID.unique(), email, password, username)

		if (!newAccount) throw Error

		// Create an avatar with the username initials for the users
		const avatarUrl = avatar.getInitials(username)

		// Sign in with email and password
		await signIn(email, password)

		// Create an user in the database
		const newUser = await database.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl
			}
		)

		return newUser
	} catch (error) {
		console.log(error)
		// throw new Error(error)
	}
}
