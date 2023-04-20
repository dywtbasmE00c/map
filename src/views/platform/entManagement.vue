<!-- eslint-disable vue/valid-v-slot -->
<template>
    <div class="entManagement">
        <div class="entManagement_btnGroup">
            <div class="entManagement_btnGroup-btns">
            <el-button type="primary" @click="addDialogVisible = true">
                <el-icon>
                    <Plus />
                </el-icon>
                新增企业
            </el-button>
            <el-button type="primary" @click="exportExcel">导出企业数据</el-button>
            <el-input v-model="searchInput" placeholder="输入企业名称" clearable style="margin: 10px 0;">
                <template #suffix>
                    <el-icon @click="searchEnt" style="cursor: pointer"><Search /></el-icon>
                </template>
            </el-input>
            <el-select v-model="dataYear" @change="yearChange()" style="width: 140px; margin-right: 10px">
              <el-option
                v-for="item in timeSelect"
                :key="item.value"
                :label="item.label + '年'"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="entRule" @change="yearChange()" style="width: 140px; margin-right: 10px">
                  <el-option
                    v-for="item in entRuleSelect"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  />
            </el-select>
            <el-select v-model="entType" @change="yearChange()" style="width: 140px">
                  <el-option
                    v-for="item in entTypeSelect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
            </el-select>
            </div>
            <!-- el-upload 导入企业数据 -->
            <el-upload
                ref="upload"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :limit="1"
                :on-exceed="handleExceed"
                :auto-upload="false"
                :on-change="fileChange"
            >
                <template #trigger>
                <el-button type="primary">选择文件</el-button>
                </template>
                <el-button class="ml-3" type="success" @click="submitUpload" style="margin-left: 10px">
                文件上传
                </el-button>
                <template #tip>
                <div class="el-upload__tip">
                    仅限一个excel文件，新上传文件会覆盖旧文件
                </div>
                </template>
            </el-upload>
            
        </div>
        <!-- 添加用户对话框 -->
        <el-dialog v-model="addDialogVisible" title="新增企业" width="60%">
            <el-form :model="addForm" ref="addFormRules" :rules="addFormRules">
                <el-form-item v-for="(item, index) in addFormItem" :key="index" :label="item.label" label-width="180px"
                    :prop="item.prop">
                    <!-- 有children选项为select下拉框，否则为input -->
                    <el-select v-if="item.children" v-model="addForm[item.prop]" placeholder="请选择企业评价结果" style="width: 100%">
                        <el-option v-for="it in item.children" :key="item.childValueKey ? it[item.childValueKey] : it.childValue" :label="item.childLabelKey ? it[item.childLabelKey] : it.childLabel" :value="item.childValueKey ? it[item.childValueKey] : it.childValue" />
                    </el-select>
                    <el-input v-else v-model="addForm[item.prop]" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addUserCancel()">取消</el-button>
                    <el-button type="primary" @click="addUserConfirm('addFormRules')">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div class="entManagement_content">
            <div class="entManagement_contentContainer">
                <el-table :data="listData" style="width: 100%" border height="100%">
                    <el-table-column v-for="(item, index) in entList" :key="index" :prop="item.prop" :label="item.label"
                        :min-width="item.width" />
                    <el-table-column fixed="right" label="操作" width="180">
                        <template #default="scope">
                            <!-- <el-button link type="primary">修改</el-button> -->
                            <el-button link type="primary" @click.prevent="removeUser(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="entManagement_footer">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleChange" />
        </div>
    </div>
</template>
<script>
import { Plus, Search } from "@element-plus/icons-vue";
import axios from "axios";
import { entList, addFormItem, addFormRules } from "./entManagement/entList"
import { confirmBox, succesMsg, warnMsg } from '@/common/utils/msgBox.js'

import { genFileId } from 'element-plus'

export default {
    components: {
        Plus,
        Search
    },
    data() {
        return {
            searchInput: '', //搜索框
            current: 1, //当前页数
            total: 0,
            entList: [],
            listData: [],
            // 添加角色对话框
            addDialogVisible: false,
            // 添加角色信息
            addForm: {
                entName: '',
                creditCode: null,
                dataYear: null,
                areaCode: '',
                entRule: '',
                entType: '',
                latitude: 0,
                longitude: 0,
                code: '',
                landAreaVacate: 0,
                allEnergyConsumeVacate: 0
            },
            addFormItem: [],
            addFormRules: {},
            // 上传
            uploadFiles: null,
            //时间筛选
            dataYear: 2023,
            timeSelect: [
                {
                    label: 2023,
                    value: 2023
                },
                {
                    label: 2022,
                    value: 2022
                },
                {
                    label: 2021,
                    value: 2021
                },
                {
                    label: 2020,
                    value: 2020
                },
            ],
            entRule: null,
            entRuleSelect: [
                {
                    label: '全部',
                    value: null
                },
                {
                    label: '规上企业',
                    value: '0'
                },
                {
                    label: '规下企业',
                    value: '1'
                },
            ],
            entType: null,
            entTypeSelect: [
                {
                    label: '全部',
                    value: null
                },
                
                {
                    label: 'A',
                    value: 'A'
                },
                {
                    label: 'B',
                    value: '0'
                },
                {
                    label: 'C',
                    value: 'C'
                },
                {
                    label: 'D',
                    value: 'D'
                },
                {
                    label: '暂无评价',
                    value: '暂无评价'
                },
            ]
        };
    },
    created() {
        this.getData();
        this.entList = entList;
        this.addFormItem = addFormItem;
        this.addFormRules = addFormRules;
        this.getCounty();
        this.getIndustry();
    },
    methods: {
        // 获取列表数据
        getData(current) {
            console.log(`output->current`,current)
            if(current) {
                this.current = current;
            }
            axios({
                method: "post",
                url: "/user_api/entData/dataList",
                baseURL: "",
                params: {
                    current: this.current ,
                    size: 10
                },
                data: {
                    entName: this.searchInput,
                    dataYear: this.dataYear,
                    entRule: this.entRule,
                    entType: this.entType
                }
            })
                .then((res) => {
                    this.listData = res.data.data.records;
                    this.total = res.data.data.total;
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        // 删除
        removeUser(id) {
            confirmBox('确定删除吗？', '确定', null).then(() => {
                axios({
                    method: "get",
                    url: "/entData/removeEntData",
                    baseURL: "/user_api",
                    params: {
                        id: id
                    }
                })
                    .then((res) => {
                        if (res.status == '200') {
                            succesMsg('删除成功');
                            // 刷新列表
                            this.getData(1);
                        } else {
                            console.log(`output->删除失败`)
                        }
                        console.log(`output->res`, res);
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            }).catch(e => {
                console.log(e + '操作已取消')
            })

        },
        // 添加人员确定按钮
        addUserConfirm(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 验证通过后执行的操作
                    confirmBox('确定添加吗？', '确定', null).then(() => {
                        axios({
                            method: "post",
                            url: "/entData/saveEntData",
                            baseURL: "/user_api",
                            data: this.addForm
                        })
                            .then((res) => {
                                if (res.status == '200') {
                                    succesMsg(res.data.msg);
                                    this.addDialogVisible = false;
                                    // 刷新列表
                                    this.getData(1);
                                } else {
                                    alert('添加失败')
                                }

                            })
                            .catch((e) => {
                                console.error(e);
                            });
                    }).catch(e => {
                        console.log(e + '操作失败')
                    })
                } else {
                    console.log('error submit!!');   //  验证不通过执行的操作
                    return false;
                }
            });


            console.log(`output->formName`, formName);
        },
        addUserCancel() {
            confirmBox('确定取消添加操作吗？', '确定', null).then(() => {
                this.addDialogVisible = false;
            }).catch(e => {
                console.log(e + '操作已取消')
            })
        },
        // 企业搜索
        searchEnt() {
            this.getData(1);
        },
        // 分页
        handleChange(val) {
            console.log(`output->val`,val)
            this.getData(val)
        },
        // 导出excel
        exportExcel() {
            axios({
                method: 'post',
                url: "/entData/exportExcel",
                baseURL: "/user_api",
                responseType: 'blob'
            }).then(res =>{
                const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
                const fileName = 'xxx.xls';
                const linkNode = document.createElement('a');

                linkNode.download = fileName; //a标签的download属性规定下载文件的名称
                linkNode.style.display = 'none';
                linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
                document.body.appendChild(linkNode);
                linkNode.click();  //模拟在按钮上的一次鼠标单击

                URL.revokeObjectURL(linkNode.href); // 释放URL 对象
                document.body.removeChild(linkNode);

            }).catch(e => {
                console.error(e)
            })
        },
        // 上传-替换
        handleExceed(files)  {
            console.log(`output->files`, files)
            this.$refs['upload'].clearFiles()
            const file = files[0]
            file.uid = genFileId()
            this.$refs['upload'].handleStart(file)
            
        },
        // 提交
        submitUpload() {
            let param = new FormData();
            param.append("file", this.uploadFiles.raw);
            // this.uploadFiles.forEach(
            //     (val) => {
            //         param.append("file", val.raw);
            //     }
            // );

            axios.post("/user_api/entData/importExcel", param)
                .then(res => {
                    if(res.data.code === 200) {
                        succesMsg('上传成功');
                        this.getData(1)
                    } else {
                        warnMsg(res.data.msg)
                    }
                }).catch(e => {
                    console.error(e)
                })
        },
        // 上传-获取当前文件
        fileChange(fileList){
            this.uploadFiles = fileList;
        },
        // 初始化地区
        getCounty() {
            axios.get('/user_api/public/getAllQZDictArea')
                .then(res => {
                    if(res.data.code === 200) {
                        const index = this.addFormItem.findIndex((obj) => { return obj.prop === 'areaCode'; })
                        this.addFormItem[index].children = res.data.data
                    } else {
                        warnMsg(res.data.msg)
                    }
                })
        },
        getIndustry() {
            axios.get('/user_api/public/getAllDictIndustry')
                .then(res => {
                    if (res.data.code === 200) {
                        const index = this.addFormItem.findIndex((obj) => { return obj.prop === 'industryCode'; })
                        this.addFormItem[index].children = res.data.data
                    } else {
                        warnMsg(res.data.msg)
                    }
                })
        },
        yearChange() {
            this.getData(1)
        }
    }
};
</script>
<style lang="less" scoped>
.entManagement {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    &_btnGroup {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    &_content {
        position: relative;
        flex: 1;

        &Container {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    }
    &_footer {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
}
</style>
