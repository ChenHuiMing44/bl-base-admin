<template>
  <div class="app-container">
    <h2>欢迎来到{{appName}}</h2>
    <div class="notes-box">
      <p>1. 本管理站由贝连提供</p>
      <p>2. 该管理站为解决xxxx</p>
      <p>3. 如有任何疑问请致电<span class="blue">400-xxxx-8888</span></p>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Welcome",
      computed: {
        appName(){
          return this.$store.state.app.appName;
        }
      }
    }
</script>

<style scoped>
.notes-box{
  padding: 15px 20px;
}
.notes-box p{
  padding: 5px;
}
</style>