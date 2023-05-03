<template>
    <Navbar></Navbar>
    <div
    class="container"
    style="background-color: white; border-radius: 10px; margin-top: 10px"
  >
    <h2 style="padding: 10px 10px">Sales</h2>
    <div class="d-flex align-content-end justify-content-end">
        <button
        type="button"
        class="btn btn-primary tombolTambahData"
        data-bs-toggle="modal"
        data-bs-target="#formModal"
      >
        Tambah Data
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Kode Transaksi</th>
            <th scope="col">Tanggal Transaksi</th>
            <th scope="col">Customer</th>
            <th scope="col">Item</th>
            <th scope="col">total diskon</th>
            <th scope="col">total harga</th>
            <th scope="col">total bayar</th>
            <th scope="col">aksi</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
  <div
    class="modal fade"
    id="formModal"
    tabindex="-1"
    aria-labelledby="judulModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="judulModal">
            Tambah Data Item
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form action="<?= BASEURL; ?>/mahasiswa/tambah" method="post">
            <input type="hidden" name="id" id="id" />
            <div class="mb-3">
              <label for="nama" class="form-label">Nama Item</label>
              <input type="text" class="form-control" id="nama" name="nama" />
            </div>
            <div class="mb-3">
            <label for="unit" class="form-label">Unit</label>
            <select class="form-control" id="unit">
              <option value="kg">kg</option>
              <option value="pcs">pcs</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="stok" class="form-label">Stok</label>
            <input type="number" class="form-control" id="stok">
          </div>
          <div class="mb-3">
            <label for="harga" class="form-label">Harga Satuan</label>
            <input type="number" class="form-control" id="harga">
          </div>
          <div class="mb-3">
            <label for="barang" class="form-label">Foto Barang</label>
            <input type="file" class="form-control" id="barang">
          </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Tambah Data</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Navbar from "@/components/Navbar.vue";
  
  export default {
    name: "Sales",
    components: {
      Navbar,
    },
  };
  </script>
  
  <style>
  </style>