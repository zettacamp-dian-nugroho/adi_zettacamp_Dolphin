/** @format */

readDataFromLocalStorage();
function getIdAutoIncreament() {
  const dataBuku = JSON.parse(localStorage.getItem('dataBuku'));
  const isNull = dataBuku != null ? false : true;
  if (isNull) {
    return 0;
  } else {
    let lastKey;
    for (const key in dataBuku) {
      lastKey = dataBuku[key].id;
    }
    return (lastKey || 0) + 1;
  }
}

function setDataBukuHandler() {
  const namaBuku = document.getElementById('nama-buku').value;
  const namaPenulis = document.getElementById('nama-penulis').value;
  const descBuku = document.getElementById('deskripsi-buku').value;
  const stockBuku = document.getElementById('stock-buku').value;
  if (!namaBuku) {
    alert('Tolong masukan nama buku');
    return false;
  }
  if (!namaPenulis) {
    alert('Tolong masukan nama penulis buku');
    return false;
  }
  if (!stockBuku) {
    alert('Tolong masukan stock buku');
    return false;
  }
  if (namaBuku && namaPenulis && stockBuku) {
    const tempDataObject = {
      id: getIdAutoIncreament(),
      namaBuku: namaBuku,
      namaPenulis: namaPenulis,
      descBuku: descBuku,
      stockBuku: stockBuku,
    };
    createDataToLocalStorage(tempDataObject);
  }
}

function createDataToLocalStorage(objectData) {
  let dataBuku = JSON.parse(localStorage.getItem('dataBuku'));
  const isNull = dataBuku != null ? false : true;
  if (isNull) {
    let newData = new Array();
    newData.push(objectData);
    localStorage.setItem('dataBuku', JSON.stringify(newData));
  } else {
    dataBuku.push(objectData);
    localStorage.setItem('dataBuku', JSON.stringify(dataBuku));
  }
  readDataFromLocalStorage();
}

function readDataFromLocalStorage() {
  const dataBuku = JSON.parse(localStorage.getItem('dataBuku'));
  const isNull = dataBuku != null ? false : true;
  if (isNull) {
    const displayDataInRow = `
      <tr>
      <td><i>Data Kosong</i></td>
      <td><i>Data Kosong</i></td>
      <td><i>Data Kosong</i></td>
      <td><i>Data Kosong</i></td>
      <td><i>Data Kosong</i></td>
      </tr>
      `;
    const displayStorageStock = `
      <tr>
      <td colspan='3'>Total Buku Di Gudang:</td>
      <td colspan='2'><i>Data Kosong</i></td>
      </tr>
      `;
    document.getElementById('tblbody-displaydata').innerHTML = displayDataInRow + displayStorageStock;
  } else {
    dataBuku.forEach((list) => {
      const btnEditDataId = `btn-edit-data${list.id}`;
      const btnDeleteDataId = `btn-delete-data${list.id}`;
      const displayDataInRow = `
      <tr id='${list.id}' dataListBuku='${list.id}' dataNamaBuku='${list.namaBuku}' dataNamaPenulis='${list.namaPenulis}' dataDescBuku='${list.descBuku}' dataStockBuku='${list.stockBuku}'>
      <td id='namaBuku' class='data-handler'>${list.namaBuku}</td>
      <td id='namaPenulis' class='data-handler'>${list.namaPenulis}</td>
      <td id='descBuku' class='data-handler'>${list.descBuku}</td>
      <td id='stockBuku' class='data-handler'>${list.stockBuku}</td>
      <td class='data-handler'>
      <button id='${btnEditDataId}' class='btn btn-primary' onclick='editDataBookHandler(${list.id})'>Edit</button>
      <button id='${btnDeleteDataId}' class='btn btn-danger' onclick='deleteDataBukuHandler(${list.id})'>Delete</button>
      </td>
      </tr>
      `;
      document.getElementById('tblbody-displaydata').innerHTML += displayDataInRow;
    });
    const displayStorageStock = `
      <tr>
      <td colspan='3'>Total Buku Di Gudang:</td>
      <td colspan='2'><button class='btn btn-danger' onclick='forceDeleteAllData()'>Hapus Semua</button></td>
      </tr>
      `;
    document.getElementById('tblbody-displaydata').innerHTML += displayStorageStock;
  }
}

function cancelEditingDataBuku(idBook) {
  const btnEditDataId = `btn-edit-data${idBook}`;
  const btnDeleteDataId = `btn-delete-data${idBook}`;

  const rowDataBuku = document.getElementById(idBook); //this gives tr of  whose button was clicked
  const updateForm = rowDataBuku.querySelectorAll('.data-handler');

  const tempNamaBuku = rowDataBuku.getAttribute('dataNamaBuku');
  const tempNamaPenulis = rowDataBuku.getAttribute('dataNamaPenulis');
  const tempDescBuku = rowDataBuku.getAttribute('dataDescBuku');
  const tempStockBuku = rowDataBuku.getAttribute('dataStockBuku');

  updateForm[0].innerHTML = tempNamaBuku;
  updateForm[1].innerHTML = tempNamaPenulis;
  updateForm[2].innerHTML = tempDescBuku;
  updateForm[3].innerHTML = tempStockBuku;
  const actionbtn = `
  <button id='${btnEditDataId}' class='btn btn-primary' onclick='editDataBookHandler(${idBook})'>Edit</button>
  <button id='${btnDeleteDataId}' class='btn btn-danger' onclick='deleteDataBukuHandler(${idBook})'>Delete</button>
  `;
  updateForm[4].innerHTML = actionbtn;
}

function editDataBookHandler(idBook) {
  const idRowDataBuku = document.getElementById(idBook);
  const updateForm = idRowDataBuku.querySelectorAll('.data-handler');
  const tempNamaBuku = updateForm[0].innerHTML;
  const tempNamaPenulis = updateForm[1].innerHTML;
  const tempDescBuku = updateForm[2].innerHTML;
  const tempStockBuku = updateForm[3].innerHTML;
  updateForm[0].innerHTML = `<input id="new-nama-buku" type="text" required value='${tempNamaBuku}' />`;
  updateForm[1].innerHTML = `<input id="new-nama-penulis" type="text" required value='${tempNamaPenulis}' />`;
  updateForm[2].innerHTML = `<input id="new-deskripsi-buku" type="text" value='${tempDescBuku}' />`;
  updateForm[3].innerHTML = `<input id="new-stock-buku" type="text" required value='${tempStockBuku}' />`;
  updateForm[4].innerHTML = `
  <button class='btn btn-primary' onclick='updateDataBukuHandler(${idBook})'>Simpan</button>
  <button class='btn btn-danger' onclick='deleteDataBukuHandler(${idBook})'>Hapus</button>
  <button class='btn btn-warning' onclick='cancelEditingDataBuku(${idBook})'>Batal</button>
  `;
}

function updateDataBukuHandler(idBuku) {
  const idRowDataBuku = document.getElementById(idBuku);
  const updateForm = idRowDataBuku.querySelectorAll('.data-handler');
  const namaBuku = updateForm[0].querySelector('#new-nama-buku').value;
  const namaPenulis = updateForm[1].querySelector('#new-nama-penulis').value;
  const descBuku = updateForm[2].querySelector('#new-deskripsi-buku').value;
  const stockBuku = updateForm[3].querySelector('#new-stock-buku').value;
  const tempDataObject = {
    id: idBuku,
    namaBuku: namaBuku,
    namaPenulis: namaPenulis,
    descBuku: descBuku,
    stockBuku: stockBuku,
  };
  updateDataToLocalStorage(tempDataObject);
}

function updateDataToLocalStorage(objectData) {
  const dataBuku = JSON.parse(localStorage.getItem('dataBuku'));
  const tempUpdateBuku = dataBuku.filter((list) => list.id == objectData.id);
  tempUpdateBuku.id = objectData.id;
  tempUpdateBuku.namaBuku = objectData.namaBuku;
  tempUpdateBuku.namaPenulis = objectData.namaPenulis;
  tempUpdateBuku.descBuku = objectData.descBuku;
  tempUpdateBuku.stockBuku = objectData.stockBuku;
  localStorage.setItem('dataBuku', JSON.stringify(dataBuku));
  console.log(dataBuku)
  readDataFromLocalStorage();
}

function deleteDataBukuHandler(idBuku) {
  const doYouSure = prompt('Silahkan ketik Ya, untuk memvalidasi');
  const isCommit = doYouSure.toLocaleLowerCase() !== 'ya' ? false : true;
  if (isCommit) {
    deleteDataToLocalStorage(idBuku);
  }
}

function deleteDataToLocalStorage(idBuku) {
  const dataBuku = JSON.parse(localStorage.getItem('dataBuku'));
  const isNull = dataBuku != null ? false : true;
  if (!isNull) {
    dataBuku.splice(
      dataBuku.findIndex((list) => list.id === idBuku),
      1
    );
    localStorage.setItem('dataBuku', JSON.stringify(dataBuku));
  }
  readDataFromLocalStorage();
}

function forceDeleteAllData() {
  const doYouSure = prompt('Apakah anda ingin menghapus semua data? Silahkan ketik Ya, untuk memvalidasi');
  const isCommit = doYouSure.toLocaleLowerCase() !== 'ya' ? false : true;
  if (isCommit) {
    localStorage.clear();
    readDataFromLocalStorage();
  }
}
