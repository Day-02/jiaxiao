<template>
  <div class="app-container">
    <p>学生管理页面</p>
    <el-input
      v-model="search"
      size="mini"
      placeholder="输入关键字搜索"
      @keyup.enter.native="search2()"
      class="search"
    />
    <!-- <el-table-column
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
    </el-table-column> -->
    <el-table
      :data="students"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="sid" label="编号" sortable> </el-table-column>

      <el-table-column prop="uid" label="用户id" sortable> </el-table-column>

      <el-table-column prop="pid" label="代理人id" sortable> </el-table-column>

      <el-table-column prop="name" label="姓名"> </el-table-column>

      <el-table-column prop="phoneNumber" label="电话"> </el-table-column>

      <el-table-column prop="registerTime" label="报名时间" sortable> </el-table-column>

      <el-table-column prop="updateTime" label="修改时间"> </el-table-column>

      <!-- <el-table-column prop="cardNumber" label="身份证号码"> </el-table-column> -->

      <el-table-column prop="payAmount" label="支付金额" sortable> </el-table-column>

      <el-table-column prop="address" label="地址"> </el-table-column>

      <el-table-column prop="carType" label="车型" sortable> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
          type="primary"
          >编辑
          </el-button> -->
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑
          </el-button>

          <el-popconfirm
            title="确定要删除吗？"
            @onConfirm="handleDelete(scope.$index, scope.row)"
            @onCancel="cancel()"
          >
            <el-button size="mini" type="danger" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
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
      title="代理人信息修改"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :before-close="handleClose"
    >
      <el-form label-width="90px">
        <el-form-item label="姓名">
          <el-input v-model="editStudent.name"></el-input>
        </el-form-item>

        <el-form-item label="代理人id">
          <el-input v-model="editStudent.pid"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="editStudent.phoneNumber">></el-input>
        </el-form-item>

        <!-- <el-form-item label="身份证号码">
          <el-input v-model="editStudent.cardNumber">></el-input>
        </el-form-item> -->

        <el-form-item label="地址">
          <el-input v-model="editStudent.address">></el-input>
        </el-form-item>

        <el-form-item label="车型">
          <el-input v-model="editStudent.carType">></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>



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
      students: [],
      search: "",
      pageSize: 10,
      total: 100,
      currentPage: 1,
      dialogVisible: false,
      dialogWidth: "30%",
      editStudent: [],
    };
  },
  methods: {
    // 刷新页面重新加载数据用
    reload() {
      let that = this;
      this.axios
        .post(
          baseurl +
            "/student/selectAllByCondition?keywords=" +
            this.search +
            "&pageNum=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          that.students = res.data;
          console.log(that.students);
        });

      this.axios.post(baseurl + "/student/selectCount").then((res) => {
        that.total = res.data;
      });
      this.setDialogWidth();
    },

    //表格操作
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogVisible = true;
      this.editStudent = row;
    },
    // 删除学员
    handleDelete(index, row) {
      // this.$message.error("该功能开发中！");
      console.log(row.sid);
      console.log(row.uid);
      this.axios
        .get(baseurl + "/student/delete?uId=" + row.uid + "&sId=" + row.sid)
        .then((res) => {
          this.$message.success("删除成功!");
          this.reload();
        });
    },
    cancel() {
      console.log("取消了");
      this.dialogVisible = false;
      this.reload();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 搜索功能
    search2() {
      let that = this;
      this.axios
        .post(
          baseurl +
            "/student/selectAllByCondition?keywords=" +
            this.search +
            "&pageNum=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          that.students = res.data;
        });
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

    // 弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    update() {
      this.dialogVisible = false;
      let that = this;
      console.log("修改的学员信息是");
      console.log(that.editStudent);
      this.axios
        .post(baseurl + "/student/update", that.editStudent)
        .then((res) => {
          this.$message.success("修改成功!");
        });
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
<style>
.search {
  width: 30%;
}
.pagination {
  display: flex;
  float: right;
  margin-top: 40px;
}
</style>
