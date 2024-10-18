/** @format */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import characters from '@/app/data/characters.json'
import events from '@/app/data/event_data.json'

interface Character {
	id: number
	name: string
	time: string
}

interface Event {
	id: number
	event_entry: string
	date_time_created: string
}

function getCharacterForTime(currentTime: Date): Character {
	const hours = currentTime.getHours()
	const minutes = currentTime.getMinutes()
	const currentMinutes = hours * 60 + minutes

	let selectedCharacter = characters[0]

	for (let i = 0; i < characters.length; i++) {
		const [charHours, charMinutes, charPeriod] =
			characters[i].time.split(/:|\s/)
		let charTotalMinutes = parseInt(charHours) * 60 + parseInt(charMinutes)
		if (charPeriod === 'PM' && parseInt(charHours) !== 12)
			charTotalMinutes += 12 * 60

		if (charTotalMinutes <= currentMinutes) {
			selectedCharacter = characters[i]
		} else {
			break
		}
	}

	return selectedCharacter
}

function FrontCard({ currentCharacter }: { currentCharacter: Character }) {
	return (
		<Card className='absolute w-full h-full [backface-visibility:hidden] cursor-pointer'>
			<CardContent className='flex flex-col items-center justify-center h-full'>
				<h2 className='text-4xl font-bold text-center'>
					{currentCharacter.name}
				</h2>
				<p className='mt-4 text-lg text-gray-600'>
					Click to see details
				</p>
			</CardContent>
		</Card>
	)
}

function BackCard({
	currentCharacter,
	onExpand,
}: {
	currentCharacter: Character
	onExpand: () => void
}) {
	return (
		<Card className='absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] cursor-pointer'>
			<CardContent className='flex flex-col items-center justify-between h-full py-8'>
				<div className='flex flex-col items-center'>
					<div className='text-6xl font-bold mb-4'>
						#{currentCharacter.id}
					</div>
					<div className='text-2xl flex items-center justify-center'>
						<Clock className='w-6 h-6 mr-2' />
						{currentCharacter.time}
					</div>
				</div>
				<Button
					onClick={(e) => {
						e.stopPropagation()
						onExpand()
					}}
					className='mt-4 w-3/4 max-w-xs'>
					Expand
				</Button>
				<p className='mt-4 text-sm text-gray-600'>
					Click card to see character name
				</p>
			</CardContent>
		</Card>
	)
}

function ExpandedView({
	events,
	onCollapse,
}: {
	events: Event[]
	onCollapse: () => void
}) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className='w-full max-w-5xl'>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
				{events.map((event) => (
					<Card
						key={event.id}
						className='cursor-pointer hover:shadow-lg transition-shadow'>
						<CardContent className='p-4'>
							<h3 className='text-lg font-semibold mb-2'>
								{event.event_entry}
							</h3>
							<p className='text-sm text-gray-600'>
								{new Date(
									event.date_time_created
								).toLocaleString()}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
			<Button
				onClick={onCollapse}
				className='mt-6 mx-auto block'>
				Collapse
			</Button>
		</motion.div>
	)
}

export function CharacterDisplayComponent() {
	const [currentCharacter, setCurrentCharacter] = useState<Character>(
		getCharacterForTime(new Date())
	)
	const [isFlipped, setIsFlipped] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)

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

	// Test with specific time
	useEffect(() => {
		const testTime = new Date()
		testTime.setHours(17, 9, 0) // 5:09 PM
		console.log('Test result:', getCharacterForTime(testTime))
	}, [])

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
							/>
						</div>
					</motion.div>
				) : (
					<ExpandedView
						key='expanded'
						events={events}
						onCollapse={handleCollapse}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
