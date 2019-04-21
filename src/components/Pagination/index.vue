<template>
  <div :class="{'hidden': hidden}" class="pagination-container">
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-size.sync="currentPageSize"
      :total="total"
      :page-sizes="pageSizes"
      v-bind="$attrs"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
    export default {
      name: "Pagination",
      props: {
        total: {
          required: true,
          type: Number
        },
        page: {
          type: Number,
          default: 1
        },
        pageSize: {
          type: Number,
          default: 10
        },
        pageSizes: {
          type: Array,
          default(){
            return [5, 10, 20, 50]
          }
        },
        layout: {
          type: String,
          default: 'total, sizes, prev, pager, next, jumper'
        },
        hidden: {
          type: Boolean,
          default: false
        }
      },
      computed: {
        currentPage: {
          get() {
            return this.page
          },
          set(val) {
            this.$emit('update:page', val)
          }
        },
        currentPageSize: {
          get() {
            return this.pageSize
          },
          set(val) {
            this.$emit("update:pageSize", val)
          }
        }
      },
      methods: {
        handleSizeChange (val) {
          this.$emit("pageChange", { page: this.currentPage, pageSize: val })
        },
        handleCurrentChange (val) {
          this.$emit("pageChange", { page: val, pageSize: this.currentPageSize})
        }
      }
    }

</script>

<style scoped>
  .pagination-container {
    background: #fff;
    padding: 32px 16px;
  }
  .pagination-container.hidden {
    display: none;
  }
</style>