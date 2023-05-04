<template>
  <Navbar></Navbar>
  <div
    class="container"
    style="background-color: white; border-radius: 10px; margin-top: 10px"
  >
    <h2 style="padding: 10px 10px">Item</h2>
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
            <th scope="col">Nama Item</th>
            <th scope="col">Unit</th>
            <th scope="col">Stok</th>
            <th scope="col">Harga Satuan</th>
            <th scope="col">Barang</th>
            <th scope="col">aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in item" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ data.name }}</td>
            <td>{{ data.unit }}</td>
            <td>{{ data.stok }}</td>
            <td>{{ data.harga_satuan }}</td>
            <td>{{ data.barang }}</td>
            <td>
              <router-link :to="{name: 'EditItem', params: {id: data.item_id}}">Edit</router-link> |
              <a href="#" @click="deleteItem(data.item_id, index)">Hapus</a>
            </td>
          </tr>
        </tbody>
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
          <form @submit.prevent="submitForm">
            <input type="hidden" name="id" id="id" />
            <div class="mb-3">
              <label for="nama" class="form-label">Nama Item</label>
              <input type="text" class="form-control" id="nama" name="nama" v-model="formData.name"/>
            </div>
            <div class="mb-3">
            <label for="unit" class="form-label">Unit</label>
            <select class="form-control" id="unit" name="unit" v-model="formData.unit">
              <option value="kg">kg</option>
              <option value="pcs">pcs</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="stok" class="form-label">Stok</label>
            <input type="number" class="form-control" id="stok" name="stok" v-model="formData.stok">
          </div>
          <div class="mb-3">
            <label for="harga" class="form-label">Harga Satuan</label>
            <input type="number" class="form-control" id="harga" name="harga" v-model="formData.harga_satuan">
          </div>
          <div class="mb-3">
            <label for="barang" class="form-label">Foto Barang</label>
            <input type="file" class="form-control" id="barang" name="barang" @change="encodeImage">
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
import axios from "axios";

export default {
  name: "Item",
  components: {
    Navbar,
  },
  data() {
    return {
      item: [],
      formData: {
        name: "",
        unit: "",
        stok: "",
        harga_satuan: "",
        barang: "",
      },
    };
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:3002/item")
        .then((response) => {
          this.item = response.data;
          console.log(this.item);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      // Mengirim data form ke backend
      axios
        .post("http://localhost:3002/item", this.formData)
        .then((response) => {
          alert(response.data.message);
          this.fetchData();
          this.resetForm();
          this.closeModal();
          this.$emit("close-modal");
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    encodeImage(event) {
      // Mengonversi file KTP menjadi base64
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.formData.barang = reader.result;
      };
      reader.readAsDataURL(file);
    },
    closeModal() {
      $("#formModal").modal("hide");
      this.$emit("close-modal");
    },
    resetForm() {
      this.formData = {
        name: "",
        unit: "",
        stok: "",
        harga_satuan: "",
        barang: "",
      };
    },
    deleteItem(id, index) {
      // console.log(id);
      axios.delete(`http://localhost:3002/item/${id}`)
        .then((response) => {
          // menghapus data dari daftar customer setelah berhasil dihapus dari server
          // this.customer.splice(index, 1);
          this.fetchData();
          alert(response.data.message);
        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data.message);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
