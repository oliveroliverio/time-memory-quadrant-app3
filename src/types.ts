export interface Character {
	id: number
	number: number
	name: string
	time: string
	musical_note: string
}

export interface Event {
    id: number;
    event_entry: string;
    date_time_created: string;
  }

  export interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { name: string; images: { url: string }[] };
  }