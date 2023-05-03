<!-- eslint-disable vue/valid-v-slot -->
<template>
    <div class="userManagement">
        <div class="userManagement_btnGroup">
            <el-button type="primary" @click="openDialog('新增用户')">
                <el-icon>
                    <Plus />
                </el-icon>
                新增用户</el-button>
        </div>
        <!-- 添加用户对话框 -->
        <el-dialog v-model="addDialogVisible" :title="dialogTitle" width="80%">
            <el-form :model="addForm" ref="addFormRules" :rules="addFormRules">
                <el-form-item v-for="(item, index) in addFormItem" :key="index" :label="item.label" label-width="120px" :prop="item.key">
                    <el-input :type="item.type" v-model="addForm[item.key]" />
                </el-form-item>
                <el-form-item label="用户角色" label-width="120px" prop="authority">
                    <el-select v-model="addForm.authority" placeholder="请选择用户角色" style="width: 100%">
                        <el-option label="管理员" value="1" />
                        <el-option label="普通用户" value="2" />
                    </el-select>
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
        <div class="userManagement_content">
            <div class="userManagement_contentContainer">
                <el-table :data="listData" style="width: 100%" border height="100%">
                    <el-table-column v-for="(item, index) in userList" :key="index" :prop="item.prop" :label="item.label"
                        :min-width="item.width" />
                    <el-table-column fixed="right" label="操作" width="180">
                        <template #default="scope">
                            <el-button link type="primary" @click="openDialog('修改用户', scope.row.id)">修改</el-button>
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
import { confirmBox, succesMsg } from '@/common/utils/msgBox.js'

export default {
    components: {
        Plus,
    },
    data() {
        const equalToPassword = (rule, value, callback) => {
            if (this.addForm.password !== value) {
                callback(new Error("两次输入的密码不一致"));
            } else {
                callback();
            }
        }
        return {
            dialogTitle: '',
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
            addFormRules: {
                userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
                    {
                        pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        //pattern: /^1[3456789]\d{9}$/,
                        message: "请输入正确的手机号码",
                    }
                ],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                confirmPassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { required: true, validator: equalToPassword, trigger: "blur" }
                ],
                authority: [{ required: true, message: '请选择用户角色', trigger: ['change'] }]
            }
        };
    },
    created() {
        this.getData();
        this.userList = userList;
        this.addFormItem = addFormItem;
    },
    methods: {
        // 打开对话框
        openDialog(dialogTitle, id) {
            this.addDialogVisible = true
            this.dialogTitle = dialogTitle
            if(id) {
                axios({
                    method:'post',
                    url: '/user_api/user/getOne',
                    params: {
                        id:id
                    }
                }).then(res => {
                    this.addForm = res.data[0]
                }).catch(e => {
                    console.error(e)
                })
            }
        },
        // 获取列表数据
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
            confirmBox('确定删除吗？', '确定', null).then(() => {
                axios({
                    method: "get",
                    url: "/user_api/user/delete",
                    params: {
                        id: id
                    }
                })
                    .then((res) => {
                        if (res.status == '200') {
                            succesMsg('删除成功');
                            // 刷新列表
                            this.getData();
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
                    confirmBox('确定' + this.dialogTitle + '吗？', '确定', null).then(() => {
                        const url = this.dialogTitle === '新增用户' ? '/user_api/user/addUser' : '/user_api/user/update'
                        axios({
                            method: "post",
                            url: url,
                            data: this.addForm
                        })
                            .then((res) => {
                                if (res.status == '200') {
                                    succesMsg(res.data);
                                    this.addDialogVisible = false;
                                    // 刷新列表
                                    this.getData();
                                } else {
                                    alert(this.dialogTitle + '失败')
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
            
            
            console.log(`output->formName`,formName);
        },
        // 确定取消按钮
        addUserCancel() {
            confirmBox('确定取消' + this.dialogTitle + '操作吗？', '确定', null).then(() => {
                this.addDialogVisible = false;
            }).catch(e => {
                console.log(e + '操作已取消')
            })
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
