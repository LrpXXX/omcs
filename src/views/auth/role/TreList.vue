<template>
  <div>
    <el-tree :data="data" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps"></el-tree>
  </div>
</template>

<script>
export default {
    // props:['data'],
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: "二级 2-1",
        },
        {
          id: 9,
          label: "三级 1-1-1",
        },
      ]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
  },

  data() {
    return {
      data: [
        {
          id: '1',
          label: "场地管理系统",
          children: [
            {
              id: '1-1',
              label: "场地预约"
            },
            {
              id: '1-2',
              label: "人员管理"
            },
            {
              id: '1-3',
              label: "场地管理"
            },
            {
              id: '1-4',
              label: "道路管理"
            },
          ],
        },
        {
          id: 2,
          label: "场地预约",
          children: [
            {
              id: 5,
              label: "预约管理",
            },
            {
              id: 6,
              label: "人员管理",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
};
</script>
