/** @format */

// FUNCTION FOR BOOK TRANSACTION START HERE
const BookTransaction = require('../models/TransactionModel');
const ProcessTransaction = async (BookId, BookData) => {
  const tempId = BookId.split(':')[1];
  const isHaveBookDatas = await Books.findById(tempId);

  if (isHaveBookDatas) {
    const CalculateStock =
      isHaveBookDatas.stock_of_book > 0 && BookData.total_book <= isHaveBookDatas.stock_of_book
        ? isHaveBookDatas.stock_of_book - BookData.total_book
        : false;

    if (!CalculateStock && CalculateStock !== 0) {
      return `Gagal Transaksi! Nominal tidak sesuai stock buku.`;
    }

    const UpdateDataBook = {
      stock_of_book: CalculateStock,
    };

    return await Books.findByIdAndUpdate(tempId, UpdateDataBook)
      .then((result) => {
        return `Berhasil bertransaksi buku!`;
      })
      .catch((err) => {
        return `Gagal bertransaksi! ${err.name}`;
      });
  } else {
    return `Gagal bertransaksi! Data buku tidak ada.`;
  }
};

const GetTransactionDatas = async () => {
  const isHaveBookDatas = await BookTransaction.find({});

  if (isHaveBookDatas.length > 0) {
    return isHaveBookDatas;
  } else {
    return false;
  }
};
// FUNCTION FOR BOOK TRANSACTION END HERE

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
        } else {
          const dateOfCreditWithPrice = await getCreditPrice(
            Math.ceil(dataTransaksi.moneyPembeli - totalMustPayPriceWithTax),
            dataTransaksi.durasiCredit,
            tempDateOfCredit,
            Math.ceil(dataTransaksi.biayaTambahan),
            dataTransaksi.tambahanPadaBulanKe,
            dataTransaksi.isAdditionalPrice
          );
        }
      } else {
        return 'Bulan yang dipilih untuk ditambah biaya tambahan tidak ada!';
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
  let currentDate = new Date().getDate();
  let tempCurrentDate = currentDate;
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  const tempNextMonths = new Array(durasiCredit).fill(0);
  const nextMonths = await tempNextMonths.map((_, index) => {
    if (currentMonth < 12) {
      if (currentDate > 28 && currentMonth == 1) {
        currentDate = 28;
        currentMonth++;
      } else {
        currentDate = tempCurrentDate;
        currentMonth++;
      }
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
