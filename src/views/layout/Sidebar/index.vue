<template>
  <div class="sidebar flow-hide-x" style="height: 100%">
    <el-scrollbar style="height: 100%">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        :background-color="theme.sideBack"
        :text-color="theme.sideColor"
        :active-text-color="theme.sideActiveColor"
        :collapse="sidebar.opened"
        mode="vertical"
      >
        <template  v-for="route in permissionRoutes">
          <sidebar-item v-if="!route.hidden" :key="route.path" :item="route" :base-path="route.path" />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
	import SidebarItem from "./SidebarItem"
	export default {
		name: "Sidebar",
		components: {SidebarItem},
		computed: {
			theme: function () {
        return this.$store.state.app.theme
			},
	    sidebar: function () {
        return this.$store.state.app.sidebar
      },
	    sideWidth: function () {
		    return this.$store.state.app.sideWidth;
	    },
	    permissionRoutes: function () {
        return this.$store.getters.permissionRoutes;
	    },
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
    },
    mounted(){
	    // this.$router.replace("/user/admin");
    }
	}
</script>

<style scoped>

</style>