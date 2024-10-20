/** @format */

import { useState, useEffect } from 'react'
import { Track } from '@/types'
import Image from 'next/image'

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

export function MusicalNotePlaylistComponent({
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
							<Image
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
