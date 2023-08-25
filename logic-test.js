/**
 * Write a Node.js function isPrime(n) that takes an integer n as an argument and returns true if n is a prime number and false otherwise.
 *
 * @format
 */

function isPrime(n) {
  // Your logic here
  let isDone = false;
  if (n <= 1) {
    return 'Nomor yang kamu masukan harus lebih besar dari 1.';
  } else {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        isDone = false;
        return false;
      }
    }

    if (!isDone) {
      for (let i = 3; i < n; i++) {
        if (n % i === 0) {
          return false;
        }
      }
      return true;
    }
  }
}

console.log(isPrime(20.1));
console.log(isPrime(43));
//console.log(isPrime(3));
console.log(isPrime(100));
//console.log(isPrime(9));

function whosPrime(n) {
  if (n <= 1) {
    return 'Nomor yang kamu masukan harus lebih besar dari 1.';
  } else {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
}

for (let i = 2; i <= 100; i++) {
  if (whosPrime(i)) {
    //console.log(i);
  }
}
