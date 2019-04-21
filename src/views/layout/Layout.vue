
<template>
  <el-container style="height: 100%" :style="{color: color}">
    <el-aside :style="{backgroundColor: sideBack,width: 'auto'}" class="aside-animate">
      <sidebar class="sidebar-container"/>
    </el-aside>
    <el-container>
      <el-header :style="{backgroundColor: headerBack}" height="90px">
        <head-bar/>
      </el-header>
      <el-main :style="{backgroundColor: mainBack}">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Sidebar from "./Sidebar"
  import HeadBar from "./Header"


	export default {
		name: "Layout",
    components: {
			Sidebar, HeadBar
    },
    computed: {
			sideWidth: function () {
        return this.$store.state.app.sideWidth;
			},
	    sideCloseWidth: function () {
		    return this.$store.state.app.sideCloseWidth;
	    },
	    sidebar: function () {
		    return this.$store.state.app.sidebar;
	    },
      sideBack: function () {
        return this.$store.state.app.theme.sideBack
      },
      headerBack: function () {
        return this.$store.state.app.theme.headerBack
      },
	    mainBack: function () {
		    return this.$store.state.app.theme.mainBack
	    },
	    color: function () {
		    return this.$store.state.app.theme.color
	    },

    },
    mounted(){

    }
	}
</script>

<style scoped>
  .aside-animate{
    transition: width .5s;
  }
  .sidebar-container{
    /*transition: width 0.28s;*/

  }
</style>