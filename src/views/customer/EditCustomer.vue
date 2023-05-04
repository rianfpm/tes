<template>
  <Navbar></Navbar>
  <div
    class="container"
    style="background-color: white; border-radius: 10px; margin-top: 10px"
  >
    <h2 style="padding: 10px 10px">Edit Customer</h2>

    <div class="container">
      <form @submit.prevent="updateData">
        <input type="hidden" name="id" id="id" v-model="customer.customer_id" />
        <div class="mb-3">
          <label for="nama" class="form-label">Nama</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            v-model="customer.name"
          />
        </div>
        <div class="mb-3">
          <label for="contact" class="form-label">Contact</label>
          <input
            type="text"
            class="form-control"
            id="contact"
            name="contact"
            v-model="customer.contact"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            v-model="customer.email"
          />
        </div>
        <div class="mb-3">
          <label for="alamat" class="form-label">Alamat</label>
          <textarea
            class="form-control"
            id="alamat"
            name="alamat"
            rows="3"
            v-model="customer.alamat"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="diskon" class="form-label">Diskon</label>
          <input
            type="number"
            class="form-control"
            id="diskon"
            name="diskon"
            v-model="customer.diskon"
          />
        </div>
        <div class="mb-3">
          <label for="type_diskon" class="form-label">Tipe Diskon</label>
          <select
            class="form-control"
            id="tipe_diskon"
            name="tipe_diskon"
            v-model="customer.tipe_diskon"
          >
            <option value="persentase">Percent</option>
            <option value="fix">Fix</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="ktp" class="form-label">KTP</label>
          <input type="file" class="form-control" id="ktp" name="ktp" @change="onFileChange"/>
        </div>
        <button type="submit" class="btn btn-primary">Simpan</button>
      </form>

      <router-link to="/customer" class="btn btn-secondary me-1"
        >back</router-link
      >
      <router-link to="/" class="btn btn-primary" >update</router-link>
    </div>
  </div>
</template>
  
<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "EditCustomer",
  components: {
    Navbar,
  },
  data() {
    return {
      id: this.$route.params.id,
      customer: {
        name: "",
        contact: "",
        email: "",
        alamat: "",
        diskon: "",
        tipe_diskon: "",
        ktp: {
          update: false,
          image: ''
        },
      },
      file: null
    };
  },
  methods: {
    onFileChange(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.customer.ktp.update = true;
      this.customer.ktp.image = reader.result;
    };
  },
  updateData() {
    axios.put(`http://localhost:3002/customer`, this.customer)
      .then(response => {
        alert(response.data.message);
        this.$router.push({ name: 'Customer' });
      })
      .catch(error => {
        alert(error.response.data.message)
      });
  },
  fecthdata(){
    const id = this.$route.params.id;
    axios.get(`http://localhost:3002/customer/${id}`).then(response => {
      this.customer = response.data;
      console.log(response.data);
      this.customer.ktp = {
        update: false,
        image: response.data.ktp
      };
    });
  }
  },
  mounted() {
    this.fecthdata();
  },
  
  
};
</script>
  
<style>
</style>