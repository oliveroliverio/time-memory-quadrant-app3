/** @format */

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { MusicalNotePlaylistComponent } from '@/components/MusicalNotePlaylist'

export function PlaylistModal({
	isOpen,
	onClose,
	musical_note,
}: {
	isOpen: boolean
	onClose: () => void
	musical_note: string
}) {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>
						Playlist for musical_note: {musical_note}
					</DialogTitle>
				</DialogHeader>
				<MusicalNotePlaylistComponent musical_note={musical_note} />
			</DialogContent>
		</Dialog>
	)
}
