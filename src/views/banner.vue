<template>
  <div class="app-container">

   <el-table
    :data="banners"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="bid"
      label="编号"
      width="150"
      >
    </el-table-column>
    <el-table-column
      prop=""
      label="图片"
      >
    <template slot-scope="scope">
      <img :src="scope.row.bannerUrl"alt="" class="banner"></img>
    </template>
   </el-table-column>
   
     <el-table-column label="显示">
      <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isShow"
            :active-value="1"
            :inactive-value="0"
            @change="switchChange($event, scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
      </template>
    </el-table-column>


    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-popconfirm title="确定要删除吗？" @onConfirm="handleDelete(scope.$index, scope.row)"
        @onCancel="cancel()"
        >
           <el-button
           size="mini"
           type="danger"
           slot="reference"
           >删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>

  </el-table>
<p class="p1">上传首页广告图片</p>

    <el-upload
      :action="uploadUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      class="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
           <el-button
           type="primary"
           @click="confirmUpLoad()"
           >确认上传</el-button>
  </div>
</template>

<script>
const { baseurl } = require("../utils/request");

export default {
  // 广告管理页
  created() {
    this.reload();
  },
  data() {
    return {
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
      dialogImageUrl: "",
      dialogVisible: false,
      banners: [],
      value: true,
      uploadUrl: baseurl + "/fileUpload",
    };
  },
  methods: {
    // 刷新页面重新加载数据用
    reload() {
      let that = this;
      this.axios.post(baseurl + "/banner/getAllBanner").then((res) => {
        that.banners = res.data;
        console.log(that.banners);
      });
    },

    //表格操作
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.axios
        .post(baseurl + "/banner/deleteBanner?bid=" + row.bid)
        .then((res) => {
          console.log(res);
          if (res.data == 1) {
            this.$message.success("删除成功!");
            this.reload();
          } else {
            this.$message.error("删除失败!");
          }
        });
    },
    cancel() {
      console.log("取消了");
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    switchChange(e, row) {
      console.log(e);
      console.log(row.bid);
      if (e == 1) {
        this.axios
          .post(baseurl + "/banner/onBanner?bid=" + row.bid)
          .then((res) => {
            this.$message.success("打开成功!");
          });
        //启用
      } else if (e == 0) {
        //不启用
        this.axios
          .post(baseurl + "/banner/offBanner?bid=" + row.bid)
          .then((res) => {
            this.$message.success("关闭成功!");
          });
      }
    },
    // 文件上传的
    handleRemove(file, fileList) {
      this.axios
        .post(baseurl + "/banner/deleteBanner?bid=" + file.response)
        .then((res) => {
          console.log(res);
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(dialogImageUrl);
      this.dialogVisible = true;
    },
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    // 确认上传
    confirmUpLoad() {
      this.reload(); //刷新数据
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
.banner {
  height: 100px;
}

.p1 {
  text-align: center;
  /* margin: 0 auto; */
  font-size: 26px;
}
</style>

