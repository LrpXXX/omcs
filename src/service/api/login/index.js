import http from "@/service/http";

const loginApi = {
  login(data) {
    return http
      .post("/manage-service/admin/login", data)
      .then((res) => res)
      .catch((e) => e);
  },
};

export default loginApi;
