<template>
<el-container class="platformLayout">
    <el-header class="platformLayout__header">
        <div>pic-logo</div>
        <div class="platformLayout__header-btn" @click="toCockpit">工业云图驾驶舱</div>
    </el-header>
    <el-main>
        <el-menu
            default-active="初筛名单"
            class="platformLayout__menu"
        >
            <div v-for="(item, index) in platformMenu" :key="index">
                <el-sub-menu v-if="item.children" :index="item.name">
                    <template #title>
                        <span>{{ item.name }}</span>
                      </template>
                    <el-menu-item v-for="(it, i) in item.children" :key="i" :index="it.name" @click="toPage(it.path)">
                        {{ it.name }}
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-if="!item.children" :index="item.name" @click="toPage(item.path)">{{ item.name }}</el-menu-item>
            </div>
        </el-menu>
        <div class="platformLayout__content">
            <router-view />
        </div>
    </el-main>
</el-container>
</template>
<script>
import { platformMenu } from './platform.js';
export default {
    data() {
        return {
            platformMenu: []
        }
        
    },
    mounted() {
        this.platformMenu = platformMenu;
    },
    methods: {
        // handleOpen(key, keyPath) {
        //     console.log(key, keyPath)
        // },
        // handleClose(key, keyPath) {
        //     console.log(key, keyPath)
        // },
        toPage(path){
            this.$router.push(path)
        },
        toCockpit(){
            this.$router.push('/cockpit')
        }
    }
}
</script>
<style lang="less" scoped>
.platformLayout {
    flex-direction: column;
    height: 100%;
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: white;
        background-color: rgb(27, 31, 51);
        &-btn {
            cursor: pointer;
            padding: 6px 14px;
            border: 1px solid white;
            border-radius: 50px;
            &:hover {
                color: #1989fa;
                border-color: #1989fa;
                background-color: white;
            }
        }
    }
    &__menu {
        width: 200px;
        min-height: 400px;
    }
    &__content {
        padding: 10px;
    }
}
/deep/ .el-main {
    display: flex;
    padding: 0;
}
</style>