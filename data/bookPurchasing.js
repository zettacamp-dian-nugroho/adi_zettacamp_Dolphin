/** @format */
let DataTransaction = new Array();
async function BookPurchasing(inputData) {
  const dataTransaksi = inputData;
  const isGetDiscount = dataTransaksi.nilaiDiscount > 0;
  const isCredit = dataTransaksi.durasiCredit > 0;

  if (dataTransaksi.length < 1) {
    return 'Data Buku Tidak Tersedia!';
  }

  const taxAmmount = (dataTransaksi.hargaBuku * dataTransaksi.nilaiPajak) / 100;
  const discountAmount = (dataTransaksi.hargaBuku * dataTransaksi.nilaiDiscount) / 100;
  const discountPrice = dataTransaksi.hargaBuku - discountAmount;
  const priceBookWithTaxDiscount = discountPrice + taxAmmount;
  const totalMustPayPriceWithDiscountTax = dataTransaksi.jumlahBeli * priceBookWithTaxDiscount;

  const taxPrice = dataTransaksi.hargaBuku + taxAmmount;
  const totalMustPayPriceWithTax = dataTransaksi.jumlahBeli * taxPrice;

  if (isCredit) {
    const tempDateOfCredit = await getCreditDate(dataTransaksi.durasiCredit);
    const isChangeEachMonth = dataTransaksi.tambahanPadaBulanKe <= dataTransaksi.durasiCredit && dataTransaksi.tambahanPadaBulanKe > 0;
    if (isChangeEachMonth) {
      if (isGetDiscount) {
        const dateOfCreditWithPrice = await getCreditPrice(
          dataTransaksi.moneyPembeli - totalMustPayPriceWithDiscountTax,
          dataTransaksi.durasiCredit,
          tempDateOfCredit,
          dataTransaksi.biayaTambahan,
          dataTransaksi.tambahanPadaBulanKe,
          dataTransaksi.isAdditionalPrice
        );
        setDataArray(
          dataTransaksi,
          discountAmount,
          taxAmmount,
          priceBookWithTaxDiscount,
          totalMustPayPriceWithDiscountTax,
          dateOfCreditWithPrice
        );
      } else {
        const dateOfCreditWithPrice = await getCreditPrice(
          dataTransaksi.moneyPembeli - totalMustPayPriceWithTax,
          dataTransaksi.durasiCredit,
          tempDateOfCredit,
          dataTransaksi.biayaTambahan,
          dataTransaksi.tambahanPadaBulanKe,
          dataTransaksi.isAdditionalPrice
        );
        setDataArray(dataTransaksi, 0, taxAmmount, taxPrice, totalMustPayPriceWithTax, dateOfCreditWithPrice);
      }
    } else {
      return 'Bulan yang dipilih untuk ditambah biaya tambahan tidak ada!';
    }
  } else {
    if (isGetDiscount) {
      setDataArray(dataTransaksi, discountAmount, taxAmmount, priceBookWithTaxDiscount, totalMustPayPriceWithDiscountTax);
    } else {
      setDataArray(dataTransaksi, 0, taxAmmount, taxPrice, totalMustPayPriceWithTax);
    }
  }

  // return DataTransaction;
  return 'Success Insert The Data';
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
        potonganDiscount: formatToIDR(discountAmount),
      },
      pajak: {
        nilaiPajak: dataTransaksi.nilaiPajak,
        biayaPajak: formatToIDR(taxAmmount),
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
      Total: formatToIDR(dataTransaksi.moneyPembeli - totalMustPay - dataTransaksi.biayaTambahan),
    });
  } else {
    DataTransaction.push({
      name: dataTransaksi.namePembeli,
      money: formatToIDR(dataTransaksi.moneyPembeli),
      jumlahBeli: dataTransaksi.jumlahBeli,
      durasiCredit: dataTransaksi.durasiCredit,
      discount: {
        nilaiDiscount: dataTransaksi.nilaiDiscount,
        potonganDiscount: formatToIDR(discountAmount),
      },
      pajak: {
        nilaiPajak: dataTransaksi.nilaiPajak,
        biayaPajak: formatToIDR(taxAmmount),
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
    if (isAdditionalPrice && isOnIndexTarget) {
      formatDateWithPrice = `Cicilan bulan: ${date} - /bulan: ${formatToIDR(totalPrice / howLongCredit - biayaTambahan)}`;
      return formatDateWithPrice;
    } else {
      formatDateWithPrice = `Cicilan bulan: ${date} - /bulan: ${formatToIDR(totalPrice / howLongCredit)}`;
      return formatDateWithPrice;
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
  const discountPrice = dataTransaksi.hargaBuku - discountAmount;
  const priceBookWithTaxDiscount = discountPrice + taxAmmount;
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
