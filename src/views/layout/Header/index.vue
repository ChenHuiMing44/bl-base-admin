<template>
  <div class="app-head">
    <div class="nav-bar">
      <nav-bar/>
    </div>
    <div class="tags-bar">
      <tags-bar/>
    </div>
  </div>
</template>

<script>
	import NavBar from "./NavBar"
	import TagsBar from "./TagsBar"
	export default {
		name: "index",
		components: {TagsBar, NavBar},
	}
</script>

<style scoped>
  .nav-bar{
    height: 50px;
    padding: 0 20px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 21, 41, 0.08);
  }
  .tags-bar{
    border-bottom: 1px solid #d8dce5;
    height: 34px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    padding: 0 20px;
  }
</style>