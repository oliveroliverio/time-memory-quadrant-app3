#!/bin/bash

# Check if an input file is provided
if [ $# -eq 0 ]; then
    echo "Please provide an input JSON file."
    echo "Usage: $0 <input_file.json>"
    exit 1
fi

# Input file from command line argument
input_file="$1"

# Generate output filename
output_file="${input_file%.*}_5ths.json"

# Define the new order of musical notes
notes=("C" "G" "D" "A" "E" "B" "F#_Gb" "C#_Db" "G#_Ab" "D#_Eb" "A#_Bb" "F")

# Counter for cycling through notes
counter=0

# Read the input file line by line
while IFS= read -r line
do
  # Check if the line contains "musical_note"
  if [[ $line == *"musical_note"* ]]; then
    # Replace the musical note with the next one in the circle of fifths
    new_note="${notes[$counter]}"
    new_line=$(echo "$line" | sed "s/\"musical_note\": \"[^\"]*\"/\"musical_note\": \"$new_note\"/")
    echo "$new_line" >> "$output_file"
    
    # Increment counter and reset to 0 if it reaches 12
    counter=$((counter + 1))
    if [ $counter -eq 12 ]; then
      counter=0
    fi
  else
    # If the line doesn't contain "musical_note", write it as is
    echo "$line" >> "$output_file"
  fi
done < "$input_file"

echo "JSON file has been modified and saved as $output_file"