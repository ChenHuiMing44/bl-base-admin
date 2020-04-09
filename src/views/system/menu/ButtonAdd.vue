<template>
  <a-drawer
    title="新增按钮"
    :maskClosable="false"
    width="650"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="buttonAddVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-form :form="form">
      <a-form-item label="按钮名称" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'menuName',
            {
              rules: [
                { required: true, message: '按钮名称不能为空' },
                { max: 10, message: '长度不能超过10个字符' }
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
  </a-drawer>
</template>
<script>
import ApiUser from './../../../apis/user'

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'ButtonAdd',
  props: {
    buttonAddVisiable: {
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
      button: {},
      checkedKeys: [],
      expandedKeys: []
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
      this.expandedKeys = this.checkedKeys = []
      this.button = {}
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
    handleSubmit() {
      let checkedArr = Object.is(this.checkedKeys.checked, undefined)
        ? this.checkedKeys
        : this.checkedKeys.checked
      if (!checkedArr.length) {
        this.$message.error('请为按钮选择一个上级菜单')
        return
      }
      if (checkedArr.length > 1) {
        this.$message.error('最多只能选择一个上级菜单，请修改')
        return
      }
      this.form.validateFields((err) => {
        if (!err) {
          this.setButtonFields()
          this.loading = true
          if (checkedArr.length) {
            this.button.parentId = checkedArr[0]
          } else {
            this.button.parentId = ''
          }
          // 0 表示菜单 1 表示按钮
          this.button.menuType = 1
          this.button.orderField = 1
          ApiUser.menuAdd(this.button)
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
    setButtonFields() {
      let values = this.form.getFieldsValue(['menuName', 'permission'])
      if (typeof values !== 'undefined') {
        Object.keys(values).forEach((_key) => {
          this.button[_key] = values[_key]
        })
      }
    }
  },
  watch: {}
}
</script>
