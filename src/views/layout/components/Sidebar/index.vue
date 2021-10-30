<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :default-active="$route.path" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :active-text-color="variables.menuActiveText" mode="vertical">
      <sidebar-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { constantRouterMap } from "@/router/index";
export default {
  components: { SidebarItem },
  created () {
    this.routers = constantRouterMap;
  },
  data () {
    return {
      routers: []
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
