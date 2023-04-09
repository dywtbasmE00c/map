<!-- eslint-disable vue/valid-v-slot -->
<template>
    <div class="userManagement">
        <div class="userManagement_btnGroup">
            <el-button type="primary" @click="addDialogVisible = true">
                <el-icon>
                    <Plus />
                </el-icon>
                新增用户</el-button>
        </div>
        <!-- 添加用户对话框 -->
        <el-dialog v-model="addDialogVisible" title="新增用户" width="80%">
            <el-form :model="addForm" ref="addFormRules">
                <el-form-item v-for="(item, index) in addFormItem" :key="index" :label="item.label" label-width="120px">
                    <el-input :type="item.type" v-model="addForm[item.key]" />
                </el-form-item>
                <el-form-item label="用户角色" label-width="120px">
                    <el-select v-model="addForm.authority" placeholder="请选择用户角色权限" style="width: 100%">
                        <el-option label="管理员" value="1" />
                        <el-option label="普通用户" value="2" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="addUserConfirm('addFormRules')">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div class="userManagement_content">
            <div class="userManagement_contentContainer">
                <el-table :data="listData" style="width: 100%" border height="100%">
                    <el-table-column v-for="(item, index) in userList" :key="index" :prop="item.prop" :label="item.label"
                        :min-width="item.width" />
                    <el-table-column fixed="right" label="操作" width="180">
                        <template #default="scope">
                            <el-button link type="primary">修改</el-button>
                            <el-button link type="primary" @click.prevent="removeUser(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import { Plus } from "@element-plus/icons-vue";
import axios from "axios";
import { userList, addFormItem } from "./userManagement/userList";

export default {
    components: {
        Plus,
    },
    data() {
        return {
            userList: [],
            listData: [],
            // 添加角色对话框
            addDialogVisible: false,
            // 添加角色信息
            addForm: {
                userName: '',
                phone: '',
                password: '',
                confirmPassword: '',
                authority: ''
            },
            addFormItem: [],
            // addFormRules: {
            //     userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
            //     phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
            //     password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            //     confirmPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
            //     // authority: [{ required: true, message: '请选择用户角色', trigger: 'change' }]
            // }
        };
    },
    created() {
        this.getData();
        this.userList = userList;
        this.addFormItem = addFormItem;
    },
    methods: {
        getData() {
            axios({
                method: "get",
                url: "/user/list",
                baseURL: "/user_api",
            })
                .then((res) => {
                    this.listData = res.data;
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        // 删除
        removeUser(id) {
            console.log(`output->scope`, id);
            axios({
                method: "get",
                url: "/user/delete",
                baseURL: "/user_api",
                params: {
                    id: id
                }
            })
                .then((res) => {
                    if(res.status == '200') {
                        console.log(`output->res.data`,res.data)
                        this.getData();
                    } else {
                        console.log(`output->删除失败`)
                    }
                    console.log(`output->res`, res);
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        // 添加人员确定按钮
        addUserConfirm(formName) {
            
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert('submit!');     // 验证通过后执行的操作
            //     } else {
            //         console.log('error submit!!');   //  验证不通过执行的操作
            //         return false;
            //     }
            // });
            axios({
                method: "post",
                url: "/user/addUser",
                baseURL: "/user_api",
                data: this.addForm
            })
                .then((res) => {
                    if(res.status == '200') {
                        alert(res.data);
                        this.addDialogVisible = false;
                        this.getData();
                    } else {
                        alert('添加失败')
                    }
                    
                })
                .catch((e) => {
                    console.error(e);
                });
            console.log(`output->formName`,formName);
            
            
        }
    },
};
</script>
<style lang="less" scoped>
.userManagement {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    &_btnGroup {
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
}
</style>
