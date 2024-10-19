const noteToImageMap: { [key: string]: string } = {
    "C": "1_C.png",
    "G": "2_G.png",
    "D": "3_D.png",
    "A": "4_A.png",
    "E": "5_E.png",
    "B": "6_B.png",
    "F#/Gb": "7_F#_Gb.png",
    "C#/Db": "8_C#_Db.png",
    "G#/Ab": "9_G#_Ab.png",
    "D#/Eb": "10_D#_Eb.png",
    "A#/Bb": "11_A#_Bb.png",
    "F": "12_F.png"
  };

  export function getImageForNote(note: string): string {
    const imageName = noteToImageMap[note];
    if (!imageName) {
      console.warn(`No image found for note: ${note}`);
      return "default.png"; // Provide a default image if no match is found
    }
    return `/app/data/img_keysig/${imageName}`;
  }