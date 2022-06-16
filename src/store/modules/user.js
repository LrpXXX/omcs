/*
 * @Desc: user module
 * @Author: jqw
 * @Date: 2022-06-15 17:29:05
 */

const user = {
  state: {
    // 用户信息
    userInfo: {},
    // 权限数组
    roles: [],
  },
  getters: {
    userInfo: (state) => state.userInfo,
    roles: (state) => state.roles,
  },
  mutations: {
    // 同步更改用户信息state
    SETUSERINFO(state, data) {
      state.userInfo = data;
    },

    SETROLE: (state, roles) => {
      if (Array.isArray(roles)) {
        state.roles = roles;
      } else {
        throw new Error("roles 必须为数组");
      }
    },
  },
  actions: {},
};

export default user;
