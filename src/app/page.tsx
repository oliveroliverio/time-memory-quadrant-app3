/** @format */

import { CharacterDisplayComponent } from '@/components/character-display'
import { Navbar } from '@/components/Navbar'

export default function Home() {
	return (
		<>
			<Navbar />
			<CharacterDisplayComponent />
		</>
	)
}
