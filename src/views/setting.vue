<template>
  <div class="app-container">
    <el-tag type="info" effect="dark">C1官方报名价格：</el-tag>
    <el-divider direction="vertical"></el-divider>
    <el-tag type="success" effect="dark">￥{{ price1 }}</el-tag>
    <el-divider direction="vertical"></el-divider>
    <el-input-number
      v-model="updatePrice1"
      :step="100"
      :precision="2"
      :min="0"
    ></el-input-number>
    <el-divider direction="vertical"></el-divider>
    <template>
      <el-popconfirm
        title="确定要修改官方报名价格吗?"
        @onConfirm="toUpdatePrice(1)"
      >
        <el-button slot="reference" type="primary">确认修改</el-button>
      </el-popconfirm>
    </template>
    <el-divider></el-divider>
    <el-tag type="info" effect="dark">C2官方报名价格：</el-tag>
    <el-divider direction="vertical"></el-divider>
    <el-tag type="success" effect="dark">￥{{ price2 }}</el-tag>
    <el-divider direction="vertical"></el-divider>
    <el-input-number
      v-model="updatePrice2"
      :step="100"
      :precision="2"
      :min="0"
    ></el-input-number>
    <el-divider direction="vertical"></el-divider>
    <template>
      <el-popconfirm
        title="确定要修改官方报名价格吗?"
        @onConfirm="toUpdatePrice(2)"
      >
        <el-button slot="reference" type="primary">确认修改</el-button>
      </el-popconfirm>
    </template>
  </div>
</template>

<script>
const {baseurl} = require('../utils/request')
export default {
  data() {
    return {
      price1:0.00,
      price2:0.00,
      updatePrice1: 0.00,
      updatePrice2: 0.00,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      this.axios
        .post(baseurl+"/price/selectPrice")
        .then((res) => {
          console.log(res);
          that.price1 = res.data[0].price;
          that.price2 =res.data[1].price;
          that.updatePrice1 = that.price1;
          that.updatePrice2 = that.price2;
        });
    },
    toUpdatePrice(id) {
      let updatePrice=id==1?this.updatePrice1:this.updatePrice2;
      let that = this;
      this.axios
        .post(
          baseurl+"/price/updatePrice?price=" + updatePrice+"&id="+id
        )
        .then((res) => {
          that.getData();
          this.$message.success("修改成功!");
        });
    },
  },
};
</script>
<style scoped>
</style>
