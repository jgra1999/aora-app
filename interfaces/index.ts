interface VideoCreator {
	username: string
	avatar: string
}

interface Video {
	$id?: string
	title: string
	thumbnail: string
	video: string
	creator: VideoCreator
}
