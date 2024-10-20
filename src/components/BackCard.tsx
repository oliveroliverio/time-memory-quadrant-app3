/** @format */

import { Character } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock } from 'lucide-react'

export function BackCard({
	currentCharacter,
	onExpand,
	onOpenPlaylist,
}: {
	currentCharacter: Character
	onExpand: () => void
	onOpenPlaylist: () => void
}) {
	return (
		<Card className='absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] cursor-pointer'>
			<CardContent className='flex flex-col items-center justify-between h-full py-8'>
				<div className='flex flex-col items-center'>
					<div className='text-6xl font-bold mb-4'>
						#{currentCharacter.number}
					</div>
					<div className='text-2xl flex items-center justify-center'>
						<Clock className='w-6 h-6 mr-2' />
						{currentCharacter.time}
					</div>
				</div>
				<div className='flex flex-col w-3/4 max-w-xs space-y-4'>
					<Button
						onClick={(e) => {
							e.stopPropagation()
							onExpand()
						}}
						className='w-full'>
						Expand
					</Button>
					<Button
						onClick={(e) => {
							e.stopPropagation()
							onOpenPlaylist()
						}}
						className='w-full'>
						Musical Note Playlist
					</Button>
				</div>
				<p className='mt-4 text-sm text-gray-600'>
					Click card to see character name
				</p>
			</CardContent>
		</Card>
	)
}
