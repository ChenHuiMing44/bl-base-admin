<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" size="small">
        <el-form-item label="用户名">
          <el-input v-model="listQuery.user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="渠道号">
          <el-autocomplete v-model="listQuery.channelNo" placeholder="渠道号" :fetch-suggestions="querySearch"></el-autocomplete>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="listQuery.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="listQuery.startDate"
            placeholder="起始时间"
            type="date"
          />
          <el-date-picker
            v-model="listQuery.endDate"
            placeholder="结束时间"
            type="date"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="listQuery.checked">显示失效</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addItem" icon="el-icon-plus">新增</el-button>
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
      :default-sort="listQuery.sort"
      style="width: 100%">
      <el-table-column label="#" align="center">
        <template slot-scope="{row,$index}">
          {{(listQuery.page - 1) * listQuery.pageSize + $index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="用户号?" align="center">
        <template slot-scope="{row}">{{row.id}}</template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" align="center" sortable="custom"/>
      <el-table-column label="时间" align="center" prop="time" sortable="custom">
        <template slot-scope="{row}"><i class="el-icon-time" style="margin-right: 5px"></i>{{row.time | timeFilter}}</template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{row}">{{row.remark}}</template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status ? 'success' : 'danger'">{{row.status ? '启用' : '禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleEdit(row, $index)">编辑</el-button>
          <el-button size="mini" :type="!row.status ? 'success' : 'danger'" @click="handleStatus(row, $index)">
            {{!row.status ? '启用' : '禁用'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="100" :page.sync="listQuery.page" :page-size.sync="listQuery.pageSize" @pageChange="queryList"/>
    <el-dialog :title="dialogType === 'add' ? '添加' : '编辑'" :visible.sync="showDialog">
      <el-form size="small" label-position="right" label-width="80px" class="form-item-space2">
        <el-form-item label="用户号:" prop="id" v-if="dialogTmp.id" class="form-item-space2">
          <el-input :value="dialogTmp.id" readonly/>
        </el-form-item>
        <el-form-item label="名称:" prop="name" class="form-item-space2">
          <el-input v-model="dialogTmp.name"/>
        </el-form-item>
        <el-form-item label="时间:" prop="time" >
          <el-date-picker v-model="dialogTmp.time" type="date"/>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input type="textarea" v-model="dialogTmp.remark" placehold="备注"/>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-switch v-model="dialogTmp.status"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="showDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
	import Pagination from "../../components/Pagination/index"


  export default {
		name: "User",
    components: {Pagination},
    data() {
		  return{
        total: 0,
        listLoading: false,
        listQuery: {
		      page: 1,
          pageSize: 10,
          //剩下的所有属性全放这里
          user: "",
          region: "",
          channelNo: "",
          startDate: "",
          endDate: new Date(),
          name: "",
          checked: false,
          sort: {prop: 'time', order: 'descending'}  //time   ascending 或者null null  初始化可以设置null null
        },
        list:[],
        showDialog: false,
        dialogType: "add",
        dialogTmp: ""
      }
    },
    computed: {
      //这个值是add时的初始化数据
      dialogAdd: () => ({name: "", time: new Date(), remark: "", status: true})
    },
    mounted(){
		  this.queryList();
    },
    methods: {
      queryList() {
        //queryData
        this.listLoading = true;
        this.total = 89;
        this.list = [
          {serial: 12, id: "23214324", time: "1832445543556", name: "王老五", remark: "sdffdsgsgfdhfgnhg", status: true},
          {serial: 12, id: "23214324", time: "1432454453556", name: "王老五", remark: "sdffdsgsgfdhfgnhg", status: false},
          {serial: 12, id: "23214324", time: "1342543556", name: "王老五", remark: "sdffdsgsgfdhfgnhg", status: false},
          {serial: 12, id: "23214324", time: "1423234543556", name: "王老五", remark: "sdffdsgsgfdhfgnhg", status: true},
          {serial: 12, id: "23214324", time: "13452243556", name: "王老五", remark: "sdffdsgsgfdhfgnhg", status: true},
          {serial: 12, id: "23214324", time: "1345422122556", name: "王老五", remark: "sdffdsgsgfdhfgnhg", status: false},
          {serial: 12, id: "23214324", time: "1213454213556", name: "王老五", remark: "sdffdsgsgfdhfgnhg", status: false},
          {serial: 12, id: "23214324", time: "1343242543556", name: "王老五", remark: "sdffdsgsgfdhfgnhg", status: false},
          {serial: 12, id: "23214324", time: "1933445432556", name: "王老五", remark: "sdffdsgsgfdhfgnhg", status: true},
          {serial: 12, id: "23214324", time: "134345435526", name: "王老五", remark: "sdffdsgsgfdhfgnhg", status: false}
        ]
        setTimeout(() => {
          this.listLoading = false;
        }, 2000)
      },
      search(){
        this.listQuery.page = 1
        this.queryList();
      },
      sortChange({prop, order}){
        console.log(order + "     " + prop );
        this.listQuery.sort = {order: order, prop: prop};
        this.queryList();
      },
      addItem(){
        this.dialogTmp = Object.assign({},this.dialogAdd);
        this.showDialog = true;
      },
      //点击编辑
      handleEdit(row, index){
        let tmp = Object.assign({},row);
        // debugger
        //因为后台传的时间可能是时间戳 时间显示的格式  但是在这里统统要转成date  可以写两个方法用链式法则调用看着简单点
        tmp.time = new Date(Number(tmp.time));
        this.dialogTmp = tmp;
        this.showDialog = true;
      },
      /**
       * @2019/4/21
       * @author: hm
       * @params: row 表示数据行  index表示当前数据处于list的下标
       * desc:  点击启用或者禁用
       */
      handleStatus(row, index){
        //query
        row.status = !row.status;
        this.$message.success("操作成功");
      },
      querySearch(queryString, cb) {
        let restaurants = [{value:"swdasd"},{value:"dfdsf"},{value: "sdgfsdg"},{value:"dasfsdf"},{value:"rttry"},{value:"mngbbf"},{value:"pklhjmfg"},{value:"qdaxc"}];
        let results = !queryString ? restaurants : restaurants.filter(res => {
          return new RegExp(queryString).test(res.value);
        }) ;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      handleUpdate(){
        //点击确认
        this.showDialog = false;
        this.$message.success("操作成功");
        this.queryList();
      }
    }
  }
</script>

<style scoped>

</style>