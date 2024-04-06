<template>
  <div>
    <div class="d-flex align-items-center justify-content-center my-5 pt-5 ">
      <div class="w-25 mt-5 card">
        <div class="card-header">
          <div class="fs-1 text-center">{{ actionTitle }}</div>
        </div>
        <div class="p-5">
          <validation-observer ref="validator">
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <validation-provider rules="required" v-slot="{ errors }">
                <input v-model="model.employeeFirstName" class="form-control" :class="{ 'is-invalid': errors[0] }">
                <span class="invalid-feedback mt-2">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="mb-3">
              <label class="form-label">Apelido</label>
              <validation-provider rules="required" v-slot="{ errors }">
                <input v-model="model.employeeLastName" class="form-control" :class="{ 'is-invalid': errors[0] }">
                <span class="invalid-feedback mt-2">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="mb-3">
              <label class="form-label">Fecha de Permiso</label>
              <validation-provider rules="required" v-slot="{ errors }">
                <input v-model="model.permissionDate" type="date" class="form-control"
                  :class="{ 'is-invalid': errors[0] }">
                <span class="invalid-feedback mt-2">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="mb-3">
              <label class="form-label">Tipo de Permiso</label>
              <validation-provider rules="required" v-slot="{ errors }">
                <select v-model="model.permissionType" class="form-select" :class="{ 'is-invalid': errors[0] }">
                  <option selected :value="undefined">Seleccionar</option>
                  <option v-for="(permissionType, index) in permissionTypes" :key="index" :value="permissionType">{{
                    permissionType.description }}</option>
                </select>
                <span class="invalid-feedback mt-2">{{ errors[0] }}</span>
              </validation-provider>

            </div>
          </validation-observer>
          <div v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            </div>
          </div>
          <div v-else class="d-flex justify-content-center gap-3">
            <button type="submit" class="btn btn-danger mt-3" @click="cancel">Cancelar</button>
            <button type="submit" class="btn btn-primary mt-3" @click="save">Guardar</button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>

import service from "@/services/permissions.api"
import moment from "moment"
import Swal from 'sweetalert2'

export default {
  name: 'PermissionView',
  components: {
  },
  data() {
    return {
      loading: false,
      permissionTypes: [],
      model: {
        id: null,
        employeeFirstName: null,
        employeeLastName: null,
        permissionDate: null,
        permissionType: undefined
      },
    }
  },
  computed: {
    hasId() {
      return Boolean(this.$route.params.id)
    },
    actionTitle() {
      return this.hasId ? "Editar Permiso" : "Agregar Permiso"
    }
  },
  async mounted() {
    await this.getPermissionTypes();
    if (this.hasId) {
      await this.getPermission();
    }
  },
  methods: {
    async getPermissionTypes() {
      this.permissionTypes = await service.getTypes();
    },
    async getPermission() {
      const data = await service.getById(this.$route.params.id);
      this.model.id = data.id;
      this.model.employeeFirstName = data.employeeFirstName;
      this.model.employeeLastName = data.employeeLastName;
      this.model.permissionDate = moment(new Date(data.permissionDate)).format("yyyy-MM-DD");
      this.model.permissionType = {
        id: data.permissionTypeId,
        description: data.permissionTypeName
      };
    },
    cancel() {
      this.$router.push({ name: 'Home' })
    },
    async save() {
      const valid = await this.$refs['validator'].validate();
      if (!valid)
        return;

      const payload = {
        id: this.hasId ? this.$route.params.id : 0,
        employeeFirstName: this.model.employeeFirstName,
        employeeLastName: this.model.employeeLastName,
        permissionDate: moment(this.model.permissionDate).format(),
        permissionTypeId: this.model.permissionType.id
      }
      try {
        this.loading = true;
        if (this.hasId) {
          await service.update(payload)
        } else {
          await service.add(payload)
        }
        this.$router.push({ name: 'Home' })
        Swal.fire("Operación exitosa!");
      } catch {
        Swal.fire("Error al intentar guardar el registro!");
      } finally {
        this.loading = false;
      }
    },
  }
}
</script>