<template>
  <a-card :bordered="false" class="card-area">
    <div :class="advanced ? 'search' : null">
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <div :class="advanced ? null : 'fold'"></div>
      </a-form>
    </div>
    <div>
      <div class="operator">
        <a-popconfirm
          title="请选择创建类型"
          okText="按钮"
          cancelText="菜单"
          @cancel="() => createMenu()"
          @confirm="() => createButton()"
        >
          <a-icon
            slot="icon"
            type="question-circle-o"
            style="color: orangered"
          />
          <a-button type="primary" ghost>新增</a-button>
        </a-popconfirm>
      </div>
      <!-- 表格区域 -->
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        :key="key"
        :loading="loading"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        @change="handleTableChange"
        :scroll="{ x: 1500 }"
      >
        <template v-if="text" slot="icon" slot-scope="text">
          <a-icon :type="text" />
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-button
            title="编辑"
            @click="edit(record)"
            type="primary"
            size="small"
          >
            编辑
          </a-button>
          <a-button
            title="删除"
            @click="deleteRow(record)"
            type="primary"
            size="small"
          >
            删除
          </a-button>
          <!--          <a-badge status="warning" text="无权限"></a-badge>-->
        </template>
      </a-table>
    </div>
    <!-- 新增菜单 -->
    <menu-add
      @close="handleMenuAddClose"
      @success="handleMenuAddSuccess"
      :menuAddVisiable="menuAddVisiable"
      :tree="dataSource"
    >
    </menu-add>
    <!-- 修改菜单 -->
    <menu-edit
      ref="menuEdit"
      :tree="dataSource"
      @close="handleMenuEditClose"
      @success="handleMenuEditSuccess"
      :menuEditVisiable="menuEditVisiable"
    >
    </menu-edit>
    <!-- 新增按钮 -->
    <button-add
      @close="handleButtonAddClose"
      @success="handleButtonAddSuccess"
      :buttonAddVisiable="buttonAddVisiable"
      :tree="dataSource"
    >
    </button-add>
    <!-- 修改按钮 -->
    <button-edit
      ref="buttonEdit"
      @close="handleButtonEditClose"
      @success="handleButtonEditSuccess"
      :buttonEditVisiable="buttonEditVisiable"
      :tree="dataSource"
    >
    </button-edit>
  </a-card>
</template>

<script>
import RangeDate from './../../../components/datetime/RangeDate'
import MenuAdd from './MenuAdd'
import MenuEdit from './MenuEdit'
import ButtonAdd from './ButtonAdd'
import ButtonEdit from './ButtonEdit'
import ApiUser from './../../../apis/user'
import ApiMenu from './../../../apis/menu'
import Utils from './../../../utils'
export default {
  name: 'Menu',
  components: { ButtonAdd, ButtonEdit, RangeDate, MenuAdd, MenuEdit },
  data() {
    return {
      advanced: false,
      key: '' + new Date(),
      queryParams: {},
      filteredInfo: null,
      dataSource: [],
      selectedRowKeys: [],
      pagination: {
        defaultPageSize: 10000000,
        hideOnSinglePage: true,
        indentSize: 100
      },
      loading: false,
      menuAddVisiable: false,
      menuEditVisiable: false,
      buttonAddVisiable: false,
      buttonEditVisiable: false
    }
  },
  computed: {
    columns() {
      let { filteredInfo } = this
      filteredInfo = filteredInfo || {}
      // console.log(11111, filteredInfo)
      return [
        {
          title: '名称',
          dataIndex: 'root.menuName',
          width: 200,
          fixed: 'left'
        },
        {
          title: '类型',
          dataIndex: 'root.type',
          filters: [
            { text: '按钮', value: 1 },
            { text: '菜单', value: 0 },
            { text: '页面', value: 2 }
          ],
          filterMultiple: false,
          filteredValue: filteredInfo.type || null,
          onFilter: (value, record) => record.type.includes(value),
          customRender(val) {
            if (val === 1) {
              return '按钮'
            } else if (val === 0) {
              return '菜单'
            }
            return '页面'
          }
        },
        {
          title: '地址',
          dataIndex: 'root.path'
        },
        {
          title: 'Vue组件',
          dataIndex: 'root.component'
        },
        {
          title: 'meta-info',
          dataIndex: 'root.metaInfo'
        },
        {
          title: '权限',
          dataIndex: 'root.permission'
        },
        {
          title: '排序',
          dataIndex: 'root.orderField'
        },
        {
          title: '创建时间',
          dataIndex: 'root.createTime',
          customRender(val) {
            return Utils.stampFormat(val, 'YYYY-MM-DD')
          }
        },
        {
          title: '修改时间',
          dataIndex: 'root.modifyTime',
          key: 'modifyTime',
          customRender(val) {
            return Utils.stampFormat(val, 'YYYY-MM-DD')
          }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          width: 160,
          scopedSlots: { customRender: 'operation' },
          fixed: 'right'
        }
      ]
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleMenuEditClose() {
      this.menuEditVisiable = false
    },
    handleMenuEditSuccess() {
      this.menuEditVisiable = false
      this.$message.success('修改菜单成功')
      this.fetch()
    },
    handleButtonEditClose() {
      this.buttonEditVisiable = false
    },
    handleButtonEditSuccess() {
      this.buttonEditVisiable = false
      this.$message.success('修改按钮成功')
      this.fetch()
    },
    edit(record) {
      if (record.root.type === 0 || record.root.type === 2) {
        this.$refs.menuEdit.setFormValues(record.root)
        this.menuEditVisiable = true
      } else {
        this.$refs.buttonEdit.setFormValues(record.root)
        this.buttonEditVisiable = true
      }
    },
    deleteRow(record) {
      //弹出一个提示框
      const that = this
      this.$confirm({
        title: '确定删除该记录?',
        content:
          '当您点击确定按钮后，记录将会被彻底删除，如果其包含子记录，也将一并删除！',
        centered: true,
        onOk() {
          that.loading = true
          ApiMenu.deleteRow({ menuId: record.root.menuId })
            .then(() => {
              that.loading = false
              that.$message.success('删除成功')
              that.fetch()
            })
            .catch((err) => {
              that.loading = false
              err.errMsg && that.$message.error(err.errMsg)
            })
        }
      })
    },
    handleButtonAddClose() {
      this.buttonAddVisiable = false
    },
    handleButtonAddSuccess() {
      this.buttonAddVisiable = false
      this.$message.success('新增按钮成功')
      this.fetch()
    },
    createButton() {
      this.buttonAddVisiable = true
    },
    handleMenuAddClose() {
      this.menuAddVisiable = false
    },
    handleMenuAddSuccess() {
      this.menuAddVisiable = false
      this.$message.success('新增菜单成功')
      this.fetch()
    },
    createMenu() {
      this.menuAddVisiable = true
    },
    handleDateChange(value) {
      if (value) {
        this.queryParams.createTimeFrom = value[0]
        this.queryParams.createTimeTo = value[1]
      }
    },
    search() {
      let { filteredInfo } = this
      this.fetch({
        ...this.queryParams,
        ...filteredInfo
      })
    },
    reset() {
      // 取消选中
      this.selectedRowKeys = []
      // 重置列过滤器规则
      this.filteredInfo = null
      // 重置查询参数
      this.queryParams = {}
      // 清空时间选择
      this.$refs.createTime.reset()
      this.fetch()
    },
    handleTableChange(pagination, filters, sorter) {
      // 将这两个个参数赋值给Vue data，用于后续使用
      this.filteredInfo = filters
      this.fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...this.queryParams,
        ...filters
      })
    },
    setKey(trees) {
      trees &&
        trees.forEach((item) => {
          item.key = item.root.menuId
          item.children && item.children.length && this.setKey(item.children)
        })
    },
    fetch(params = {}) {
      this.loading = true
      ApiUser.menuTree(params)
        .then((res) => {
          this.loading = false
          if (Object.is(res.result.children, undefined)) {
            this.setKey(res.result)
            this.dataSource = res.result
          } else {
            this.dataSource = res.result.children
          }
        })
        .catch((err) => {
          this.loading = false
          err.errMsg && this.$message.error(err.errMsg)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
.operator button {
  margin-right: 5px;
}
i {
  cursor: pointer;
}
</style>
