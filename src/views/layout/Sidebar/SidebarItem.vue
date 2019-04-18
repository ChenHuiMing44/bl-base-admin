<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild">
      <el-menu-item index="" @click="linkTo">

          <span slot="title">{{item.name}}</span>

      </el-menu-item>
    </template>
    <el-submenu v-else ref="subMenu" :index="item.path" popper-append-to-body>
      <template slot="title">
        <i class="iconfont side-font" :class="item.mate && item.mate.icon"></i>
        <span>{{item.name}}</span>
      </template>

        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="basePath +'/'+ child.path"
          class="nest-menu"
        />
    </el-submenu>

  </div>
</template>

<script>
import Item from './Item'


export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
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
		  return showingChildren.length === 1 || showingChildren.length === 0
	  }
  },
  methods: {
	  linkTo: function () {
	  	// debugger
      console.log(this.basePath);
      this.$router.replace("/user/admin");
      this.$router.replace({
        path: this.basePath
      })
	  }
  }
}
</script>
<style scoped>
  .side-font{
    width: 30px;
    text-align: center;
  }
</style>
