/** @format */
import { Character } from '@/types'
import { getImageForNote } from '@/lib/utils/noteToImage'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export function FrontCard({
	currentCharacter,
}: {
	currentCharacter: Character
}) {
	const imagePath = getImageForNote(currentCharacter.musical_note)
	return (
		<Card className='absolute w-full h-full [backface-visibility:hidden] cursor-pointer'>
			<CardContent className='flex flex-col items-center justify-center h-full'>
				<h2 className='text-4xl font-bold text-center'>
					{currentCharacter.name}
				</h2>
				<p className='mt-4 text-lg text-gray-600'>
					Musical Note: {currentCharacter.musical_note}
				</p>
				<Image
					src={imagePath}
					alt={`Key signature for ${currentCharacter.musical_note}`}
					width={400}
					height={400}
					onError={(e) => {
						console.error('Image failed to load:', imagePath)
						e.currentTarget.style.display = 'none'
					}}
				/>
				<p className='mt-2 text-lg text-gray-600'>
					Click to see details
				</p>
			</CardContent>
		</Card>
	)
}
