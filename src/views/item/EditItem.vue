<template>
  <Navbar></Navbar>
  <div
    class="container"
    style="background-color: white; border-radius: 10px; margin-top: 10px"
  >
    <h2 style="padding: 10px 10px">Edit Item</h2>

    <div class="container">
      <form @submit.prevent="updateData" >
        <input type="hidden" name="id" id="id" v-model="item.item_id" />
        <div class="mb-3">
          <label for="nama" class="form-label">Nama Item</label>
          <input type="text" class="form-control" id="nama" name="nama" v-model="item.name"/>
        </div>
        <div class="mb-3">
          <label for="unit" class="form-label">Unit</label>
          <select class="form-control" id="unit" v-model="item.unit">
            <option value="kg">kg</option>
            <option value="pcs">pcs</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="stok" class="form-label">Stok</label>
          <input type="number" class="form-control" id="stok" v-model="item.stok"/>
        </div>
        <div class="mb-3">
          <label for="harga" class="form-label">Harga Satuan</label>
          <input type="number" class="form-control" id="harga" v-model="item.harga_satuan"/>
        </div>
        <div class="mb-3">
          <label for="barang" class="form-label">Foto Barang</label>
          <input type="file" class="form-control" id="barang" @change="onFileChange"/>
        </div>
        <button type="submit" class="btn btn-primary">Simpan</button>
      </form>
      <router-link to="/item" class="btn btn-secondary me-1">back</router-link>
      <router-link to="/" class="btn btn-primary">update</router-link>
    </div>
  </div>
</template>
    
  <script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "EditItem",
  components: {
    Navbar,
  },
  data() {
    return {
      id: this.$route.params.id,
      item: {
        name: "",
        unit: "",
        stok: "",
        harga_satuan: "",
        barang: {
          update: false,
          image: "",
        },
      },
      file: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.item.barang.update = true;
        this.item.barang.image = reader.result;
      };
    },
    updateData() {
      axios
        .put(`http://localhost:3002/item`, this.item)
        .then((response) => {
          alert(response.data.message);
          this.$router.push({ name: "Item" });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    fecthdata() {
      const id = this.$route.params.id;
      axios.get(`http://localhost:3002/item/${id}`).then((response) => {
        this.item = response.data;
        console.log(response.data);
        this.item.barang = {
          update: false,
          image: response.data.barang,
        };
      });
    },
  },
  mounted() {
    this.fecthdata();
  },
};
</script>
    
    <style>
</style>