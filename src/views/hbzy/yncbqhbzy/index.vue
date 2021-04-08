<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="标识码" prop="bsm">
        <el-input
          v-model="queryParams.bsm"
          placeholder="请输入标识码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="要素代码" prop="ysdm">
        <el-input
          v-model="queryParams.ysdm"
          placeholder="请输入要素代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区县名称" prop="qxmc">
        <el-input
          v-model="queryParams.qxmc"
          placeholder="请输入区县名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['hbzy:yncbqhbzy:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['hbzy:yncbqhbzy:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['hbzy:yncbqhbzy:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['hbzy:yncbqhbzy:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="yncbqhbzyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="标识码" align="center" prop="bsm"/>
      <el-table-column label="要素代码" align="center" prop="ysdm"/>
      <el-table-column label="区县名称" align="center" prop="qxmc"/>
      <el-table-column label="乡镇名称" align="center" prop="xzmc"/>
      <el-table-column label="行政村名称" align="center" prop="xzqmc"/>
      <el-table-column label="图斑面积" align="center" prop="tbmj"/>
      <el-table-column label="地类名称" align="center" prop="dlmc"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="text"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['hbzy:yncbqhbzy:edit']"
          >修改
          </el-button>
          <el-button
            size="medium"
            type="text"
            @click="handleSlsj(scope.row)">
            矢量
          </el-button>
          <el-button
            size="medium"
            type="text"
            @click="handlePhoto(scope.row)">
            图片
          </el-button>
          <el-button
            size="medium"
            type="text"
            @click="handleDelete(scope.row)"
            v-hasPermi="['hbzy:yncbqhbzy:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改永农储备区后备资源对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="要素代码" prop="ysdm">
              <el-input v-model="form.ysdm" placeholder="请输入要素代码"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="区县代码" prop="qxdm">
              <el-input v-model="form.qxdm" placeholder="请输入区县代码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="区县名称" prop="qxmc">
              <el-input v-model="form.qxmc" placeholder="请输入区县名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="乡镇代码" prop="xzdm">
              <el-input v-model="form.xzdm" placeholder="请输入乡镇代码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="乡镇名称" prop="xzmc">
              <el-input v-model="form.xzmc" placeholder="请输入乡镇名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="行政村代码" prop="xzqdm">
              <el-input v-model="form.xzqdm" placeholder="请输入行政村代码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="行政村名称" prop="xzqmc">
              <el-input v-model="form.xzqmc" placeholder="请输入行政村名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="图斑编号" prop="tbbh">
              <el-input v-model="form.tbbh" placeholder="请输入图斑编号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="图斑面积" prop="tbmj">
              <el-input v-model="form.tbmj" placeholder="请输入图斑面积"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="地类名称" prop="dlmc">
              <el-input v-model="form.dlmc" placeholder="请输入地类名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="潜力来源" prop="glly">
              <el-input v-model="form.glly" placeholder="请输入潜力来源"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="bz">
              <el-input v-model="form.bz" type="textarea" placeholder="请输入备注"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明" prop="sm">
              <el-input v-model="form.sm" type="textarea" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listYncbqhbzy,
  getYncbqhbzy,
  delYncbqhbzy,
  addYncbqhbzy,
  updateYncbqhbzy,
  exportYncbqhbzy
} from '@/api/hbzy/yncbqhbzy'

export default {
  name: 'Yncbqhbzy',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 永农储备区后备资源表格数据
      yncbqhbzyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bsm: undefined,
        ysdm: undefined,
        qxmc: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询永农储备区后备资源列表 */
    getList() {
      this.loading = true
      listYncbqhbzy(this.queryParams).then(response => {
        this.yncbqhbzyList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        bsm: undefined,
        ysdm: undefined,
        qxdm: undefined,
        qxmc: undefined,
        xzdm: undefined,
        xzmc: undefined,
        xzqdm: undefined,
        xzqmc: undefined,
        tbbh: undefined,
        tbmj: undefined,
        dlmc: undefined,
        glly: undefined,
        zpbh: undefined,
        bz: undefined,
        sm: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.bsm)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加永农储备区后备资源'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const bsm = row.bsm || this.ids
      getYncbqhbzy(bsm).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改永农储备区后备资源'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.bsm != undefined) {
            updateYncbqhbzy(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addYncbqhbzy(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const bsms = row.bsm || this.ids
      this.$confirm('是否确认删除永农储备区后备资源编号为"' + bsms + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delYncbqhbzy(bsms)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有永农储备区后备资源数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportYncbqhbzy(queryParams)
      }).then(response => {
        this.download(response.msg)
      }).catch(function() {
      })
    }
  }
}
</script>
