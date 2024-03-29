#!/bin/bash

# Directory containing images
IMAGE_DIR="./assets/images/"

# Loop through all image files in the directory
for FILE in "$IMAGE_DIR"*
do
  # Check if the file is an image (adjust regex as needed)
  if [[ $FILE =~ \.(jpg|jpeg|png)$ ]]; then
    # Strip the file extension
    BASENAME=$(basename "$FILE" | sed -e 's/\.[^.]*$//')
    # Convert to WebP and save in the same directory
    cwebp -q 80 "$FILE" -o "$IMAGE_DIR$BASENAME.webp"
  fi
done

echo "Conversion to WebP completed."