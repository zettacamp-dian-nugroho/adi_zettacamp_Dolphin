/** @format */

const formatToIDR = (x) => {
  return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(x);
};

function BookPurchasing(dataNamaBuku, dataNamaAuthor, dataPriceBuku, dataJumlahBeliBuku, nilaiPercentDiscount, nilaiPercentPajak) {
  const headingNote = 'Nota Pembelian Buku';
  const isGetDiscount = nilaiPercentDiscount > 0;

  if (dataNamaBuku == undefined) {
    console.log('Data Buku Kosong!');
  } else {
    console.log(headingNote);
    console.log(`Nama Buku: ${dataNamaBuku}`);
    console.log(`Nama Penulis: ${dataNamaAuthor}`);
    console.log(`Harga Barang Awal: ${formatToIDR(dataPriceBuku)}`);
    console.log('*break;');

    if (isGetDiscount) {
      const taxAmmount = (dataPriceBuku * nilaiPercentPajak) / 100;
      console.log(`Nilai Pajak ${nilaiPercentPajak}% Sebelum Diskon: ${formatToIDR(taxAmmount)}`);
      const taxPrice = dataPriceBuku + taxAmmount;
      console.log(`Harga Barang Sebelum Diskon Setelah Pajak: ${formatToIDR(taxPrice)}`);
      const totalPriceWithTax = dataJumlahBeliBuku * taxPrice;
      console.log(`Total ${dataJumlahBeliBuku}x Harga Barang Sebelum Diskon Setelah Pajak: ${formatToIDR(totalPriceWithTax)}`);
      console.log('*break;');
      const discountAmount = (dataPriceBuku * nilaiPercentDiscount) / 100;
      console.log(`Nilai Diskon ${nilaiPercentDiscount}% Tanpa Pajak: ${formatToIDR(discountAmount)}`);
      const discountPrice = dataPriceBuku - discountAmount;
      console.log(`Harga Barang Diskon Tanpa Pajak: ${formatToIDR(discountPrice)}`);
      const totalPriceWithDiscount = dataJumlahBeliBuku * discountPrice;
      console.log(`Total ${dataJumlahBeliBuku}x Harga Barang Setelah Diskon Tanpa Pajak: ${formatToIDR(totalPriceWithDiscount)}`);
      const priceBookWithTaxDiscount = discountPrice + taxAmmount;
      console.log(`Harga Barang Setelah Diskon + Pajak: ${formatToIDR(priceBookWithTaxDiscount)}`);
      const totalPriceWithDiscountTax = dataJumlahBeliBuku * priceBookWithTaxDiscount;
      console.log(`Total ${dataJumlahBeliBuku}x Harga Barang Setelah Diskon + Pajak: ${formatToIDR(totalPriceWithDiscountTax)}`);
      console.log('*break;');
      const taxAmountWithDiscount = (discountPrice * nilaiPercentPajak) / 100;
      console.log(`Nilai Pajak Setelah Diskon: ${formatToIDR(taxAmountWithDiscount)}`);
      const priceBookWithDiscountTax = discountPrice + taxAmountWithDiscount;
      console.log(`Harga Barang Setelah Diskon + Pajak: ${formatToIDR(priceBookWithDiscountTax)}`);
      const totalPrice = dataJumlahBeliBuku * priceBookWithDiscountTax;
      console.log(`Total ${dataJumlahBeliBuku}x Harga Barang Setelah Diskon + Pajak: ${formatToIDR(totalPrice)}`);
    } else {
      const taxAmmount = (dataPriceBuku * nilaiPercentPajak) / 100;
      console.log(`Nilai Pajak Tanpa Diskon ${nilaiPercentPajak}%: ${formatToIDR(taxAmmount)}`);
      const taxPrice = dataPriceBuku + taxAmmount;
      console.log(`Harga Barang Tanpa Diskon Setelah Pajak: ${formatToIDR(taxPrice)}`);
      const totalPrice = dataJumlahBeliBuku * taxPrice;
      console.log(`Total ${dataJumlahBeliBuku}x Harga Barang Tanpa Diskon Setelah Pajak: ${formatToIDR(totalPrice)}`);
    }
  }
}

const dataNamaBuku = 'Koala Kumal';
const dataNamaAuthor = 'Raditya Dika';
const dataPriceBuku = 54000;
const dataJumlahBeliBuku = 2;
const nilaiPercentDiscount = 20;
const nilaiPajak = 10;
BookPurchasing(dataNamaBuku, dataNamaAuthor, dataPriceBuku, dataJumlahBeliBuku, nilaiPercentDiscount, nilaiPajak);
