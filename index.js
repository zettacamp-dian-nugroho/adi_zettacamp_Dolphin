/** @format */
function BookPurchasing(dataBuku, dataPembeli) {
  const bukuForTransaksi = dataBuku.filter((buku) => {
    return buku.namaBuku == dataPembeli.namaBuku ? buku : undefined;
  });
  const dataTransaksi = bukuForTransaksi.concat(dataPembeli);
  const isGetDiscount = dataTransaksi[1].nilaiDiscount > 0;

  if (dataTransaksi == undefined) {
    console.log('Data Buku Tidak Tersedia!');
  } else {
    console.log('Nota Pembelian Buku:');
    console.log(`Nama Buku: ${dataTransaksi[0].namaBuku}`);
    console.log(`Nama Penulis: ${dataTransaksi[0].namaPenulis}`);
    console.log(`Harga Buku: ${formatToIDR(dataTransaksi[0].hargaBuku)}`);
    console.log(`Stock Buku: ${dataTransaksi[0].stockBuku}`);
    console.log('=====================');
    console.log(`Buku yang dibeli: ${dataTransaksi[1].jumlahBeli}`);

    let tempStockBuku = dataTransaksi[0].stockBuku;
    for (let i = 1; i <= dataTransaksi[0].stockBuku; i++) {
      if (i <= dataTransaksi[1].jumlahBeli) {
        tempStockBuku--;
        console.log(`Berhasil membeli buku ke-${i}`);
      } else {
        break;
      }
    }

    if (tempStockBuku > 0) {
      console.log(`Stock buku tersisa ${tempStockBuku}`);
      console.log(`Buku masih bisa di beli/jual kembali`);
      displayNota(dataTransaksi, isGetDiscount, dataTransaksi[1].jumlahBeli);
    } else {
      const kurangBukuTerbeli = dataTransaksi[1].jumlahBeli - dataTransaksi[0].stockBuku;
      console.log(`Kamu hanya bisa membeli buku sebanyak ${dataTransaksi[0].stockBuku}`);
      console.log(`Kamu kekurangan buku sebanyak ${kurangBukuTerbeli}`);
      console.log(`Buku sudah habis, silahkan isi stock`);
      displayNota(dataTransaksi, isGetDiscount, dataTransaksi[0].stockBuku);
    }

    const tempUpdateJSON = dataBuku.map((list) => {
      const tempData = new Array();
      if (list.namaBuku == dataTransaksi[0].namaBuku) {
        tempData.push({
          namaBuku: dataTransaksi[0].namaBuku,
          namaPenulis: dataTransaksi[0].namaPenulis,
          hargaBuku: dataTransaksi[0].hargaBuku,
          stockBuku: tempStockBuku,
        });
      } else {
        tempData.push({
          namaBuku: dataTransaksi[0].namaBuku,
          namaPenulis: dataTransaksi[0].namaPenulis,
          hargaBuku: dataTransaksi[0].hargaBuku,
          stockBuku: dataTransaksi[0].stockBuku,
        });
      }
      return tempData;
    });

    dataBukuJSON = tempUpdateJSON;

    // console.log(dataBuku);
  }
}

function displayNota(dataTransaksi, isGetDiscount, barangTerbeli) {
  console.log('=====================');
  if (isGetDiscount) {
    const taxAmmount = (dataTransaksi[0].hargaBuku * dataTransaksi[1].nilaiPajak) / 100;
    console.log(`Nilai Pajak ${dataTransaksi[1].nilaiPajak}% Sebelum Diskon: ${formatToIDR(taxAmmount)}`);
    /**const taxPrice = hargaBuku + taxAmmount;
        console.log(`Harga Barang Sebelum Diskon Setelah Pajak: ${formatToIDR(taxPrice)}`);
        const totalPriceWithTax = jumlahBukuDibeli * taxPrice;
        console.log(`Total ${jumlahBukuDibeli}x Harga Barang Sebelum Diskon Setelah Pajak: ${formatToIDR(totalPriceWithTax)}`);
        console.log('*break;');**/
    const discountAmount = (dataTransaksi[0].hargaBuku * dataTransaksi[1].nilaiDiscount) / 100;
    console.log(`Nilai Diskon ${dataTransaksi[1].nilaiDiscount}% Tanpa Pajak: ${formatToIDR(discountAmount)}`);
    const discountPrice = dataTransaksi[0].hargaBuku - discountAmount;
    console.log(`Harga Barang Diskon Tanpa Pajak: ${formatToIDR(discountPrice)}`);
    const totalPriceWithDiscount = barangTerbeli * discountPrice;
    console.log(`Total ${barangTerbeli}x Harga Barang Setelah Diskon Tanpa Pajak: ${formatToIDR(totalPriceWithDiscount)}`);
    const priceBookWithTaxDiscount = discountPrice + taxAmmount;
    console.log(`Harga Barang Setelah Diskon + Pajak: ${formatToIDR(priceBookWithTaxDiscount)}`);
    const totalPriceWithDiscountTax = barangTerbeli * priceBookWithTaxDiscount;
    console.log(`Total ${barangTerbeli}x Harga Barang Setelah Diskon + Pajak: ${formatToIDR(totalPriceWithDiscountTax)}`);
    displayKembalian(dataTransaksi, isGetDiscount, totalPriceWithDiscountTax, barangTerbeli);
  } else {
    const taxAmmount = (dataTransaksi[0].hargaBuku * dataTransaksi[1].nilaiPajak) / 100;
    console.log(`Nilai Pajak Tanpa Diskon ${dataTransaksi[1].nilaiPajak}%: ${formatToIDR(taxAmmount)}`);
    const taxPrice = dataTransaksi[0].hargaBuku + taxAmmount;
    console.log(`Harga Barang Tanpa Diskon Setelah Pajak: ${formatToIDR(taxPrice)}`);
    const totalPrice = barangTerbeli * taxPrice;
    console.log(`Total ${barangTerbeli}x Harga Barang Tanpa Diskon Setelah Pajak: ${formatToIDR(totalPrice)}`);
    displayKembalian(dataTransaksi, isGetDiscount, totalPrice, barangTerbeli);
  }
}

function displayKembalian(dataTransaksi, isGetDiscount, totalPrice, banyakTerbeli) {
  console.log('=====================');
  console.log(`Uang Pembeli: ${formatToIDR(dataTransaksi[1].money)}`);
  console.log(`Jumlah Beli: ${banyakTerbeli}`);
  if (isGetDiscount) {
    console.log(`Harga Barang Setelah Diskon + Pajak: ${formatToIDR(totalPrice)}`);
  } else {
    console.log(`Harga Buku Normal: ${formatToIDR(dataTransaksi[0].hargaBuku)}`);
    console.log(`Harga Barang + Pajak: ${formatToIDR(totalPrice)}`);
  }
  if (dataTransaksi[1].money < totalPrice) {
    const tempDateCredit = getCreditDate(dataTransaksi[1].durasiCredit);
    console.log(`Uang anda kurang: ${formatToIDR(dataTransaksi[1].money - totalPrice)}`);
    console.log(tempDateCredit);
    tempDateCredit.forEach((date) => {
      console.log(`Cicilan bulan: ${date} - /bulan: ${formatToIDR((totalPrice - dataTransaksi[1].money) / dataTransaksi[1].durasiCredit)}`);
    });
    const tempDateOfCredit = tempDateCredit.map((date) => {
      formattedDueDate = `Cicilan bulan: ${date} - /bulan: ${formatToIDR(
        (totalPrice - dataTransaksi[1].money) / dataTransaksi[1].durasiCredit
      )}`;
      return formattedDueDate;
    });
    if (dataTransaksi[0].stockBuku > dataTransaksi[1].jumlahBeli || (dataTransaksi[1].money < totalPrice)) {
        setDataPembeli(dataTransaksi, dataTransaksi[1].jumlahBeli, `-${totalPrice - dataTransaksi[1].money}`, tempDateOfCredit);
    } else {
        setDataPembeli(dataTransaksi, dataTransaksi[0].stockBuku, totalPrice - dataTransaksi[1].money, tempDateOfCredit);
    }
  } else {
    console.log(`Kembalian: ${formatToIDR(dataTransaksi[1].money - totalPrice)}`);
    if (dataTransaksi[1].money > totalPrice) {
        setDataPembeli(dataTransaksi, dataTransaksi[0].stockBuku, dataTransaksi[1].money - totalPrice, 0);
    }else{
        setDataPembeli(dataTransaksi, dataTransaksi[1].jumlahBeli, dataTransaksi[1].money - totalPrice, tempDateOfCredit);
    }
  }
}

const formatToIDR = (x) => {
  return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(x);
};

function setDataPembeli(dataTransaksi, totalDibeli, totalPrice, tempDateOfCredit) {
  const tempUpdateDataPembeli = {
    name: dataTransaksi[1].name,
    money: totalPrice,
    jumlahBeli: totalDibeli,
    nilaiDiscount: dataTransaksi[1].nilaiDiscount,
    nilaiPajak: dataTransaksi[1].nilaiPajak,
    durasiCredit: dataTransaksi[1].durasiCredit,
    namaBuku: dataTransaksi[1].namaBuku,
    creditDate: tempDateOfCredit,
  };
  dataPembeli = tempUpdateDataPembeli;
}

function getCreditDate(durasiCredit) {
  const currentDate = new Date().getDate();
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  const tempNextMonths = new Array(durasiCredit).fill(0);
  const nextMonths = tempNextMonths.map((_, index) => {
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
}

let dataBukuJSON = [
  {
    namaBuku: 'Koala Kumal',
    namaPenulis: 'Raditya Dika',
    hargaBuku: 54545,
    stockBuku: 5,
  },
  {
    namaBuku: 'Cinta Brontosaurus',
    namaPenulis: 'Raditya Dika',
    hargaBuku: 42000,
    stockBuku: 4,
  },
];

let dataPembeli = {
  name: 'Adi',
  money: 15132,
  jumlahBeli: 3,
  nilaiDiscount: 20,
  nilaiPajak: 10,
  durasiCredit: 5,
  namaBuku: 'Koala Kumal',
};
// console.log(dataBukuJSON);
// console.log('*Break;');
BookPurchasing(dataBukuJSON, dataPembeli);
// console.log('*Break;');
// console.log(dataBukuJSON);
console.log(dataBukuJSON);
console.log(dataPembeli);
