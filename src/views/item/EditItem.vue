<template>
    <Navbar></Navbar>
    <div
      class="container"
      style="background-color: white; border-radius: 10px; margin-top: 10px"
    >
      <h2 style="padding: 10px 10px">Edit Customer</h2>
  
      <div class="container">
        <form method="post">
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
        </form>
        <router-link to="/item" class="btn btn-secondary me-1">back</router-link>
        <router-link to="/" class="btn btn-primary">update</router-link>
      </div>
    </div>
  </template>
    
  <script>
  // @ is an alias to /src
  import Navbar from "@/components/Navbar.vue";
  
  export default {
    name: "EditItem",
    components: {
      Navbar,
    },
  };
  </script>
    
    <style>
  </style>