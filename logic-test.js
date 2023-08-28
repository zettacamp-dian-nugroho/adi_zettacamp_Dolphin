/**
 * Title: Unique Characters
 *
 * Description:
 * Write a function named hasUniqueCharacters that takes a string as input and returns true if the string contains all unique characters, and false otherwise. You can assume that the string contains only lowercase alphabets (a-z).
 *
 * Example:
 * console.log(hasUniqueCharacters("abcdefg")); // Output: true
 * console.log(hasUniqueCharacters("hello")); // Output: false
 *
 * @format
 */

function hasUniqueCharacters(str) {
  // Your logic here
  let isUnique;
  for (let z = 0; z <= str.length; z++) {
    for (let i = z + 1; i < str.length; i++) {
      if (str[i] == str[z]) {
        return false;
      } else {
        isUnique = true;
      }
    }
  }
  return isUnique;
}

console.log(hasUniqueCharacters('abcdefg')); // Output: true
console.log(hasUniqueCharacters('hello')); // Output: false
console.log(hasUniqueCharacters('well')); // Output: false
console.log(hasUniqueCharacters('qwerty')); // Output: true
