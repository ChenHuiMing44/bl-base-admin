<template>
  <div class="tag-container">
    <el-scrollbar>
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{tag.name}}
        <span v-if="!tag.meta.fixTag" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>

    </el-scrollbar>
  </div>
</template>

<script>
  import path from "path"

	export default {
		name: "TagsBar",
		computed: {
			visitedViews() {
				return this.$store.state.tag.visitedViews
			},
			routes() {
				return this.$store.state.permit.routes
			}
		},
    mounted(){
	    this.initTags()
      //将当前页面添加进去
      this.addTags()
    },
    watch: {
	    $route() {
		    this.addTags()
	    }
    },
    methods: {
	    isActive(route) {
		    return route.path === this.$route.path
	    },
	    filterAffixTags(routes, basePath = '/') {
		    let tags = []
		    routes.forEach(route => {
			    if (route.meta && route.meta.fixTag) {
				    const tagPath = path.resolve(basePath, route.path)
				    tags.push({
					    fullPath: tagPath,
					    path: tagPath,
					    name: route.name,
					    meta: { ...route.meta }
				    })
			    }
			    if (route.children) {
				    const tempTags = this.filterAffixTags(route.children, route.path)
				    if (tempTags.length >= 1) {
					    tags = [...tags, ...tempTags]
				    }
			    }
		    })
		    return tags
	    },
      initTags(){
	      const fixTags = this.filterAffixTags(this.routes);
	      // debugger
	      for(const tag of fixTags){
		      if(tag.name){
			      this.$store.dispatch("addView", tag)
		      }
	      }


      },
	    closeSelectedTag(view) {
		    this.$store.dispatch('delView', view).then(({ visitedViews }) => {
			    if (this.isActive(view)) {
				    this.toLastView(visitedViews)
			    }
		    })
	    },
	    toLastView(visitedViews) {
		    const latestView = visitedViews.slice(-1)[0]
		    if (latestView) {
			    this.$router.push(latestView)
		    } else {
			    this.$router.push('/')
		    }
	    },
	    addTags() {
		    const { name } = this.$route
		    if (name) {
			    this.$store.dispatch('addView', this.$route)
		    }
	    },

    }
	}
</script>

<style scoped>
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;

  }
  .tags-view-item:first-of-type {
     margin-left: 15px;
   }
  .tags-view-item:last-of-type {
     margin-right: 15px;
   }
  .tags-view-item.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
  }
  .tags-view-item.active::before {
     content: '';
     background: #fff;
     display: inline-block;
     width: 8px;
     height: 8px;
     border-radius: 50%;
     position: relative;
     margin-right: 2px;
   }
</style>