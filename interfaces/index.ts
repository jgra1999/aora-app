interface VideoCreator {
	username: string
	avatar: string
}

interface VideoData {
	$id?: string
	title: string
	thumbnail: string
	video: string
	creator: VideoCreator
}
