<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="文章标题">
            <el-input style="width: 203px" v-model="blogInfo.blogTitle" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <el-form-item label="文章分类">
            <el-select v-model="blogInfo.blogCategoryId" placeholder="请选择文章分类">
              <el-option v-for="item in categoryList" :key="item.categoryName" :label="item.categoryName" :value="item.categoryId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章标签">
            <el-select v-model="blogInfo.tagIds" multiple placeholder="请选择文章标签">
              <el-option v-for="item in tagList" :key="item.tagId" :label="item.tagName" :value="item.tagId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-switch active-text="发布" inactive-text="草稿" v-model="blogInfo.blogStatus" :active-value="1" :inactive-value="0">
            </el-switch>
          </el-form-item>
          <br>
          <el-form-item label="文章前言">
            <el-input style="width: 1300px" placeholder="请选择文章标签" v-model="blogInfo.blogPreface"></el-input>
          </el-form-item>
          <el-form-item>
            <el-switch active-text="允许评论" inactive-text="不允许评论" v-model="blogInfo.enableComment" :inactive-value="0" :active-value="1">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <mavon-editor v-model="blogInfo.blogContent" />
    </div>
    <el-button class="summit" type="primary" @click="summitAddBlog">提交文章</el-button>
  </div>
</template>
<script>
import { getCategoryList } from "../../api/category";
import { getTagList } from "../../api/tag";
import { addBlog, getBlogInfo, editBlogInfo } from '../../api/blog'
import { Loading } from 'element-ui';
export default {
  data () {
    return {
      blogInfo: {},
      tagList: {},
      categoryList: {},
      updateBlogId: '',
    }
  },
  created () {
    this.categorys();
    this.tags();
    if (this.$route.params) {
      this.updateBlogId = this.$route.params.id;
    }
  },
  mounted () {
    if (this.updateBlogId) {
      getBlogInfo(this.updateBlogId).then(res => {
        this.blogInfo = res.data.data.item;
      })
    }
  },
  methods: {
    categorys () {
      getCategoryList().then(res => {
        this.categoryList = res.data.data.list;
      })
    },
    tags () {
      getTagList().then(res => {
        this.tagList = res.data.data.list;
      })
    },
    summitAddBlog () {
      let loadingInstance = Loading.service();
      if (this.updateBlogId) {
        editBlogInfo(this.blogInfo).then(res => {
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          })
          this.$message.success("修改博客信息成功");
        })
      }
      else {
        addBlog(this.blogInfo).then(res => {
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          })
          this.$message.success("提交博客成功");
        })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.table-container {
  margin-bottom: 30px;
}
.summit {
  display: block;
  margin: 0 auto;
}
</style>