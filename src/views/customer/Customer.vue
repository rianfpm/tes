<template>
  <Navbar></Navbar>
  <div
    class="container"
    style="background-color: white; border-radius: 10px; margin-top: 10px"
  >
    <h2 style="padding: 10px 10px">Customer</h2>
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
            <th scope="col">Nama</th>
            <th scope="col">Kontak</th>
            <th scope="col">Email</th>
            <th scope="col">Alamat</th>
            <th scope="col">Diskon</th>
            <th scope="col">Tipe Diskon</th>
            <th scope="col">KTP</th>
            <th scope="col">aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in customer" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ data.name }}</td>
            <td>{{ data.contact }}</td>
            <td>{{ data.email }}</td>
            <td>{{ data.alamat }}</td>
            <td>{{ data.diskon }}</td>
            <td>{{ data.tipe_diskon }}</td>
            <td>{{ data.ktp }}</td>
            <td>
              <router-link :to="{name: 'EditCustomer', params: {id: data.customer_id}}">Edit</router-link> |
              <a href="#" @click="deleteCustomer(data.customer_id, index)">Hapus</a>
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
          <h1 class="modal-title fs-5" id="judulModal">Tambah Data Customer</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <input type="hidden" name="id" id="id" />
            <div class="mb-3">
              <label for="nama" class="form-label">Nama</label>
              <input type="text" class="form-control" v-model="formData.name" />
            </div>
            <div class="mb-3">
              <label for="contact" class="form-label">Contact</label>
              <input
                type="text"
                class="form-control"
                v-model="formData.contact"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="formData.email"
              />
            </div>
            <div class="mb-3">
              <label for="alamat" class="form-label">Alamat</label>
              <textarea
                class="form-control"
                v-model="formData.alamat"
                rows="3"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="diskon" class="form-label">Diskon</label>
              <input
                type="number"
                class="form-control"
                v-model="formData.diskon"
              />
            </div>
            <div class="mb-3">
              <label for="type_diskon" class="form-label">Tipe Diskon</label>
              <select class="form-control" v-model="formData.tipe_diskon">
                <option value="persentase">Percent</option>
                <option value="fix">Fix</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="ktp" class="form-label">KTP</label>
              <input type="file" class="form-control" @change="encodeImage" />
            </div>

            <div class="modal-footer">
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
  name: "Customer",
  components: {
    Navbar,
  },
  data() {
    return {
      customer: [],
      formData: {
        name: "",
        contact: "",
        email: "",
        alamat: "",
        diskon: "",
        tipe_diskon: "",
        ktp: "",
      },
    };
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:3002/customer")
        .then((response) => {
          this.customer = response.data;
          console.log(this.customer);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      // Mengirim data form ke backend
      axios
        .post("http://localhost:3002/customer", this.formData)
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
        this.formData.ktp = reader.result;
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
        contact: "",
        email: "",
        alamat: "",
        diskon: "",
        tipe_diskon: "",
        ktp: "",
      };
    },
    deleteCustomer(id, index) {
      // console.log(id);
      axios.delete(`http://localhost:3002/customer/${id}`)
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

<style>
</style>