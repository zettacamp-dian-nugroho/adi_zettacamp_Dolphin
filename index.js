/** @format */

const formatToIDR = (x) => {
  return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(x);
};

function displayKembalian(uangPembeli, totalBeli, isGetDiscount, hargaBuku, totalHarga, durasiCredit) {
  console.log('=====================');
  console.log(`Uang Pembeli: ${formatToIDR(uangPembeli)}`);
  console.log(`Jumlah Beli: ${totalBeli}`);
  if (isGetDiscount) {
    console.log(`Harga Buku Diskon: ${formatToIDR(hargaBuku)}`);
    console.log(`Harga Barang Setelah Diskon + Pajak: ${formatToIDR(totalHarga)}`);
  } else {
    console.log(`Harga Buku Normal: ${formatToIDR(hargaBuku)}`);
    console.log(`Harga Barang + Pajak: ${formatToIDR(totalHarga)}`);
  }
  if (uangPembeli < totalHarga) {
    const tempDateCredit = getCreditDate(durasiCredit);
    console.log(`Uang anda kurang: ${formatToIDR(uangPembeli - totalHarga)}`);
    console.log(tempDateCredit);
    tempDateCredit.forEach((date) => {
      console.log(`Cicilan bulan: ${date} - /bulan: ${formatToIDR((totalHarga - uangPembeli) / durasiCredit)}`);
    });
  } else {
    console.log(`Kembalian: ${formatToIDR(uangPembeli - totalHarga)}`);
  }
}

function displayNota(isGetDiscount, jumlahBukuDibeli, hargaBuku, nilaiPercentPajak, durasiCredit) {
  if (isGetDiscount) {
    const taxAmmount = (hargaBuku * nilaiPercentPajak) / 100;
    console.log(`Nilai Pajak ${nilaiPercentPajak}% Sebelum Diskon: ${formatToIDR(taxAmmount)}`);
    /**const taxPrice = hargaBuku + taxAmmount;
    console.log(`Harga Barang Sebelum Diskon Setelah Pajak: ${formatToIDR(taxPrice)}`);
    const totalPriceWithTax = jumlahBukuDibeli * taxPrice;
    console.log(`Total ${jumlahBukuDibeli}x Harga Barang Sebelum Diskon Setelah Pajak: ${formatToIDR(totalPriceWithTax)}`);
    console.log('*break;');**/
    const discountAmount = (hargaBuku * nilaiPercentDiscount) / 100;
    console.log(`Nilai Diskon ${nilaiPercentDiscount}% Tanpa Pajak: ${formatToIDR(discountAmount)}`);
    const discountPrice = hargaBuku - discountAmount;
    console.log(`Harga Barang Diskon Tanpa Pajak: ${formatToIDR(discountPrice)}`);
    const totalPriceWithDiscount = jumlahBukuDibeli * discountPrice;
    console.log(`Total ${jumlahBukuDibeli}x Harga Barang Setelah Diskon Tanpa Pajak: ${formatToIDR(totalPriceWithDiscount)}`);
    const priceBookWithTaxDiscount = discountPrice + taxAmmount;
    console.log(`Harga Barang Setelah Diskon + Pajak: ${formatToIDR(priceBookWithTaxDiscount)}`);
    const totalPriceWithDiscountTax = jumlahBukuDibeli * priceBookWithTaxDiscount;
    console.log(`Total ${jumlahBukuDibeli}x Harga Barang Setelah Diskon + Pajak: ${formatToIDR(totalPriceWithDiscountTax)}`);
    displayKembalian(uangPembeli, jumlahBukuDibeli, isGetDiscount, priceBookWithTaxDiscount, totalPriceWithDiscountTax, durasiCredit);
  } else {
    const taxAmmount = (hargaBuku * nilaiPercentPajak) / 100;
    console.log(`Nilai Pajak Tanpa Diskon ${nilaiPercentPajak}%: ${formatToIDR(taxAmmount)}`);
    const taxPrice = hargaBuku + taxAmmount;
    console.log(`Harga Barang Tanpa Diskon Setelah Pajak: ${formatToIDR(taxPrice)}`);
    const totalPrice = jumlahBukuDibeli * taxPrice;
    console.log(`Total ${jumlahBukuDibeli}x Harga Barang Tanpa Diskon Setelah Pajak: ${formatToIDR(totalPrice)}`);
    displayKembalian(uangPembeli, jumlahBukuDibeli, isGetDiscount, taxPrice, totalPrice, durasiCredit);
  }
}

function getCreditDate(durasiCredit) {
  const currentDate = new Date().getDate();
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  const tempNextMonths = new Array(durasiCredit).fill(0);
  const nextMonths = tempNextMonths.map((list, index) => {
    if (currentMonth < 12) {
        currentMonth++;
    }else{
        currentMonth = 1;
        currentYear++;
    }

    const dueDate = new Date(currentYear, currentMonth, currentDate);
    const formattedDueDate = dueDate.toLocaleDateString('id-ID', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    return formattedDueDate;
  });

  return nextMonths;
}

function BookPurchasing(dataBuku, namaBukuBeli, uangPembeli, jumlahBeliBuku, nilaiPercentDiscount, nilaiPercentPajak, durasiCredit) {
  const isGetDiscount = nilaiPercentDiscount > 0;

  if (dataBuku == undefined) {
    console.log('Data Buku Kosong!');
  } else {
    let indexOfBook;
    let isHasBook = false;
    for (let i = 0; i < dataBuku.length; i++) {
      if (dataBuku[i].namaBuku === namaBukuBeli) {
        isHasBook = true;
        indexOfBook = i;
        break;
      }
    }

    if (!isHasBook) {
      console.log('Data Buku Tidak Tersedia!');
    } else {
      //   const isEnoughMoney = uangPembeli > dataBuku[indexOfBook].hargaBuku;
      //   if (!isEnoughMoney) {
      //     console.log(`Uang anda ${formatToIDR(uangPembeli)} tidak cukup untuk membeli 1 buah buku`);
      //     console.log(`Nama Buku: ${dataBuku[indexOfBook].namaBuku}`);
      //     console.log(`Nama Penulis: ${dataBuku[indexOfBook].namaPenulis}`);
      //     console.log(`Harga Buku: ${formatToIDR(dataBuku[indexOfBook].hargaBuku)}`);
      //     console.log(`Stock Buku: ${dataBuku[indexOfBook].stockBuku}`);
      //   } else {
      /** @format */

      console.log('Nota Pembelian Buku:');
      console.log(`Nama Buku: ${dataBuku[indexOfBook].namaBuku}`);
      console.log(`Nama Penulis: ${dataBuku[indexOfBook].namaPenulis}`);
      console.log(`Harga Buku: ${formatToIDR(dataBuku[indexOfBook].hargaBuku)}`);
      console.log(`Stock Buku: ${dataBuku[indexOfBook].stockBuku}`);

      console.log('=====================');

      console.log(`Buku yang dibeli: ${jumlahBeliBuku}`);
      let tempStockBuku = dataBuku[indexOfBook].stockBuku;
      for (let i = 1; i <= dataBuku[indexOfBook].stockBuku; i++) {
        if (i <= jumlahBeliBuku) {
          tempStockBuku--;
          console.log(`Berhasil membeli buku ke-${i}`);
          if (i == dataBuku[indexOfBook].stockBuku) {
            if (jumlahBeliBuku > dataBuku[indexOfBook].stockBuku) {
              const kurangBukuTerbeli = jumlahBeliBuku - dataBuku[indexOfBook].stockBuku;
              console.log(`Kamu hanya bisa membeli buku sebanyak ${dataBuku[indexOfBook].stockBuku}`);
              console.log(`Kamu kekurangan buku sebanyak ${kurangBukuTerbeli}`);
              console.log('=====================');
              displayNota(isGetDiscount, dataBuku[indexOfBook].stockBuku, dataBuku[indexOfBook].hargaBuku, nilaiPercentPajak, durasiCredit);
            }
          }
          if (i == jumlahBeliBuku) {
            displayNota(isGetDiscount, jumlahBeliBuku, dataBuku[indexOfBook].hargaBuku, nilaiPercentPajak, durasiCredit);
            console.log(`Stock buku tersisa ${tempStockBuku}`);
          }
        }
      }

      dataBukuJSON[indexOfBook] = {
        namaBuku: dataBuku[indexOfBook].namaBuku,
        namaPenulis: dataBuku[indexOfBook].namaPenulis,
        hargaBuku: dataBuku[indexOfBook].hargaBuku,
        stockBuku: tempStockBuku,
      };

      console.log('=====================');
      if (dataBuku[indexOfBook].stockBuku > 0) {
        console.log(`Stock Buku Tersedia Sisa: ${dataBuku[indexOfBook].stockBuku}`);
        console.log(`Buku masih bisa di beli/jual kembali`);
      } else {
        console.log(`Stock Buku Tersedia Sisa: ${dataBuku[indexOfBook].stockBuku}`);
        console.log(`Buku sudah habis, silahkan isi stock kembali`);
      }
      //   }
    }
  }
}

const dataBukuJSON = [
  {
    namaBuku: 'Koala Kumal',
    namaPenulis: 'Raditya Dika',
    hargaBuku: 54000,
    stockBuku: 5,
  },
  {
    namaBuku: 'Cinta Brontosaurus',
    namaPenulis: 'Raditya Dika',
    hargaBuku: 42000,
    stockBuku: 4,
  },
];

const namaBukuBeli = 'Koala Kumal';
const uangPembeli = 10000;
const jumlahBeliBuku = 7;
const nilaiPercentDiscount = 20;
const nilaiPercentPajak = 10;
const durasiCredit = 12; // 1 berarti /bulan
// console.log(dataBukuJSON);
// console.log('*Break;');
BookPurchasing(dataBukuJSON, namaBukuBeli, uangPembeli, jumlahBeliBuku, nilaiPercentDiscount, nilaiPercentPajak, durasiCredit);
// console.log('*Break;');
// console.log(dataBukuJSON);
