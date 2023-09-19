/** @format */

const list_terms_mount = new Set();
for (const listDateKey of tempListDateOfCredit) {
  list_terms_mount.add(listDateKey[Object.keys(listDateKey)]);
}

const list_terms = new Map();
for (const listDateKey of tempListDateOfCredit) {
  const keyListDate = Object.keys(listDateKey);
  const isiList_terms = {
    term_amount: listDateKey[Object.keys(listDateKey)],
    date: keyListDate[0],
  };
  list_terms.set(keyListDate[0], isiList_terms);
}

const date_to_pay = new Map();
const tempdate_to_pay_object = {
  term_amount: tempListDateOfCredit[dataTransaksi.datetopay - 1][Object.keys(tempListDateOfCredit[dataTransaksi.datetopay - 1])[0]],
  date: Object.keys(tempListDateOfCredit[dataTransaksi.datetopay - 1])[0],
};

date_to_pay.set('date_to_pay', tempdate_to_pay_object);

const list_terms_mount_array = [...list_terms_mount];

let ConcatJoinObject = {
  name: dataTransaksi.namePembeli,
  totalTransaction: totalTransactionDisplay,
  list_terms_mount: list_terms_mount_array,
};

let templist_termsObject = new Object();
for (const listDateKey of tempListDateOfCredit) {
  const keyListDate = Object.keys(listDateKey);
  templist_termsObject[keyListDate[0]] = list_terms.get(keyListDate[0]);
}

ConcatJoinObject.list_terms = templist_termsObject;
ConcatJoinObject.date_to_pay = date_to_pay.get('date_to_pay');

const ShowOneTransaction = new Map();
ShowOneTransaction.set('list_terms', list_terms);
ShowOneTransaction.set('date_to_pay', date_to_pay);
ShowOneTransaction.set('list_terms_mount_array', list_terms_mount_array);
ShowOneTransaction.set('parent_map', ConcatJoinObject);
return ShowOneTransaction.get(dataTransaksi.getMap);

// Different
let templist_terms_mount = new Set();
for (const listDateKey of tempListDateOfCredit) {
  templist_terms_mount.add(listDateKey[Object.keys(listDateKey)]);
}

let templist_terms = new Object();
for (const listDateKey of tempListDateOfCredit) {
  const keyListDate = Object.keys(listDateKey);

  templist_terms[keyListDate] = {
    term_amount: listDateKey[Object.keys(listDateKey)],
    date: keyListDate[0],
  };
}

let tempdate_to_pay = new Object();
tempdate_to_pay = {
  term_amount: tempListDateOfCredit[dataTransaksi.datetopay - 1][Object.keys(tempListDateOfCredit[dataTransaksi.datetopay - 1])[0]],
  date: Object.keys(tempListDateOfCredit[dataTransaksi.datetopay - 1])[0],
};

const templist_terms_mount_array = [...templist_terms_mount];
const ConcatJoinObject = {
  name: dataTransaksi.namePembeli,
  totalTransaction: totalTransactionDisplay,
  list_terms_mount: templist_terms_mount_array,
  list_terms: templist_terms,
  date_to_pay: tempdate_to_pay,
};

let ShowOneTransaction = new Map();
ShowOneTransaction.set('list_terms', templist_terms);
ShowOneTransaction.set('date_to_pay', tempdate_to_pay);
ShowOneTransaction.set('parent_map', ConcatJoinObject);
return ShowOneTransaction.get(dataTransaksi.getMap);
