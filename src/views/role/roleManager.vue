<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item label="角色名">
          <el-input
            v-model="listQuery.roleName"
            placeholder="角色名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="listQuery.valid">显示失效</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" icon="el-icon-search">
            查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addItem" icon="el-icon-plus">
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="list"
      stripe
      fit
      size="small"
      v-loading="listLoading"
      @sort-change="sortChange"
      style="width: 100%"
    >
      <el-table-column label="角色名" align="center">
        <template slot-scope="{ row }">{{ row.roleName }}</template>
      </el-table-column>
      <el-table-column label="组织id" align="center">
        <template slot-scope="{ row }">{{ row.orgId }}</template>
      </el-table-column>

      <el-table-column label="角色id" align="center">
        <template slot-scope="{ row }">{{ row.roleId }}</template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{ row }">{{ row.desc }}</template>
      </el-table-column>
      <el-table-column label="最后修改时间" align="center" prop="time">
        <template slot-scope="{ row }">
          <i class="el-icon-time" style="margin-right: 5px"></i>
          {{ row.modifyTime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <el-tag size="mini" :type="row.valid ? 'success' : 'danger'">
            {{ row.valid ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="280">
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(row, $index)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleShareMenu(row, $index)"
            >分配菜单
          </el-button>
          <el-button
            size="mini"
            :type="!row.valid ? 'success' : 'danger'"
            @click="handleStatus(row, $index)"
          >
            {{ !row.valid ? '启用' : '禁用' }}
          </el-button>
          <el-button size="mini" type="info" @click="deleteRow(row, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :page-size.sync="listQuery.offset"
      @pageChange="queryList"
    />
    <el-dialog
      :title="dialogType === 'add' ? '添加' : '编辑'"
      :visible.sync="showDialog"
    >
      <el-form
        v-cLoading="updateDialogLoading"
        size="small"
        label-position="right"
        label-width="80px"
        class="form-item-space2"
      >
        <el-form-item label="角色名:" prop="roleName" class="form-item-space2">
          <el-input v-model="dialogTmp.roleName" />
        </el-form-item>
        <el-form-item
          v-if="dialogType !== 'add'"
          label="角色id:"
          prop="roleId"
          class="form-item-space2"
        >
          <el-input v-model="dialogTmp.roleId" :disabled="true" />
        </el-form-item>
        <el-form-item label="组织id:" prop="orgId" class="form-item-space2">
          <el-input
            v-model="dialogTmp.orgId"
            :disabled="dialogType !== 'add'"
          />
        </el-form-item>
        <el-form-item label="备注:" prop="desc">
          <el-input type="textarea" v-model="dialogTmp.desc" placehold="备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="showDialog = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleUpdate"
          :loading="updateDialogLoading"
          >确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配菜单" :visible.sync="showShareMenuDialog">
      <el-form
        size="small"
        label-position="right"
        label-width="80px"
        class="form-item-space2"
        v-cLoading="relationDialogLoading"
      >
        <el-form-item label="角色名:" prop="roleName" class="form-item-space2">
          <el-input v-model="shareMenuDialogTmp.roleName" disabled />
        </el-form-item>
        <el-tree
          :data="currentRoleMenuTree"
          show-checkbox
          node-key="key"
          ref="menuTree"
          :props="{ children: 'children', label: 'title' }"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="showShareMenuDialog = false">
          取 消
        </el-button>
        <el-button size="small" type="primary" @click="submitRoleMenu">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination/index'
import ApiRole from './../../apis/role'
import ApiUser from './../../apis/user'
export default {
  name: 'roleManager',
  components: { Pagination },
  data() {
    return {
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        offset: 10,
        //剩下的所有属性全放这里
        roleName: '',
        valid: true
      },
      list: [],
      showDialog: false,
      showShareMenuDialog: false,
      updateDialogLoading: false,
      relationDialogLoading: false,
      dialogType: 'add',
      dialogTmp: '',
      shareMenuDialogTmp: '',
      currentRoleMenu: [],
      dataSource: []
    }
  },
  computed: {
    //这个值是add时的初始化数据
    dialogAdd: () => ({ name: '', time: new Date(), remark: '', status: true }),

    currentRoleMenuTree() {
      //生成0 的list
      function recursionTree(tree) {
        let arr = []
        tree.length &&
          tree.forEach((item) => {
            let newItem = { ...item.root }
            newItem.title = newItem.menuName
            newItem.key = item.key
            newItem.children = item.children && recursionTree(item.children)
            arr.push(newItem)
          })
        return arr
      }
      return recursionTree(this.dataSource)
    }
  },
  mounted() {
    this.queryList()
    this.fetch()
  },
  methods: {
    queryList() {
      this.listLoading = true
      const query = { ...this.listQuery }
      query.valid = this.listQuery.valid ? '' : 1
      query.orgId = 1
      ApiRole.list(query)
        .then((res) => {
          this.total = res.total
          this.listLoading = false
          this.list = res.result
        })
        .catch((err) => {
          this.listLoading = false
          err.errMsg && this.$message.error(err.errMsg)
        })
    },
    search() {
      this.listQuery.page = 1
      this.queryList()
    },
    fetch(params = {}) {
      this.loading = true
      ApiUser.menuTree(params).then((res) => {
        this.loading = false
        if (Object.is(res.result.children, undefined)) {
          this.setKey(res.result)
          this.dataSource = res.result
        } else {
          this.dataSource = res.result.children
        }
      })
    },
    setKey(trees) {
      trees &&
        trees.forEach((item) => {
          item.key = item.root.menuId
          item.children && item.children.length && this.setKey(item.children)
        })
    },
    sortChange({ prop, order }) {
      this.listQuery.sort = { order: order, prop: prop }
      this.queryList()
    },
    addItem() {
      this.dialogTmp = Object.assign({}, this.dialogAdd)
      this.dialogType = 'add'
      this.showDialog = true
    },
    //点击编辑
    handleEdit(row) {
      let tmp = Object.assign({}, row)
      tmp.valid = !!tmp.valid
      this.dialogType = 'edit'
      //因为后台传的时间可能是时间戳 时间显示的格式  但是在这里统统要转成date  可以写两个方法用链式法则调用看着简单点
      this.dialogTmp = tmp
      this.showDialog = true
    },
    /**
     * @2019/4/21
     * @author: hm
     * @params: row 表示数据行  index表示当前数据处于list的下标
     * desc:  点击启用或者禁用
     */
    handleStatus(row) {
      //query
      ApiRole.switch({ roleId: row.roleId, valid: (row.valid + 1) % 2 })
        .then(() => {
          row.valid = (row.valid + 1) % 2
          this.$message.success('操作成功')
        })
        .catch((err) => {
          err.errMsg && this.$message.error(err.errMsg)
        })
    },
    handleUpdate() {
      //点击确认
      if (!this.dialogTmp.roleName) {
        this.$message.error('角色名不能为空')
        return
      }
      this.updateDialogLoading = true
      const submitQuery =
        this.dialogType === 'add' ? ApiRole.add : ApiRole.update
      submitQuery(this.dialogTmp)
        .then(() => {
          this.$message.success('操作成功')
          this.updateDialogLoading = false
          this.showDialog = false
          this.queryList()
        })
        .catch((err) => {
          this.updateDialogLoading = false
          err.errMsg && this.$message.error(err.errMsg)
        })
    },
    handleShareMenu(row) {
      this.shareMenuDialogTmp = Object.assign({}, row)
      this.relationDialogLoading = true
      this.showShareMenuDialog = true
      //根据roleId获取列表
      setTimeout(() => {
        this.$refs.menuTree && this.$refs.menuTree.setCheckedKeys([])
      })
      ApiRole.roleMenu({ roleId: row.roleId })
        .then((res) => {
          this.$refs.menuTree.setCheckedKeys(res.result)
          this.relationDialogLoading = false
        })
        .catch((err) => {
          err.errMsg && this.$message.error(err.errMsg)
          this.relationDialogLoading = false
        })
    },
    submitRoleMenu() {
      let menuIds = this.$refs.menuTree.getCheckedKeys()
      let roleId = this.shareMenuDialogTmp.roleId
      this.relationDialogLoading = true
      ApiRole.relationMenu({ menuIds, roleId })
        .then(() => {
          this.$message.success('操作成功')
          this.relationDialogLoading = false
          this.showShareMenuDialog = false
        })
        .catch((err) => {
          this.relationDialogLoading = false
          err.errMsg && this.$message.error(err.errMsg)
        })
    },
    deleteRow(row) {
      const that = this
      this.$confirm({
        title: '确定删除该记录?',
        content: '当您点击确定按钮后，记录将会被彻底删除',
        centered: true,
        onOk() {
          that.listLoading = true
          ApiRole.delete({ roleId: row.roleId })
            .then(() => {
              that.listLoading = false
              that.$message.success('删除成功')
              that.queryList()
            })
            .catch((err) => {
              that.listLoading = false
              err.errMsg && that.$message.error(err.errMsg)
            })
        }
      })
    }
  }
}
</script>
<style>
.el-button + .el-button {
  margin-left: 3px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 4px 7px;
}
</style>

<style scoped></style>
