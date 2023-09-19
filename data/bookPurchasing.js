/** @format */
let DataTransaction = new Array();
async function BookPurchasing(inputData) {
  const dataTransaksi = inputData;
  const isGetDiscount = dataTransaksi.nilaiDiscount > 0;
  const isCredit = dataTransaksi.durasiCredit > 0;

  if (dataTransaksi.length < 1) {
    return 'Data Buku Tidak Tersedia!';
  }

  if (dataTransaksi.isInsertData) {
    const taxAmmount = (dataTransaksi.hargaBuku * dataTransaksi.nilaiPajak) / 100;
    const discountAmount = (dataTransaksi.hargaBuku * dataTransaksi.nilaiDiscount) / 100;
    const discountPrice = dataTransaksi.hargaBuku - Math.ceil(discountAmount);
    const priceBookWithTaxDiscount = discountPrice + Math.ceil(taxAmmount);
    const totalMustPayPriceWithDiscountTax = dataTransaksi.jumlahBeli * priceBookWithTaxDiscount;

    const taxPrice = dataTransaksi.hargaBuku + Math.ceil(taxAmmount);
    const totalMustPayPriceWithTax = dataTransaksi.jumlahBeli * taxPrice;

    if (isCredit) {
      const tempDateOfCredit = await getCreditDate(dataTransaksi.durasiCredit);
      const isChangeEachMonth = dataTransaksi.tambahanPadaBulanKe <= dataTransaksi.durasiCredit && dataTransaksi.tambahanPadaBulanKe > 0;
      if (isChangeEachMonth) {
        if (isGetDiscount) {
          const dateOfCreditWithPrice = await getCreditPrice(
            Math.ceil(dataTransaksi.moneyPembeli - totalMustPayPriceWithDiscountTax),
            dataTransaksi.durasiCredit,
            tempDateOfCredit,
            Math.ceil(dataTransaksi.biayaTambahan),
            dataTransaksi.tambahanPadaBulanKe,
            dataTransaksi.isAdditionalPrice
          );
          setDataArray(
            dataTransaksi,
            Math.ceil(discountAmount),
            Math.ceil(taxAmmount),
            priceBookWithTaxDiscount,
            totalMustPayPriceWithDiscountTax,
            dateOfCreditWithPrice
          );
        } else {
          const dateOfCreditWithPrice = await getCreditPrice(
            Math.ceil(dataTransaksi.moneyPembeli - totalMustPayPriceWithTax),
            dataTransaksi.durasiCredit,
            tempDateOfCredit,
            Math.ceil(dataTransaksi.biayaTambahan),
            dataTransaksi.tambahanPadaBulanKe,
            dataTransaksi.isAdditionalPrice
          );
          setDataArray(dataTransaksi, 0, Math.ceil(taxAmmount), taxPrice, totalMustPayPriceWithTax, dateOfCreditWithPrice);
        }
      } else {
        return 'Bulan yang dipilih untuk ditambah biaya tambahan tidak ada!';
      }
    } else {
      if (isGetDiscount) {
        setDataArray(
          dataTransaksi,
          Math.ceil(discountAmount),
          Math.ceil(taxAmmount),
          priceBookWithTaxDiscount,
          totalMustPayPriceWithDiscountTax
        );
      } else {
        setDataArray(dataTransaksi, 0, Math.ceil(taxAmmount), taxPrice, totalMustPayPriceWithTax);
      }
    }
    return 'Success Insert Data';
  }

  if (dataTransaksi.isShowAll) {
    if (DataTransaction.length > 0) {
      return DataTransaction;
    } else {
      return 'Data Kosong!';
    }
  } else {
    if (DataTransaction.length > 0) {
      let tempListDateOfCredit;
      let totalTransactionDisplay = 0;
      for (const ListDateOfCredit of DataTransaction) {
        if (ListDateOfCredit.name == dataTransaksi.namePembeli) {
          tempListDateOfCredit = ListDateOfCredit.creditDate;
          totalTransactionDisplay = ListDateOfCredit.dataTransaction.uangKurang;
          break;
        } else {
          tempListDateOfCredit = false;
        }
      }

      if (!tempListDateOfCredit) {
        return 'Data Kosong!';
      }

      const list_terms_mount = new Set();
      for (const listDateKey of tempListDateOfCredit) {
        list_terms_mount.add(listDateKey[Object.keys(listDateKey)]);
      }

      const list_terms = new Map();
      const templist_terms = new Map();
      for (const listDateKey of tempListDateOfCredit) {
        const keyListDate = Object.keys(listDateKey);
        const isiList_terms = {
          term_amount: listDateKey[Object.keys(listDateKey)],
          date: keyListDate[0],
        };
        templist_terms.set(keyListDate[0], isiList_terms);
        list_terms.set('list_terms', templist_terms.get(keyListDate[0]));
        console.log(list_terms.get('list_terms'));
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
        list_terms: list_terms.get('list_terms'),
        date_to_pay: date_to_pay.get('date_to_pay'),
      };

      // let templist_termsObject = new Object();
      // for (const listDateKey of tempListDateOfCredit) {
      //   const keyListDate = Object.keys(listDateKey);
      //   templist_termsObject[keyListDate[0]] = list_terms.get(keyListDate[0]);
      // }

      // ConcatJoinObject.list_terms = templist_termsObject;
      // ConcatJoinObject.date_to_pay = date_to_pay.get('date_to_pay');

      const ShowOneTransaction = new Map();
      ShowOneTransaction.set('list_terms', list_terms);
      ShowOneTransaction.set('date_to_pay', date_to_pay);
      ShowOneTransaction.set('list_terms_mount_array', list_terms_mount_array);
      ShowOneTransaction.set('parent_map', ConcatJoinObject);
      return ShowOneTransaction.get(dataTransaksi.getMap);
    } else {
      return 'Data Kosong!';
    }
  }
}

const formatToIDR = (x) => {
  return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(x);
};

const setDataArray = (dataTransaksi, discountAmount, taxAmmount, defaultPriceBook, totalMustPay, dateOfCreditWithPrice) => {
  const isCredit = dataTransaksi.durasiCredit > 0;
  if (isCredit) {
    DataTransaction.push({
      name: dataTransaksi.namePembeli,
      money: formatToIDR(dataTransaksi.moneyPembeli),
      jumlahBeli: dataTransaksi.jumlahBeli,
      durasiCredit: dataTransaksi.durasiCredit,
      discount: {
        nilaiDiscount: dataTransaksi.nilaiDiscount,
        potonganDiscount: formatToIDR(Math.ceil(discountAmount)),
      },
      pajak: {
        nilaiPajak: dataTransaksi.nilaiPajak,
        biayaPajak: formatToIDR(Math.ceil(taxAmmount)),
      },
      dataBuku: {
        namaBuku: dataTransaksi.namaBuku,
        namaPenulis: dataTransaksi.namaPenulis,
        hargaBuku: formatToIDR(dataTransaksi.hargaBuku),
        stockBuku: dataTransaksi.stockBuku,
      },
      dataTransaction: {
        jumlahBeli: dataTransaksi.jumlahBeli,
        moneyPembeli: formatToIDR(dataTransaksi.moneyPembeli),
        hargaBukuDiscountPajak: formatToIDR(defaultPriceBook),
        totalBayar: formatToIDR(totalMustPay),
        uangKurang: formatToIDR(dataTransaksi.moneyPembeli - totalMustPay),
      },
      creditDate: dateOfCreditWithPrice,
    });
  } else {
    DataTransaction.push({
      name: dataTransaksi.namePembeli,
      money: formatToIDR(dataTransaksi.moneyPembeli),
      jumlahBeli: dataTransaksi.jumlahBeli,
      durasiCredit: dataTransaksi.durasiCredit,
      discount: {
        nilaiDiscount: dataTransaksi.nilaiDiscount,
        potonganDiscount: formatToIDR(Math.ceil(discountAmount)),
      },
      pajak: {
        nilaiPajak: dataTransaksi.nilaiPajak,
        biayaPajak: formatToIDR(Math.ceil(taxAmmount)),
      },
      dataBuku: {
        namaBuku: dataTransaksi.namaBuku,
        namaPenulis: dataTransaksi.namaPenulis,
        hargaBuku: formatToIDR(dataTransaksi.hargaBuku),
        stockBuku: dataTransaksi.stockBuku,
      },
      dataTransaction: {
        jumlahBeli: dataTransaksi.jumlahBeli,
        moneyPembeli: formatToIDR(dataTransaksi.moneyPembeli),
        hargaBukuDiscountPajak: formatToIDR(defaultPriceBook),
        totalBayar: formatToIDR(totalMustPay),
        uangKembalian: formatToIDR(dataTransaksi.moneyPembeli - totalMustPay),
      },
    });
  }
};

const getCreditPrice = async (totalPrice, howLongCredit, dateOfCredit, biayaTambahan, tambahanPadaBulanKe, isAdditionalPrice) => {
  const creditPrice = await dateOfCredit.map((date, index) => {
    const isOnIndexTarget = index === tambahanPadaBulanKe - 1;
    const tempTotalPrice = new Object();
    const tempEachMonthPrice = totalPrice / howLongCredit;

    if (isAdditionalPrice && isOnIndexTarget) {
      tempTotalPrice[date] = formatToIDR(tempEachMonthPrice - biayaTambahan);
      return tempTotalPrice;
    }
    if (isOnIndexTarget) {
      const SisaNominal = tempEachMonthPrice.toFixed(2) % howLongCredit;
      const finalPrice = Math.ceil(tempEachMonthPrice.toFixed(2)) + Math.ceil(SisaNominal.toFixed(2));
      tempTotalPrice[date] = formatToIDR(Math.ceil(finalPrice));
      return tempTotalPrice;
    } else {
      tempTotalPrice[date] = formatToIDR(Math.ceil(tempEachMonthPrice));
      return tempTotalPrice;
    }
  });

  return creditPrice;
};

const getCreditDate = async (durasiCredit) => {
  const currentDate = new Date().getDate();
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  const tempNextMonths = new Array(durasiCredit).fill(0);
  const nextMonths = await tempNextMonths.map((_, index) => {
    if (currentMonth < 12) {
      currentMonth++;
    } else {
      currentMonth = 1;
      currentYear++;
    }

    const dueDate = new Date(currentYear, currentMonth, currentDate);
    const formattedDueDate = dueDate.toLocaleDateString('id-ID', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    return formattedDueDate;
  });

  return nextMonths;
};

const DisplayDataTransaction = () => {
  if (DataTransaction.length > 0) {
    return DataTransaction;
  } else {
    return 'Data Kosong!';
  }
};

const getCalculateCredit = async (inputData) => {
  const dataTransaksi = inputData;
  const tempDateOfCredit = await getCreditDate(dataTransaksi.durasiCredit);
  const taxAmmount = (dataTransaksi.hargaBuku * dataTransaksi.nilaiPajak) / 100;
  const discountAmount = (dataTransaksi.hargaBuku * dataTransaksi.nilaiDiscount) / 100;
  const discountPrice = dataTransaksi.hargaBuku - Math.ceil(discountAmount);
  const priceBookWithTaxDiscount = discountPrice + Math.ceil(taxAmmount);
  const totalMustPayPriceWithDiscountTax = dataTransaksi.jumlahBeli * priceBookWithTaxDiscount;

  const creditPrice = tempDateOfCredit.map((date, index) => {
    const isOnIndexTarget = index === dataTransaksi.tambahanPadaBulanKe - 1;
    if (dataTransaksi.isAdditionalPrice && isOnIndexTarget) {
      formatDateWithPrice = `Cicilan bulan: ${date} - /bulan: ${formatToIDR(
        totalMustPayPriceWithDiscountTax / dataTransaksi.durasiCredit + dataTransaksi.biayaTambahan
      )}`;
      return formatDateWithPrice;
    } else {
      formatDateWithPrice = `Cicilan bulan: ${date} - /bulan: ${formatToIDR(
        totalMustPayPriceWithDiscountTax / dataTransaksi.durasiCredit
      )}`;
      return formatDateWithPrice;
    }
  });

  return creditPrice;
};

const eventLoopWithPromise = async () => {
  for (let i = 0; i < 5; i++) {
    console.log(`Looping ke-${i + 1}`);
    if (i === 4) {
      new Promise((resolve) => {
        resolve(true);
        console.log(true);
      });
    } else {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    }
  }
};

//Explore
let fs = require('fs');
const SaveFileToLocal = (Text) => {
  const InputPerLine = Text + '\n';
  const filePath = './data/OutputWriteLine.txt';
  fs.appendFile(filePath, InputPerLine, (err) => {
    if (err) {
      console.error('Gagal menyimpan text:', err);
    } else {
      console.log('Menambahkan Text Kedalam File');
    }
  });
};

let events = require('events');
const { fork } = require('child_process');
let eventEmitter = new events.EventEmitter();
eventEmitter.on('StartProsesSaveFile', SaveFileToLocal);

async function exploreEventLoopWithWriteFile() {
  let isDone = false;
  console.log(`isDone? ${isDone}`);
  for (let i = 0; i < 5; i++) {
    const TextPerLoop = `Looping ke-${i + 1}`;
    console.log(TextPerLoop);
    eventEmitter.emit('StartProsesSaveFile', TextPerLoop);
    if (i === 4) {
      isDone = true;
    }
    await new Promise((_) => setTimeout(_, 2000));
  }
  console.log(`isDone? ${isDone}`);
  eventEmitter.emit('StartProsesSaveFile', isDone);
  return isDone;
}

module.exports = {
  BookPurchasing,
  DisplayDataTransaction,
  getCalculateCredit,
  eventLoopWithPromise,
  exploreEventLoopWithWriteFile,
};
