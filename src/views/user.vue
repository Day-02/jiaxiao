<template>
  <div class="app-container">

        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
          @keyup.enter.native="search2()"
          class="search"
          />

    <el-table
    :data="users"
    style="width: 100%"  
    >
    <el-table-column
      label="id"
      sortable
      prop="uId">
    </el-table-column>

    <el-table-column
      label="微信昵称"
      prop="nickName">
    </el-table-column>

    <el-table-column
      prop=""
      label="头像"
      >
    <template slot-scope="scope">
      <img :src="scope.row.avatarUrl" slot=""alt="" class="avatar"></img>
    </template>
   </el-table-column>

     <el-table-column
      label="省份"
      prop="province">
    </el-table-column>

     <el-table-column
      label="城市"
      prop="city">
    </el-table-column>

      <el-table-column
      label="是否报名"
      sortable
      prop="isRegister">
    </el-table-column>

       <el-table-column
      label="是否代理"
      sortable
      prop="role">
    </el-table-column>


    <el-table-column
      align="center" label="添加为代理">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">添加</el-button>
        <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
      </template>
    </el-table-column>

  </el-table>

     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagination"
      >
    </el-pagination>

   <el-dialog
      title="代理人添加"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :before-close="handleClose"
    > 

   <el-form label-width="20%">
       <el-form-item label="用户id">
          <el-input v-model="edit.user.uId" :disabled="true"></el-input>
        </el-form-item>
           <el-form-item label="用户昵称">
          <el-input  v-model="edit.user.nickName" :disabled="true"></el-input>

        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="edit.proxy.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="edit.proxy.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="edit.proxy.des"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="edit.proxy.address"></el-input>
        </el-form-item>
        <el-form-item label="底价">
          <el-input v-model="edit.proxy.basePrice"></el-input>
        </el-form-item>
      </el-form>

     <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="addProxy">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
const { baseurl } = require("../utils/request");

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      users: [],
      search: "",
      pageSize: 10,
      total: 100,
      currentPage: 1,
      dialogVisible: false,
      dialogWidth: "30%",
      edit: {
        user: {},
        proxy: {},
      },
    };
  },
  created() {
    this.reload();
  },
  methods: {
    reload() {
      let that = this;
      this.listLoading = true;
      this.axios
        .post(
          baseurl +
            "/user/selectAllByCondition?keywords=" +
            this.search +
            "&pageNum=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          // console.log(res.data);
          that.users = res.data;
        });
      this.axios.post(baseurl + "/user/selectCount").then((res) => {
        console.log(baseurl + "/user/selectCount");
        that.total = res.data;
      });
      this.setDialogWidth();
    },

    handleEdit(index, row) {
      if (row.role == 1) {
        this.$message.error("该用户已经是代理人了!");
      } else {
        this.dialogVisible = true;
        console.log(index, row);
        this.edit.user = row;
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.reload();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.reload();
    },
    // 搜索功能
    search2() {
      let that = this;
      this.axios
        .post(
          baseurl +
            "/user/selectAllByCondition?keywords=" +
            this.search +
            "&pageNum=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          that.users = res.data;
        });
    },
    // 弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.reload();
        })
        .catch((_) => {});
    },
    cancle() {
      this.dialogVisible = false;
      this.reload();
    },
    //添加代理人
    addProxy() {
      let that = this;
      // this.$message.error("该功能开发中！");
      that.edit.proxy.uId = that.edit.user.uId;
      that.edit.proxy.openid = that.edit.user.openid;
      console.log(that.edit.proxy);
      that.axios.post(baseurl + "/proxy/add", this.edit.proxy).then((res) => {
        that.$message.success("添加成功");
        that.dialogVisible = false;
        that.reload();
      });

      // this.axios({
      //     method:"post",
      //     url: baseurl + "/proxy/add",
      //     data:{
      //       // uId:that.edit.user.uid,
      //       proxy:that.edit.proxy
      //     }
      //   })
      //   .then((res) => {
      //     this.$message.success("修改成功!");
      //   });
    },
    setDialogWidth() {
      console.log(document.body.clientWidth);
      var val = document.body.clientWidth;
      const def = 850; // 默认宽度
      if (val < def && val > 500) {
        this.dialogWidth = "60%";
      } else if (val < 500) {
        this.dialogWidth = "95%";
      } else {
        this.dialogWidth = "30%";
      }
    }
  }
};
</script>
<style scoped>
.avatar {
  height: 50px;
}
.pagination {
  display: flex;
  float: right;
  margin-top: 40px;
}
.search {
  width: 30%;
}
</style>
