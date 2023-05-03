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
          <tr>
            <th>1</th>
            <td>Rian</td>
            <td>0812808080</td>
            <td>rian@gmail.com</td>
            <td>Palayu Raya</td>
            <td>1</td>
            <td>fix</td>
            <td>foto</td>
            <td>
              <router-link to="/customer-edit">Edit</router-link> |
              <a href="#">Hapus</a>
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
          <h1 class="modal-title fs-5" id="judulModal">Tambah Data Item</h1>
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
              <label for="nama" class="form-label">Nama</label>
              <input type="text" class="form-control" id="nama" />
            </div>
            <div class="mb-3">
              <label for="contact" class="form-label">Contact</label>
              <input type="text" class="form-control" id="contact" />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" />
            </div>
            <div class="mb-3">
              <label for="alamat" class="form-label">Alamat</label>
              <textarea class="form-control" id="alamat" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label for="diskon" class="form-label">Diskon</label>
              <input type="number" class="form-control" id="diskon" />
            </div>
            <div class="mb-3">
              <label for="type_diskon" class="form-label">Tipe Diskon</label>
              <select class="form-control" id="type_diskon">
                <option value="persentase">Percent</option>
                <option value="fix">Fix</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="ktp" class="form-label">KTP</label>
              <input type="file" class="form-control" id="ktp" />
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
  name: "Customer",
  components: {
    Navbar,
  },
  data() {
    return {
      customer: [],
    };
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:3002/")
        .then((response) => {
          console.log("asodkaosdaosdads");
          this.customer = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>