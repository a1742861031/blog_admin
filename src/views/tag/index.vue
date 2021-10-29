<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>查找操作</span>

      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="queryTagName" placeholder="标签名/关键字"></el-input>
          </el-form-item>
          <el-button @click="getTagName()" type="primary" size="small">
            查找标签
          </el-button>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>添加操作</span>
      <el-button class="btn-add" @click="handleAdd()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="brandTable" :data="list" style="width: 100%" v-loading="listLoading" border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="标签id" width="200" align="center">
          <template slot-scope="scope">{{scope.row.tagId}}</template>
        </el-table-column>
        <el-table-column label="标签名" align="center">
          <template slot-scope="scope">{{scope.row.tagName}}</template>
        </el-table-column>
        <el-table-column label="当前状态" width="500" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isDeleted==0">可用</el-tag>
            <el-tag type="danger" v-else>不可用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="500" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate( scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="openDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加编辑对话框开始 -->
    <el-dialog :title=title :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <el-form label-position="left" label-width="80px" :model="updateOrAddInfo">
        <el-form-item label="名称">
          <el-input v-model="updateOrAddInfo.tagName"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-switch v-model="updateOrAddInfo.isDeleted" active-color="#13ce66" inactive-color="#ff4949" :active-value=0 :inactive-value=1>
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="summit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加编辑对话结束 -->
  </div>
</template>
<script>
import { getTagList, queryTag, deleteTag, editTag, addTag } from "../../api/tag";
export default {
  data () {
    return {
      list: {},
      listLoading: true,
      queryTagName: '',
      updateOrAddInfo: {},
      title: '',
      dialogVisible: false,
      updateOrAddFlag: 0//0表示更新，1表示添加
    }
  },
  created () {
    this.getTagName();
  },
  methods: {
    getTagName () {
      if (this.queryTagName) {
        queryTag(this.queryTagName).then(res => {
          this.list = res.data.data.list;
          this.listLoading = false;
        })
      }
      else {
        getTagList().then(res => {
          this.list = res.data.data.list;
          this.listLoading = false;
        })
      }
    },

    openDelete (row) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTag(row.tagId).then(res => {
          this.$message.success("删除该标签成功");
          this.getTagName();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleAdd () {
      this.title = "删除标签"
      this.dialogVisible = true;
    },
    handleUpdate (info) {
      this.title = "编辑标签"
      this.updateOrAddFlag = 0;
      this.updateOrAddInfo = info;
      this.dialogVisible = true;
    },
    handleClose () {
      this.updateOrAddFlag = 1;
      this.updateOrAddInfo = {};
    },
    summit () {
      if (this.updateOrAddFlag == 0) {//编辑
        editTag(this.updateOrAddInfo).then(res => {
          this.$message.success("修改成功");
          this.getTagName();
          this.dialogVisible = false;
        })
      }
      else {
        addTag(this.updateOrAddInfo).then(res => {
          this.$message.success("修改成功");
          this.getTagName();
          this.dialogVisible = false;
        })
      }
    }
  }

}
</script>
