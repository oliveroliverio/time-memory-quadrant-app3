/** @format */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { getImageForNote } from '@/lib/utils/noteToImage'
import Image from 'next/image'
import { getCharacterForTime } from '@/lib/utils/getCharacterForTime'
import { Character, Event, Track } from '@/types'
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
const playlistTracks: { [key: string]: string[] } = {
	C: ['spotify:track:id1', 'spotify:track:id2', 'spotify:track:id3'],
	'C#_Db': ['spotify:track:id4', 'spotify:track:id5', 'spotify:track:id6'],
	D: ['spotify:track:id7', 'spotify:track:id8', 'spotify:track:id9'],
	'D#_Eb': ['spotify:track:id10', 'spotify:track:id11', 'spotify:track:id12'],
	E: ['spotify:track:id13', 'spotify:track:id14', 'spotify:track:id15'],
	F: ['spotify:track:id16', 'spotify:track:id17', 'spotify:track:id18'],
	'F#_Gb': ['spotify:track:id19', 'spotify:track:id20', 'spotify:track:id21'],
	G: ['spotify:track:id22', 'spotify:track:id23', 'spotify:track:id24'],
	'G#_Ab': ['spotify:track:id25', 'spotify:track:id26', 'spotify:track:id27'],
	A: ['spotify:track:id28', 'spotify:track:id29', 'spotify:track:id30'],
	'A#_Bb': ['spotify:track:id31', 'spotify:track:id32', 'spotify:track:id33'],
	B: ['spotify:track:id34', 'spotify:track:id35', 'spotify:track:id36'],
}

function FrontCard({ currentCharacter }: { currentCharacter: Character }) {
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
					width={100}
					height={100}
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

function BackCard({
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

function MusicalNotePlaylistComponent({
	musical_note,
}: {
	musical_note: string
}) {
	const [tracks, setTracks] = useState<Track[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchTracks = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const trackIds = playlistTracks[musical_note] || []
				const trackPromises = trackIds.map((id) =>
					fetch(
						`https://api.spotify.com/v1/tracks/${id.split(':')[2]}`,
						{
							headers: {
								Authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE',
							},
						}
					).then((res) => {
						if (!res.ok) {
							throw new Error(`HTTP error! status: ${res.status}`)
						}
						return res.json()
					})
				)
				const trackData = await Promise.all(trackPromises)
				setTracks(trackData.filter((track) => track && track.album)) // Filter out any invalid tracks
			} catch (err) {
				console.error('Error fetching tracks:', err)
				setError('Failed to load tracks. Please try again later.')
			} finally {
				setIsLoading(false)
			}
		}

		fetchTracks()
	}, [musical_note])

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error}</div>
	if (tracks.length === 0)
		return <div>No tracks found for this musical_note.</div>

	return (
		<div className='space-y-4'>
			{tracks.map((track) => (
				<div
					key={track.id}
					className='flex items-center space-x-4'>
					{track.album &&
						track.album.images &&
						track.album.images[0] && (
							<img
								src={track.album.images[0].url}
								alt={track.album.name}
								className='w-16 h-16'
							/>
						)}
					<div>
						<h3 className='font-semibold'>{track.name}</h3>
						<p className='text-sm text-gray-600'>
							{track.artists.map((a) => a.name).join(', ')}
						</p>
					</div>
				</div>
			))}
		</div>
	)
}

function PlaylistModal({
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
