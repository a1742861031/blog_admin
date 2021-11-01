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
            <el-input style="width: 203px" v-model="query.blogTitle" placeholder="博客名/关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.categoryId" placeholder="请选择文章分类">
              <el-option v-for="item in categoryList" :key="item.categoryName" :label="item.categoryName" :value="item.categoryId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" size="small" @click="queryBlog">
            查找博客
          </el-button>
        </el-form>
      </div>
    </el-card>

    <div class="table-container">
      <el-table ref="brandTable" :data="list" style="width: 100%" v-loading="listLoading" border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="博客标题" width="200" align="center">
          <template slot-scope="scope">{{scope.row.blogTitle}}</template>
        </el-table-column>
        <el-table-column label="博客分类" align="center">
          <template slot-scope="scope" v-if="scope.row.categoryName">{{scope.row.categoryName}}</template>
        </el-table-column>
        <el-table-column label="博客标签" align="center" prop="tagName">
        </el-table-column>
        <el-table-column label="浏览量" align="center">
          <template slot-scope="scope">{{scope.row.blogViews}}</template>
        </el-table-column>
        <el-table-column label="文章状态" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.enableComment==0">
              不允许评论
            </el-tag>
            <el-tag type="success" v-if="scope.row.enableComment==1">
              允许评论
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="评论" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.blogStatus==0">
              草稿
            </el-tag>
            <el-tag type="success" v-if="scope.row.blogStatus==1">
              发布
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="gotoEditPage(scope.row.blogId)">编辑</el-button>
            <el-button type="danger" @click="summmitDelete(scope.row.blogId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getCategoryById, getCategoryList } from "../../api/category";
import { getTagById } from "../../api/tag";
import { getBlogList, deleteBlog } from "../../api/blog";
export default {
  data () {
    return {
      list: [],
      query: {},
      tag: '',
      category: {},
      categoryList: [],
      listLoading: true
    }
  },

  created () {
    this.categorys();
    this.getBlogs();
  },

  methods: {

    getBlogs () {
      getBlogList(this.query).then(res => {
        this.list = res.data.data.items;
        this.list.forEach(element => {
          getCategoryById(element.blogCategoryId).then(res => {
            this.$set(element, 'categoryName', res.data.data.item.categoryName)
          })
          let tagName = '';
          element.tagIds.forEach(ids => {
            getTagById(ids).then(res => {
              tagName += res.data.data.item.tagName + ',';
              this.$set(element, 'tagName', tagName);
            })
          })
          this.listLoading = false;
        });
      });
    },
    categorys () {
      getCategoryList().then(res => {
        this.categoryList = res.data.data.list;
      })
    },
    queryBlog () {
      this.getBlogs();
    },

    summmitDelete (blogId) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBlog(blogId).then(res => {
          this.$message.success("删除成功");
          this.getBlogs();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    gotoEditPage(blogId){
       this.$router.push(`/aticle/update/${blogId}`)
    }
  }
}
</script>
