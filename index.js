/** @format */

let favoriteBook1 = 'Koala Kumal';
const favoriteBook2 = 'Cinta Brontosaurus';
console.log('Buku 1: ' + favoriteBook1);
console.log('Buku 2: ' + favoriteBook2);
favoriteBook1 = 'Harry Potter';
console.log('Change Value Buku 1: ' + favoriteBook1);
try {
  favoriteBook2 = 'New Value For Variable Const Book: ' + favoriteBook2;
  console.log(favoriteBook2);
} catch (err) {}

let concatValueFromVariable = 'Concat Value From 2 Variable Buku 1: ' + favoriteBook1 + ' Buku 2: ' + favoriteBook2;
console.log(concatValueFromVariable);

let isMale = true;
let numRow = 1;
let array = [1, 2, 3, 4, 5];
array[0];
const object = {
  name: 'Dian Adi Nugroho',
  age: 23,
  gender: true,
  point: 3.45,
};
object.name;

console.log(typeof isMale);
console.log(typeof numRow);
console.log(typeof array);
console.log(typeof object);

console.log(object.name);
object.name = 'Adi';
console.log(object.name);
