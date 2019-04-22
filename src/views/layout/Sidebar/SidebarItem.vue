<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild">
      <el-menu-item :index="basePath" @click="linkTo" >
        <i class="iconfont side-icon" :class="item.meta && item.meta.icon"></i>
        <span>{{item.name}}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <i class="iconfont side-icon" :class="item.meta && item.meta.icon" :title="item.name"></i>
        <span slot="title">{{item.name}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>

  </div>
</template>

<script>
import path from "path"

export default {
  name: 'SidebarItem',
  components: { },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  computed: {
	  hasOneShowingChild() {
		  let children = this.item.children || [];
		  const showingChildren = children.filter(item => {
			  return !item.hidden
		  })
		  return showingChildren.length === 0
	  },
	  sidebarOpen() {
	  	return this.$store.getters.sidebarOpen
    }
  },
  methods: {
	  linkTo: function () {
	  	// debugger
      console.log(this.basePath);
      this.$router.replace({
        path: this.basePath
      })
	  },
    resolvePath(routePath){
	    return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style scoped>
  .nest-menu li{
    background-color: #1f2d3d !important;
  }
  .side-icon{
    padding-right: 10px;
  }

  .nest-menu li:hover{
    background-color: #001528 !important;
  }
</style>
