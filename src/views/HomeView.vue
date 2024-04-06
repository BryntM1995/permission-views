<template>
  <div class="container mt-5">
    <div class="card-header border">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <p class="fs-1">Lista de permisos</p>
        </div>
        <div>
          <button type="button" class="btn btn-success" @click="add">Agregar</button>
        </div>
      </div>
    </div>
    <table class="table border border-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Razon del permiso</th>
          <th scope="col">Fecha</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(permission, index) in permissions" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ permission.employeeFirstName }}</td>
          <td>{{ permission.employeeLastName }}</td>
          <td>{{ permission.permissionTypeName }}</td>
          <td>{{ permission.permissionDate | date }}</td>
          <td>
            <div class="d-flex gap-1 justify-content-center">
              <button type="button" class="btn btn-warning" @click="edit(permission.id)">Editar</button>
              <button type="button" class="btn btn-danger" @click="remove(permission.id)">Eliminar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import moment from 'moment'
import service from "@/services/permissions.api"
export default {
  name: 'HomeView',
  filters: {
    date(value) {
      return moment(value).format("DD/MM/yyyy")
    }
  },
  data() {
    return {
      permissions: [],
    }
  },
  async mounted() {
    await this.getAll();

  },
  methods: {
    async getAll() {
      this.permissions = await service.get();
    },
    add() {
      this.$router.push({ name: 'permission' })
    },
    edit(id) {
      this.$router.push({ name: 'permission', params: { id } })
    },
    async remove(id) {
      const { isConfirmed } = await Swal.fire({
        text: "¿Esta seguro que desea borrar este permiso?",
        title: "Confirmación",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si",
        confirmButtonColor: "#dc3545",
        cancelButtonText: "No"
      });
      if (!isConfirmed)
        return;

      try {
        await service.remove(id);
        Swal.fire("Operación exitosa!");
        await this.getAll();
      } catch {
        Swal.fire("Error al intentar borrar el registro!");
      }
    }
  }
}
</script>
