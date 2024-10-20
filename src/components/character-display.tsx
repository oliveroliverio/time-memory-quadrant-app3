/** @format */

'use client'
import { FrontCard } from '@/components/FrontCard'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExpandedView } from '@/components/ExpandedView'
import { PlaylistModal } from '@/components/PlaylistModal'
import { BackCard } from '@/components/BackCard'

import { getCharacterForTime } from '@/lib/utils/getCharacterForTime'
import { Character } from '@/types'
// Dummy event data
const dummyEvents = [
	{
		id: 1,
		event_entry: 'Morning workout',
		date_time_created: '2024-10-14T06:30:00Z',
	},
	{
		id: 2,
		event_entry: 'Team meeting',
		date_time_created: '2024-10-14T09:00:00Z',
	},
	{
		id: 3,
		event_entry: 'Lunch with client',
		date_time_created: '2024-10-14T12:30:00Z',
	},
	{
		id: 4,
		event_entry: 'Project deadline',
		date_time_created: '2024-10-14T15:00:00Z',
	},
	{
		id: 5,
		event_entry: 'Gym session',
		date_time_created: '2024-10-14T18:00:00Z',
	},
	{
		id: 6,
		event_entry: 'Dinner with family',
		date_time_created: '2024-10-14T20:00:00Z',
	},
	{
		id: 7,
		event_entry: 'Read a book',
		date_time_created: '2024-10-14T22:00:00Z',
	},
	{
		id: 8,
		event_entry: 'Prepare presentation',
		date_time_created: '2024-10-15T08:00:00Z',
	},
	{
		id: 9,
		event_entry: "Doctor's appointment",
		date_time_created: '2024-10-15T11:00:00Z',
	},
	{
		id: 10,
		event_entry: 'Movie night',
		date_time_created: '2024-10-15T19:30:00Z',
	},
]

// This would typically be in a separate file or fetched from an API

export function CharacterDisplayComponent() {
	const [currentCharacter, setCurrentCharacter] = useState<Character>(
		getCharacterForTime(new Date())
	)
	const [isFlipped, setIsFlipped] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)

	useEffect(() => {
		const updateCharacter = () => {
			const newCharacter = getCharacterForTime(new Date())
			console.log('Updating character:', newCharacter)
			setCurrentCharacter(newCharacter)
		}

		updateCharacter() // Initial update
		const timer = setInterval(updateCharacter, 60000) // Update every minute

		return () => clearInterval(timer)
	}, [])

	const handleCardClick = () => {
		if (!isExpanded) {
			setIsFlipped(!isFlipped)
		}
	}

	const handleExpand = () => {
		setIsExpanded(true)
	}

	const handleCollapse = () => {
		setIsExpanded(false)
	}

	const handleOpenPlaylist = () => {
		setIsPlaylistOpen(true)
	}

	const handleClosePlaylist = () => {
		setIsPlaylistOpen(false)
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4'>
			<AnimatePresence>
				{!isExpanded ? (
					<motion.div
						key='card'
						className='w-full max-w-md aspect-[3/4] [perspective:1000px]'
						layout>
						<div
							className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
								isFlipped ? '[transform:rotateY(180deg)]' : ''
							}`}
							onClick={handleCardClick}>
							<FrontCard currentCharacter={currentCharacter} />
							<BackCard
								currentCharacter={currentCharacter}
								onExpand={handleExpand}
								onOpenPlaylist={handleOpenPlaylist}
							/>
						</div>
					</motion.div>
				) : (
					<ExpandedView
						key='expanded'
						events={dummyEvents}
						onCollapse={handleCollapse}
					/>
				)}
			</AnimatePresence>
			<PlaylistModal
				isOpen={isPlaylistOpen}
				onClose={handleClosePlaylist}
				musical_note={currentCharacter.musical_note}
			/>
		</div>
	)
}
