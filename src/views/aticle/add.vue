<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="文章标题">
            <el-input style="width: 203px" v-model="queryCategoryName" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <el-form-item label="文章分类">
            <el-input style="width: 203px" v-model="queryCategoryName" placeholder="请选择文章分类"></el-input>
          </el-form-item>
          <el-form-item label="文章标签">
            <el-input style="width: 203px" v-model="queryCategoryName" placeholder="请选择文章标签"></el-input>
          </el-form-item>
          <el-form-item>
            <el-switch v-model="value1" active-text="草稿" inactive-text="发布">
            </el-switch>
          </el-form-item>
          <br>
          <el-form-item label="文章前言">
            <el-input style="width: 1300px" v-model="queryCategoryName" placeholder="请选择文章标签"></el-input>
          </el-form-item>
          <el-form-item>
            <el-switch v-model="value1" active-text="允许评论" inactive-text="不允许评论">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <mavon-editor v-model="value" />
    </div>
    <el-button class="summit" type="primary">提交文章</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ''
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