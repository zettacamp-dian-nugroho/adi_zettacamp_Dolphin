/**
 * write a function that returns the majority element.
 * The majority element is the element that appears more than other element.
 * READ EXAMPLE BELOW!
 *
 * console.log(majorityElement([3, 2, 3])); // Output: 3
 * console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2
 *
 * You may assume that the majority element always exists in the array.
 *
 * Returns the majority element from the input array of integers.
 *
 * @format
 * @param {number[]} nums - The input array of integers.
 * @return {number} Returns the majority element.
 */

function majorityElement(nums) {
  // Your logic here
  const valueCount = {}; // Object to store value counts

  for (const list of nums) {
    valueCount[list] = (valueCount[list] || 0) + 1;
    // console.log(`${list} : ${valueCount[list]}`)
  }

  let mostFrequentValue = null;
  let highestCount = 0;

  for (const list in valueCount) {
    if (valueCount[list] > highestCount) {
      mostFrequentValue = list;
      highestCount = valueCount[list];
    }
  }

  return mostFrequentValue;
}
console.log(majorityElement([3, 2, 3])); // Output: 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2
console.log(majorityElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(majorityElement([2, 3, 4, 4, 5, 5, 5]));
console.log(majorityElement([1, 1, 1, 2, 2, 1, 3, 4]));
