<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull class="right-menu-item hover-effect" />

        <lang-select class="right-menu-item hover-effect" />

        <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="useravatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="oepnEditDialog">修改个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改对话框开始 -->
    <el-dialog title="修改个人信息" :visible.sync="editDialogVisible" width="30%">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="个人简介">
          <el-input v-model="userInfo.introduce"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="userInfo.qq"></el-input>
        </el-form-item>
        <el-form-item label="github">
          <el-input v-model="userInfo.github"></el-input>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="summitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改对话框结束 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfo, editUserInfo } from "../../../api/AdminUser";
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import Cookies from 'js-cookie'

import {
  getToken,
} from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker,
  },
  data () {
    return {
      useravatar: '',
      editDialogVisible: false,
      userInfo: {}
    }
  },
  created () {
    let userInfo = Cookies.get("user");
    this.useravatar = JSON.parse(userInfo).avatar;
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'device'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    getUserInformation () {
      let token = getToken();
      getUserInfo(token).then(response => {
        if (response.data.code == 200) {
          this.userInfo = response.data.data.user;
        }

      }).catch(error => { })
    },
    oepnEditDialog () {
      this.editDialogVisible = true;
      this.getUserInformation();
    },
    summitEdit () {
      editUserInfo(this.userInfo).then(res => {
        this.$message.success("修改信息成功");
        this.editDialogVisible = false;
        location.reload();

      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
