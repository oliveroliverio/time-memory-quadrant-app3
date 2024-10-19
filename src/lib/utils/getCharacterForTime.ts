import characters from '@/app/data/characters_5ths.json'
import { Character } from '@/types'

export function getCharacterForTime(currentTime: Date): Character {
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
