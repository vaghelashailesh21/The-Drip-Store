import namer from "color-namer";


 const toProperName = (str) => {
  // Common prefixes and words found in CSS color names
  const words = [
    'dark', 'light', 'medium', 'pale', 'deep', 'dim', 'slate', 'royal', 
    'midnight', 'forest', 'sea', 'sky', 'olive', 'green', 'gray', 'grey', 
    'yellow', 'blue', 'red', 'white', 'golden', 'violet', 'orange'
  ];

  let result = str.toLowerCase();

  // 1. Insert spaces around known color words
  words.forEach(word => {
    // This adds a space before and after the word if it's found inside the string
    result = result.replace(new RegExp(word, 'g'), ` ${word} `);
  });

  // 2. Clean up extra spaces and capitalize each word (Title Case)
  return result
    .trim()
    .split(/\s+/) // Split by any whitespace
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize
    .join(' '); // Join back with single spaces
};



export const ColorName = (name) => {
  const result = namer(name);
  const rawName = result.html[0].name; // e.g., "darkolivegreen"

  return toProperName(rawName);
};