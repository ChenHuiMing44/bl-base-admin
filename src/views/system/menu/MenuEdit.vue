<template>
  <a-drawer
    title="修改菜单（页面）"
    :maskClosable="false"
    width="650"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="menuEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-form :form="form">
      <a-form-item label="菜单名称" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'menuName',
            {
              rules: [
                { required: true, message: '菜单名称不能为空' },
                { max: 10, message: '长度不能超过10个字符' }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="URL" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'path',
            {
              rules: [
                { required: true, message: '菜单URL不能为空' },
                { max: 50, message: '长度不能超过50个字符' }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="组件地址" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'component',
            {
              rules: [
                { required: true, message: '组件地址不能为空' },
                { max: 100, message: '长度不能超过100个字符' }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="相关权限" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'permission',
            { rules: [{ max: 50, message: '长度不能超过50个字符' }] }
          ]"
        />
      </a-form-item>

      <a-form-item label="metaInfo" v-bind="formItemLayout">
        <a-input v-decorator="['metaInfo']" />
      </a-form-item>
      <a-form-item label="是否菜单" v-bind="formItemLayout">
        <a-switch v-model="isMenu" />
      </a-form-item>
      <a-form-item label="菜单排序" v-bind="formItemLayout">
        <a-input-number v-decorator="['orderNum']" style="width: 100%" />
      </a-form-item>
      <a-form-item
        label="上级菜单"
        style="margin-bottom: 2rem"
        v-bind="formItemLayout"
      >
        <a-tree
          ref="menuTree"
          :key="menuTreeKey"
          :checkable="true"
          :checkStrictly="true"
          @check="handleCheck"
          @expand="handleExpand"
          :expandedKeys="expandedKeys"
          :defaultCheckedKeys="defaultCheckedKeys"
          :treeData="menuTreeData"
        >
        </a-tree>
      </a-form-item>
    </a-form>
    <div class="drawer-bootom-button">
      <!--      <a-dropdown-->
      <!--        style="float: left"-->
      <!--        :trigger="['click']"-->
      <!--        placement="topCenter"-->
      <!--      >-->
      <!--        <a-menu slot="overlay">-->
      <!--          <a-menu-item key="1" @click="expandAll">展开所有</a-menu-item>-->
      <!--          <a-menu-item key="2" @click="closeAll">合并所有</a-menu-item>-->
      <!--        </a-menu>-->
      <!--        <a-button> 树操作 <a-icon type="up" /> </a-button>-->
      <!--      </a-dropdown>-->
      <a-popconfirm
        title="确定放弃编辑？"
        @confirm="onClose"
        okText="确定"
        cancelText="取消"
      >
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading"
        >提交</a-button
      >
    </div>
    <icons
      @choose="handleIconChoose"
      @close="handleIconCancel"
      :iconChooseVisible="iconChooseVisible"
    >
    </icons>
  </a-drawer>
</template>
<script>
import ApiUser from './../../../apis/user'

import Icons from './Icons'
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'MenuEdit',
  components: { Icons },
  props: {
    menuEditVisiable: {
      default: false
    },
    tree: Array
  },
  data() {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      menuTreeKey: +new Date(),
      menu: {
        icon: ''
      },
      checkedKeys: [],
      expandedKeys: [],
      defaultCheckedKeys: [],
      iconChooseVisible: false,
      isMenu: false
    }
  },
  computed: {
    menuTreeData() {
      //生成0 的list
      function recursionTree(tree) {
        let arr = []
        tree.length &&
          tree.forEach((item) => {
            if (item.root.type === 0) {
              let newItem = { ...item.root }
              newItem.title = newItem.menuName
              newItem.key = item.key
              newItem.children = item.children && recursionTree(item.children)
              arr.push(newItem)
            }
          })
        return arr
      }
      return recursionTree(this.tree)
    }
  },
  methods: {
    reset() {
      this.loading = false
      this.menuTreeKey = +new Date()
      this.expandedKeys = this.checkedKeys = this.defaultCheckedKeys = []
      this.menu = {}
      this.form.resetFields()
    },
    onClose() {
      this.reset()
      this.$emit('close')
    },
    handleCheck(checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    expandAll() {
      this.expandedKeys = this.allTreeKeys
    },
    closeAll() {
      this.expandedKeys = []
    },
    handleExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    chooseIcons() {
      this.iconChooseVisible = true
    },
    handleIconCancel() {
      this.iconChooseVisible = false
    },
    handleIconChoose(value) {
      this.menu.icon = value
      this.iconChooseVisible = false
    },
    deleteIcons() {
      this.menu.icon = ''
    },
    setFormValues({ ...menu }) {
      let fields = ['path', 'component', 'icon']
      Object.keys(menu).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = menu[key]
          this.form.setFieldsValue(obj)
        }
      })
      this.form.getFieldDecorator('menuName')
      this.form.setFieldsValue({ menuName: menu.menuName })
      this.form.getFieldDecorator('permission')
      this.form.setFieldsValue({ permission: menu.permission })
      this.form.getFieldDecorator('orderNum')
      this.form.setFieldsValue({ orderNum: menu.orderField })
      this.menu.icon = menu.icon
      this.form.getFieldDecorator('metaInfo')
      this.form.setFieldsValue({ metaInfo: menu.metaInfo })
      // this.form.getFieldDecorator('isMenu')
      // this.form.getFieldValue({ isMenu: menu.type === 0 })
      this.isMenu = menu.type === 0
      if (menu.parentId !== 0) {
        this.defaultCheckedKeys.push(menu.parentId)
        this.checkedKeys = this.defaultCheckedKeys
        this.expandedKeys = this.checkedKeys
      }

      this.menu.menuId = menu.menuId
      this.menuTreeKey = +new Date()
    },
    handleSubmit() {
      let checkedArr = Object.is(this.checkedKeys.checked, undefined)
        ? this.checkedKeys
        : this.checkedKeys.checked
      if (checkedArr.length > 1) {
        this.$message.error('最多只能选择一个上级菜单，请修改')
        return
      }
      if (checkedArr[0] === this.menu.menuId) {
        this.$message.error('不能选择自己作为上级菜单，请修改')
        return
      }
      this.form.validateFields((err) => {
        if (!err) {
          this.loading = true
          let icon = this.menu.icon
          let menu = this.form.getFieldsValue()
          menu.icon = icon
          menu.menuId = this.menu.menuId
          if (checkedArr.length) {
            menu.parentId = checkedArr[0]
          } else {
            menu.parentId = ''
          }
          // 0 表示菜单 1 表示按钮
          menu.menuType = this.isMenu ? 0 : 2
          menu.orderField = menu.orderNum
          ApiUser.menuUpdate(menu)
            .then(() => {
              this.loading = false
              this.$emit('success')
              this.reset()
            })
            .catch((err) => {
              this.loading = false
              err.errMsg && this.$message.error(err.errMsg)
            })
        }
      })
    }
  },
  watch: {}
}
</script>
