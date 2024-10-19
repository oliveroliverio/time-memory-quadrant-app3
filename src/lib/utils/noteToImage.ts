const noteToImageMap: { [key: string]: string } = {
    "C": "1_C.png",
    "G": "2_G.png",
    "D": "3_D.png",
    "A": "4_A.png",
    "E": "5_E.png",
    "B": "6_B.png",
    "F#_Gb": "7_Fsh_Gb.png",
    "C#_Db": "8_Csh_Db.png",
    "G#_Ab": "9_Ab_Gsh.png",
    "D#_Eb": "10_Eb_Dsh.png",
    "A#_Bb": "11_Ash_Bb.png",
    "F": "12_F.png"
  };

  export function getImageForNote(note: string): string {
    const imageName = noteToImageMap[note];
    if (!imageName) {
      console.warn(`No image found for note: ${note}`);
      return "/images/default.png"; // Provide a default image if no match is found
    }
    return `/images/keysignatures/${imageName}`;
  }