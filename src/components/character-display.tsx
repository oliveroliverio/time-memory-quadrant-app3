/** @format */

'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Character } from '@/types'
import { getImageForNote } from '@/lib/utils/noteToImage'
import charactersData from '@/app/data/characters_5ths.json'

export function CharacterDisplayComponent() {
	const [characters, setCharacters] = useState<Character[]>([])
	const [currentQuadrant, setCurrentQuadrant] = useState(0)

	useEffect(() => {
		const now = new Date()
		const currentHour24 = now.getHours()
		const currentHour12 = currentHour24 % 12 || 12 // Convert to 12-hour format
		const currentMinute = now.getMinutes()
		const isPM = currentHour24 >= 12

		// Calculate the index in the 96-character array (4 characters per hour * 24 hours)
		const startIndex = ((currentHour12 - 1) * 4 + (isPM ? 48 : 0)) % 96
		const quadrant = Math.floor(currentMinute / 15)

		console.log('Current time:', now.toLocaleTimeString())
		console.log('Current hour (24h):', currentHour24)
		console.log('Current hour (12h):', currentHour12)
		console.log('Is PM:', isPM)
		console.log('Current minute:', currentMinute)
		console.log('Calculated quadrant:', quadrant)
		console.log('Start index:', startIndex)

		setCurrentQuadrant(quadrant)

		const selectedCharacters = charactersData.slice(
			startIndex,
			startIndex + 4
		)
		console.log('Selected characters:', selectedCharacters)
		setCharacters(selectedCharacters)

		// Log the time ranges for each quadrant
		const quadrantRanges = selectedCharacters.map((char, index) => {
			const startMinute = index * 15
			const endMinute = (index + 1) * 15 - 1
			return `Quadrant ${index}: ${char.time} (${startMinute}-${endMinute} minutes)`
		})
		console.log('Quadrant time ranges:', quadrantRanges)
	}, [])

	if (characters.length === 0) {
		return <div>Loading...</div>
	}

	return (
		<div className='min-h-screen pt-16 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4'>
			<div className='flex space-x-4 items-center'>
				{characters.map((character, index) => (
					<Card
						key={character.number}
						className={`cursor-pointer transition-all duration-300 ${
							index === currentQuadrant
								? 'w-80 h-96 shadow-lg z-10'
								: 'w-64 h-80 opacity-75 hover:opacity-100'
						}`}>
						<CardContent className='flex flex-col items-center justify-center h-full p-4'>
							<h2
								className={`font-bold mb-2 ${
									index === currentQuadrant
										? 'text-2xl'
										: 'text-xl'
								}`}>
								{character.name}
							</h2>
							<p className='text-gray-600 mb-4'>
								{character.time}
							</p>
							<Image
								src={getImageForNote(character.musical_note)}
								alt={`Key signature for ${character.musical_note}`}
								width={index === currentQuadrant ? 150 : 100}
								height={index === currentQuadrant ? 150 : 100}
							/>
							<p
								className={`mt-4 ${
									index === currentQuadrant
										? 'text-lg'
										: 'text-base'
								}`}>
								{character.musical_note}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
