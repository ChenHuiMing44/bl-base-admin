<template>
  <a-drawer
    title="新增菜单(页面)"
    :maskClosable="false"
    width="650"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="menuAddVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-form :form="form">
      <a-form-item label="名称" v-bind="formItemLayout">
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
            'perms',
            { rules: [{ max: 50, message: '长度不能超过50个字符' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="metaInfo" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'metaInfo',
            { rules: [{ max: 100, message: '长度不能超过100个字符' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="是否菜单" v-bind="formItemLayout">
        <a-switch v-decorator="['isMenu']" />
      </a-form-item>
      <a-form-item label="菜单排序" v-bind="formItemLayout">
        <a-input-number v-model="menu.orderNum" style="width: 100%" />
      </a-form-item>
      <a-form-item
        label="上级菜单"
        style="margin-bottom: 2rem"
        v-bind="formItemLayout"
      >
        <a-tree
          :key="menuTreeKey"
          :checkable="true"
          :checkStrictly="true"
          @check="handleCheck"
          @expand="handleExpand"
          :expandedKeys="expandedKeys"
          :treeData="menuTreeData"
        >
        </a-tree>
      </a-form-item>
    </a-form>
    <div class="drawer-bootom-button">
      <a-popconfirm
        title="确定放弃编辑？"
        @confirm="onClose"
        okText="确定"
        cancelText="取消"
      >
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading">
        提交
      </a-button>
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
import Icons from './Icons'
import ApiUser from './../../../apis/user'
import AFormItem from 'ant-design-vue/es/form/FormItem'

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'MenuAdd',
  components: { AFormItem, Icons },
  props: {
    menuAddVisiable: {
      default: false
    },
    tree: Array
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
  data() {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      menuTreeKey: +new Date(),
      menu: {},
      checkedKeys: [],
      expandedKeys: [],
      iconChooseVisible: false
    }
  },
  methods: {
    reset() {
      this.loading = false
      this.menuTreeKey = +new Date()
      this.expandedKeys = this.checkedKeys = []
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
    handleExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    handleIconCancel() {
      this.iconChooseVisible = false
    },
    handleIconChoose(value) {
      this.menu.icon = value
      this.iconChooseVisible = false
    },
    handleSubmit() {
      let checkedArr = Object.is(this.checkedKeys.checked, undefined)
        ? this.checkedKeys
        : this.checkedKeys.checked
      if (checkedArr.length > 1) {
        this.$message.error('最多只能选择一个上级菜单，请修改')
        return
      }
      this.form.validateFields((err) => {
        if (!err) {
          this.setMenuFields()
          this.loading = true
          if (checkedArr.length) {
            this.menu.parentId = checkedArr[0]
          } else {
            this.menu.parentId = 0
          }
          // 0 表示菜单 1 表示按钮 2页面
          this.menu.menuType = this.menu.isMenu ? 0 : 2
          this.menu.orderField = this.menu.orderNum
          ApiUser.menuAdd(this.menu)
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
    },
    setMenuFields() {
      let values = this.form.getFieldsValue([
        'menuName',
        'path',
        'component',
        'perms'
      ])
      if (typeof values !== 'undefined') {
        Object.keys(values).forEach((_key) => {
          this.menu[_key] = values[_key]
        })
      }
    }
  }
}
</script>
