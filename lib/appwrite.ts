import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
	Storage
} from 'react-native-appwrite'

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
const storage = new Storage(client)

/* ---- Users ---- */
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

export const signOut = async () => {
	try {
		const session = await account.deleteSession('current')

		return session
	} catch (error) {
		console.log(error)
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

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get()
		if (!currentAccount) throw Error

		const currentUser = await database.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		)

		if (!currentUser) throw Error

		return currentUser.documents[0]
	} catch (error) {
		console.log(error)
	}
}

/* ---- Posts ---- */

export const getLatestPosts = async () => {
	try {
		const posts = await database.listDocuments(
			config.databaseId,
			config.videoCollectionId,
			[Query.orderDesc('$createdAt'), Query.limit(7)]
		)

		return posts.documents
	} catch (error) {
		console.log(error)
	}
}

export const getAllPosts = async () => {
	try {
		const posts = await database.listDocuments(
			config.databaseId,
			config.videoCollectionId,
			[Query.orderDesc('$createdAt')]
		)

		return posts.documents
	} catch (error) {
		console.log(error)
	}
}

/* ---- Search ---- */
export const searchPosts = async (query: string | string[] | undefined) => {
	try {
		const posts = await database.listDocuments(
			config.databaseId,
			config.videoCollectionId,
			[Query.search('title', query)]
		)

		return posts.documents
	} catch (error) {
		console.log(error)
	}
}

export const searchProfileVideos = async (userId: string) => {
	try {
		const posts = await database.listDocuments(
			config.databaseId,
			config.videoCollectionId,
			[Query.equal('creator', userId)]
		)

		return posts.documents
	} catch (error) {
		console.log(error)
	}
}

/* ---- Videos ---- */

const getPreview = async (fileId: string, type: string) => {
	let fileUrl

	try {
		if (type === 'video') {
			fileUrl = storage.getFileView(config.storageId, fileId)
		} else if (type === 'image') {
			fileUrl = storage.getFilePreview(
				config.storageId,
				fileId,
				2000,
				2000,
				undefined,
				100
			)
		} else {
			throw new Error('Invalid file type')
		}

		if (!fileUrl) throw Error

		return fileUrl
	} catch (error) {
		throw new Error(error)
	}
}

const uploadFile = async (file: any, type: string) => {
	if (!file) return

	const asset = {
		name: file.fileName,
		type: file.mimeType,
		size: file.fileSize,
		uri: file.uri
	}

	try {
		const uploadedFile = await storage.createFile(
			config.storageId,
			ID.unique(),
			asset
		)

		console.log(uploadedFile)

		const fileUrl = await getPreview(uploadedFile.$id, type)
		return fileUrl
	} catch (error) {
		throw new Error(error)
	}
}

export const createVideo = async (form: any) => {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(form.thumbnail, 'image'),
			uploadFile(form.video, 'video')
		])

		const newPost = await database.createDocument(
			config.databaseId,
			config.videoCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl,
				video: videoUrl,
				prompt: form.prompt,
				creator: form.userId
			}
		)

		// return newPost
	} catch (error) {
		throw new Error(error)
	}
}
