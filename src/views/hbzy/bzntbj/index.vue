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
          v-hasPermi="['hbzy:bzntbj:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['hbzy:bzntbj:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['hbzy:bzntbj:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['hbzy:bzntbj:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="bzntbjList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="标识码" align="center" prop="bsm" />
      <el-table-column label="要素代码" align="center" prop="ysdm" />
      <el-table-column label="区县名称" align="center" prop="qxmc" />
      <el-table-column label="乡镇名称" align="center" prop="xzmc" />
      <el-table-column label="行政区名称" align="center" prop="xzqmc" />
      <el-table-column label="图斑编号" align="center" prop="tbbh" />
      <el-table-column label="图斑面积" align="center" prop="tbmj" />
      <el-table-column label="上传时间" align="center" prop="time" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--icon="el-icon-edit"-->
          <el-button
            size="medium"
            type="text"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['hbzy:bzntbj:edit']"
          >修改</el-button>
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
          <!--icon="el-icon-delete"-->
          <el-button
            size="medium"
            type="text"
            @click="handleDelete(scope.row)"
            v-hasPermi="['hbzy:bzntbj:remove']"
          >删除</el-button>
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

    <!-- 添加或修改标准农田补建后备资源对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <!--<el-form-item label="标识码" prop="bsm">
          <el-input v-model="form.bsm" placeholder="请输入标识码" />
        </el-form-item>-->
        <el-row>
          <el-col :span = "13">
            <el-form-item label="要素代码" prop="ysdm">
              <el-input v-model="form.ysdm" placeholder="请输入要素代码" />
            </el-form-item>
          </el-col>
          <!--<el-col :span = "12" v-show="false">
            <el-form-item label="标识码" prop="bsm">
              <el-input v-model="form.bsm" placeholder="请输入标识码" disabled/>
            </el-form-item>
          </el-col>-->
          <el-col :span = "12">
            <el-form-item label="区县代码" prop="qxdm">
              <el-input v-model="form.qxdm" placeholder="请输入区县代码" />
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label="区县名称" prop="qxmc">
              <el-input v-model="form.qxmc" placeholder="请输入区县名称" />
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label="乡镇代码" prop="xzdm">
              <el-input v-model="form.xzdm" placeholder="请输入乡镇代码" />
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label="乡镇名称" prop="xzmc">
              <el-input v-model="form.xzmc" placeholder="请输入乡镇名称" />
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label="行政区代码" prop="xzqdm">
              <el-input v-model="form.xzqdm" placeholder="请输入行政区代码" />
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label="行政区名称" prop="xzqmc">
              <el-input v-model="form.xzqmc" placeholder="请输入行政区名称" />
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label="图斑编号" prop="tbbh">
              <el-input v-model="form.tbbh" placeholder="请输入图斑编号" />
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label="图斑面积" prop="tbmj">
              <el-input v-model="form.tbmj" placeholder="请输入图斑面积" />
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label="高标农建设" prop="gbnjs">
              <el-input v-model="form.gbnjs" placeholder="请输入高标农建设" />
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label="照片编号" prop="zpbh">
              <el-input v-model="form.zpbh" placeholder="请输入照片编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-form-item label="要素代码" prop="ysdm">
          <el-input v-model="form.ysdm" placeholder="请输入要素代码" />
        </el-form-item>
        <el-form-item label="区县代码" prop="qxdm">
          <el-input v-model="form.qxdm" placeholder="请输入区县代码" />
        </el-form-item>
        <el-form-item label="区县名称" prop="qxmc">
          <el-input v-model="form.qxmc" placeholder="请输入区县名称" />
        </el-form-item>
        <el-form-item label="乡镇代码" prop="xzdm">
          <el-input v-model="form.xzdm" placeholder="请输入乡镇代码" />
        </el-form-item>
        <el-form-item label="乡镇名称" prop="xzmc">
          <el-input v-model="form.xzmc" placeholder="请输入乡镇名称" />
        </el-form-item>
        <el-form-item label="行政区代码" prop="xzqdm">
          <el-input v-model="form.xzqdm" placeholder="请输入行政区代码" />
        </el-form-item>
        <el-form-item label="行政区名称" prop="xzqmc">
          <el-input v-model="form.xzqmc" placeholder="请输入行政区名称" />
        </el-form-item>
        <el-form-item label="图斑编号" prop="tbbh">
          <el-input v-model="form.tbbh" placeholder="请输入图斑编号" />
        </el-form-item>
        <el-form-item label="图斑面积" prop="tbmj">
          <el-input v-model="form.tbmj" placeholder="请输入图斑面积" />
        </el-form-item>
        <el-form-item label="高标农建设" prop="gbnjs">
          <el-input v-model="form.gbnjs" placeholder="请输入高标农建设" />
        </el-form-item>
        <el-form-item label="照片编号" prop="zpbh">
          <el-input v-model="form.zpbh" placeholder="请输入照片编号" />
        </el-form-item>-->
        <el-form-item label="备注" prop="bz">
          <el-input v-model="form.bz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="说明" prop="sm">
          <el-input v-model="form.sm" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <!--<el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据-->
          <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBzntbj, getBzntbj, delBzntbj, addBzntbj, updateBzntbj, exportBzntbj, importTemplate } from "@/api/hbzy/bzntbj";
import { getToken } from "@/utils/auth";
export default {
  name: "Bzntbj",
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
      // 标准农田补建后备资源表格数据
      bzntbjList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bsm: undefined,
        ysdm: undefined,
        qxmc: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/hbzy/bzntbj/importData"
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询标准农田补建后备资源列表 */
    getList() {
      this.loading = true;
      listBzntbj(this.queryParams).then(response => {
        this.bzntbjList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
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
        gbnjs: undefined,
        zpbh: undefined,
        bz: undefined,
        sm: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.bsm)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加标准农田补建后备资源";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.bsm || this.ids
      getBzntbj(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改标准农田补建后备资源";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.bsm != undefined) {
            updateBzntbj(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addBzntbj(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.bsm || this.ids;
      this.$confirm('是否确认删除标准农田补建后备资源编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delBzntbj(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "标准农田补建后备资源导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then(response => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有标准农田补建后备资源数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportBzntbj(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
