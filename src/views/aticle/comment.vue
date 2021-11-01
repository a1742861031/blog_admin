<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>查找操作</span>

      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="选择blog：">
            <el-select v-model="queryBlogId" placeholder="请选择" clearable>
              <el-option v-for="item in blogList" :key="item.blogId" :label="item.blogTitle" :value="item.blogId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button @click="getCommentList()" type="primary" size="small">
            查找
          </el-button>
        </el-form>
      </div>
    </el-card>

    <div class="table-container">
      <el-table ref="brandTable" :data="info.records" style="width: 100%" v-loading="listLoading" border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="评论博客" width="200" align="center">
          <template slot-scope="scope">{{scope.row.blogName}}</template>
        </el-table-column>
        <el-table-column label="评论者" width="200" align="center">
          <template slot-scope="scope">{{scope.row.commentator}}</template>
        </el-table-column>
        <el-table-column label="评论者邮箱" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        <el-table-column label="评论内容" align="center">
          <template slot-scope="scope">{{scope.row.commentBody}}</template>
        </el-table-column>
        <el-table-column label="评论时间" align="center">
          <template slot-scope="scope">{{scope.row.commentCreateTime}}</template>
        </el-table-column>
        <el-table-column label="回复内容" align="center">
          <template slot-scope="scope">{{scope.row.replyBody}}</template>
        </el-table-column>
        <el-table-column label="审核通过" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.commentStatus" active-color="#13ce66" inactive-color="#ff4949" :active-value=1 :inactive-value="0" @change="verify(scope.row.commentId)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini"  @click="openDialog(scope.row)">回复</el-button>
            <el-button type="danger" size="mini" @click="deleteCom(scope.row.commentId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="info.total" :page-size=limit @current-change="getCommentList" :current-page.sync="current">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getCommentList, verifyComment, deleteComment, queryComment,editComment } from "../../api/comment";
import { getBlogList, getBlogName } from "../../api/blog";
export default {
  data () {
    return {
      queryBlogId: '',
      limit: 5,
      current: 1,
      info: {},
      blogList: [],
      listLoading: true
    }
  },
  created () {
    this.getCommentList();
    getBlogList().then(res => {
      this.blogList = res.data.data.items;
    })

  },
  methods: {
    verify (id) {
      verifyComment(id).then(res => {
        this.$message.success("操作成功");
      })
    },
    deleteCom (id) {
      deleteComment(id).then(res => {
        this.$message.success("删除成功");
        this.getCommentList();
      })
    },

    getCommentList () {
      if (this.queryBlogId) {
        queryComment(this.current, this.limit, this.queryBlogId).then(res => {
          this.info = res.data.data.data;
          this.listLoading = false;
          this.info.records.forEach(element => {
            getBlogName(element.blogId).then(res => {
              this.$set(element, 'blogName', res.data.data.name);
            })
          });
        })
      } else {
        getCommentList(this.current, this.limit).then(res => {
          this.info = res.data.data.data;
          this.listLoading = false;
          this.info.records.forEach(element => {
            getBlogName(element.blogId).then(res => {
              this.$set(element, 'blogName', res.data.data.blogName);
            })
          });
        })
      }
    },

    openDialog(item) {
        this.$prompt('请输入回复', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:item.replyBody,
        }).then(({ value }) => {
            item.replyBody = value;
            editComment(item).then().then(res=>{
              this.$message.success("回复成功");
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
  }

}
</script>
<style lang="scss" scoped>
.pagination {
  text-align: center;
  margin-top: 50px;
}
</style>