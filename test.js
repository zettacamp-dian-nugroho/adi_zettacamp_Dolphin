/** @format */

const currentDate = new Date().getDate();
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const duration = 5;
const tempNextMonths = new Array(duration).fill(0   );
const nextMonths = tempNextMonths.map((list, index) => {
  currentMonth = (currentMonth + 1) % 12;
  if (currentMonth === 0) {
    currentYear++;
  }

  const dueDate = new Date(currentYear, currentMonth, currentDate);
  const formattedDueDate = dueDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
  return formattedDueDate;
});

console.log(`${currentDate}/${currentYear}/${currentMonth}`);
console.log(nextMonths);
