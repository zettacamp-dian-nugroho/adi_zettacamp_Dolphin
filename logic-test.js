/**
 *
 * Write a function max_of_two(a, b) that takes in two integers, a and b, and returns the maximum of the two numbers without using any arrays or built-in functions like max().
 *
 */
function max_of_two(a, b) {
    // Your logic here
    /*if (a === b) {
      return `Nilainya sama.`;
    } else if (a > b) {
      return `Lebih Besar: ${a}`;
    } else {
      return `Lebih Besar: ${b}`;
    }*/
    return a === b ? `Nilainya sama.` : a > b ? `Lebih Besar: ${a}` : `Lebih Besar: ${b}`;
  }
  
  console.log(max_of_two(10, 5));
  console.log(max_of_two(45, 66));
  console.log(max_of_two(66, 66));
  /*END LOGIC TEST*/