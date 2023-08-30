/**
 * write a function that returns true if there's duplicate in the array, and false otherwise.
 * SEE EXAMPLE BELLOW!
 *
 *
 * Example
 * console.log(containsDuplicate([1, 2, 3, 1])); // Output: true
 * console.log(containsDuplicate([1, 2, 3, 4])); // Output: false
 * console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // Output: true
 *
 * Determines if the array contains any duplicate value.
 *
 * @format
 * @param {number[]} nums - The input array of integers.
 * @return {boolean} Returns true if the array contains any duplicate value, false otherwise.
 */

function containDuplicate(nums) {
  // Your logic here
  let isUnique;
  for (let z = 0; z <= nums.length; z++) {
    for (let i = z + 1; i < nums.length; i++) {
      if (nums[i] == nums[z]) {
        return true;
      } else {
        isUnique = false;
      }
    }
  }
  return isUnique;
}

console.log(containDuplicate([1, 2, 3, 1])); // Output: true
console.log(containDuplicate([1, 2, 3, 4])); // Output: false
console.log(containDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // Output: true
console.log(containDuplicate([1,23,4,5,2,5,2])); 
console.log(containDuplicate([2,3,41,51,325,234,125])); 