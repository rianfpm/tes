<template>
  <Navbar></Navbar>
  <div
    class="container"
    style="background-color: white; border-radius: 10px; margin-top: 10px"
  >
    <h2 style="padding: 10px 10px">Detail Sales</h2>

    <div class="container">
      <form method="post">
        <input type="hidden" name="id" id="id" />
        <div class="mb-3">
          <label for="nama" class="form-label">Kode Transaksi</label>
          <input
            type="text"
            class="form-control"
            id="nama"
            name="nama"
            disabled
          />
        </div>
        <div class="mb-3">
          <label for="unit" class="form-label">Tanggal Transaksi</label>
          <input
            type="text"
            class="form-control"
            id="tgl_tran"
            name="tgl_tran"
          />
        </div>
        <div class="mb-3">
          <label for="stok" class="form-label">Customer</label>
          <input type="number" class="form-control" id="stok" disabled/>
        </div>
        <div class="mb-3">
          <label for="harga" class="form-label">Barang</label>
          <input type="number" class="form-control" id="harga" disabled/>
        </div>
        <div class="mb-3">
          <label for="harga" class="form-label">Item</label>
          <input type="number" class="form-control" id="item" disabled/>
        </div>
        <div class="mb-3">
          <label for="harga" class="form-label">Total diskon</label>
          <input type="number" class="form-control" id="item" disabled/>
        </div>
        <div class="mb-3">
          <label for="harga" class="form-label">Total Harga</label>
          <input type="number" class="form-control" id="item" disabled/>
        </div>
        <div class="mb-3">
          <label for="harga" class="form-label">Total Bayar</label>
          <input type="number" class="form-control" id="item" disabled/>
        </div>
        <div class="mb-3">
          <label for="barang" class="form-label">Foto Barang</label>
          <input type="file" class="form-control" id="barang" />
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
  name: "DetailSales",
  components: {
    Navbar,
  },
  data() {
    return {
      customers: [],
      sales: [],
      item: [{ item_id: "", qty: 1 }],
      itemOptions: [],
      selectedCustomer: "",
      selectedItems: [{ item_id: "", qty: 1 }],
    };
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:3002/sales")
        .then((response) => {
          this.sales = response.data.data;
          console.log(this.sales);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
    
    <style>
</style>