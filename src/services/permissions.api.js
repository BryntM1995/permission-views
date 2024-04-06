import axios from "axios";

axios.defaults.baseURL = `${process.env.VUE_APP_BASE_API}/api`;

const PERMISSION_CONTROLLER = "Permission";
const PERMISSIONTYPE_CONTROLLER = "PermissionType";

const service = {
  getTypes: async () => {
    const response = await axios.get(PERMISSIONTYPE_CONTROLLER);
    return response.data;
  },
  get: async () => {
    const response = await axios.get(PERMISSION_CONTROLLER);
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${PERMISSION_CONTROLLER}/${id}`);
    return response.data;
  },
  remove: async (id) => {
    const response = await axios.delete(`${PERMISSION_CONTROLLER}/${id}`);
    return response;
  },
  add: async (payload) => {
    const response = await axios.post(PERMISSION_CONTROLLER, payload);
    return response.data;
  },
  update: async (payload) => {
    const response = await axios.put(
      `${PERMISSION_CONTROLLER}/${payload.id}`,
      payload
    );
    return response;
  },
};

export default service;
