/** @format */

let favoriteBook1 = 'Koala Kumal';
const favoriteBook2 = 'Cinta Brontosaurus';
if (favoriteBook1 == favoriteBook2) {
  console.log(true);
} else {
  console.log(false);
}
favoriteBook1 = 'Cinta Brontosaurus';
let isBookSameName = favoriteBook1 == favoriteBook2 ? true : false;
console.log(isBookSameName);
/*END TASK 1*/

let priceFavoriteBook1 = 50000;
let priceFavoriteBook2 = 45000;
if (priceFavoriteBook1 === priceFavoriteBook2) {
  console.log('Harganya sama.');
} else if (priceFavoriteBook1 > priceFavoriteBook2) {
  console.log(`Book1: ${priceFavoriteBook1}`);
} else {
  console.log(`Book2: ${priceFavoriteBook2}`);
}

if (priceFavoriteBook1 === priceFavoriteBook2) {
  console.log('Harganya sama.');
} else {
  console.log(Math.max(priceFavoriteBook1, priceFavoriteBook2));
}

function ternaryFunction(a, b) {
  return a === b ? 'Harganya sama.' : Math.max(priceFavoriteBook1, priceFavoriteBook2);
}

priceFavoriteBook2 = 50000;
console.log(ternaryFunction(priceFavoriteBook1, priceFavoriteBook2));
priceFavoriteBook2 = 100000;
console.log(ternaryFunction(priceFavoriteBook1, priceFavoriteBook2));
/*END TASK 2A*/

let avrgValue = (priceFavoriteBook1 + priceFavoriteBook2) / 2;
console.log(avrgValue);
/*END TASK 2B*/

avrgValue = 500000;
let isAvrgPrice = avrgValue > 500000 ? 'Expensive' : 'Cheap';
console.log(isAvrgPrice);
/*END TASK 2C*/

let tesArray = [21];
console.log(tesArray);
tesArray.push(45);
console.log(tesArray);
/*END TES ARRAY PUSH*/

let tesObject = {
  name: 'Adi',
  age: 23,
};
console.log(tesObject);
tesObject.city = 'DIY';
console.log(tesObject);
tesObject['country'] = 'IDN';
console.log(tesObject);
/*END TES OBJECT PUSH*/

let tesArrayObject = [
  {
    name: 'Adi',
    age: 23,
  },
];
console.log(tesArrayObject);
tesArrayObject.push({
  name: 'Dian',
  age: 21,
});
console.log(tesArrayObject);
