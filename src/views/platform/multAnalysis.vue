<template>
    <div class="multAnalysis">
        <div class="multAnalysis-nav">
            <el-menu
                :default-active="activekey"
                mode="horizontal"
                @select="handleSelect"
            >
                <el-menu-item v-for="item in menuItem" :key="item.key" :index="item.key">{{ item.label }}</el-menu-item>
            </el-menu>
        </div>
        <div class="multAnalysis-chart">
            <div class="multAnalysis-chart-btns">
                <el-radio-group v-model="tabSelect" @change="radioChange">
                    <el-radio-button v-for="item in radioItem" :key="item.key" :label="item.key">{{ item.label }}</el-radio-button>
                </el-radio-group>
                <el-select v-model="dataYear" @change="yearChange()" style="margin-left: 10px;">
                <el-option
                    v-for="item in timeSelect"
                    :key="item.value"
                    :label="item.label + '年'"
                    :value="item.value"
                />
                </el-select>
            </div>
            <div class="multAnalysis-chart-charts">
                <div class="myEChartsBar" id="myEChartsBar"></div>
                <div class="pieCharts" id="pieCharts"></div>
            </div>
        </div>
        <div class="multAnalysis-listTitle">列表概览</div>
        <div class="multAnalysis-list">
            <div class="multAnalysis-listContainer">
                <el-table :data="listData" height="100%" style="width: 100%" border>
                    <el-table-column v-for="item in listItem" :key="item.prop" :prop="item.prop" :label="item.label" :min-width="item.width" :fixed="item.fixed" />
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { getAttrs, getObjData } from '@/common/utils/others.js'
export default {
    data() {
        return {
            // 一级选择
            activekey: '1',
            menuItem: [
                {
                    label: '高耗低效区域分析',
                    key: '1'
                },
                {
                    label: '高耗低效行业（产业）分析',
                    key: '2'
                },
                {
                    label: '高耗低效评价结果分析',
                    key: '3'
                }
            ],
            // 二级选择-chart
            tabSelect: 'number',
            radioItem: [
                {
                    label: '整治企业数量',
                    key: 'number'
                },
                {
                    label: '腾出用地',
                    key: 'landAreaVacate'
                },
                {
                    label: '腾出用能',
                    key: 'allEnergyConsumeVacate'
                }
            ],
            // 年份
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
            listData: [],
            listItem: [
                {
                    label: '序号',
                    prop: 'id',
                    width: 100,
                    fixed: true
                },
                {
                    label: '区域',
                    prop: 'binning',
                    width: 200,
                    fixed: true
                },
                {
                    label: '整治企业数（家）',
                    prop: 'number',
                    width: 180
                },
                {
                    label: '完成率（%）',
                    prop: 'numberCompletionRate',
                    width: 120
                },
                {
                    label: '占比（%）',
                    prop: 'numberProportion',
                    width: 100
                },
                {
                    label: '腾出用地（万亩）',
                    prop: 'landAreaVacate',
                    width: 180
                },
                {
                    label: '完成率（%）',
                    prop: 'landAreaVacateCompletionRate',
                    width: 120
                },
                {
                    label: '占比（%）',
                    prop: 'landAreaVacateProportion',
                    width: 100
                },
                {
                    label: '腾出用能（万吨标煤）',
                    prop: 'allEnergyConsumeVacate',
                    width: 180
                },
                {
                    label: '完成率（%）',
                    prop: 'allEnergyConsumeVacateCompletionRate',
                    width: 120
                },
                {
                    label: '占比（%）',
                    prop: 'allEnergyConsumeVacateProportion',
                    width: 100
                },
            ],
            chartOneLine: [],
            chartOneData: []

        }
    },
    created() {
        this.getListData()
    },
    mounted() {
        
    },
    methods: {
        //顶部切换
        handleSelect(key) {
            this.activekey = key
            this.getListData()
        },
        //年份切换
        yearChange() {
            this.getListData()
        },
        //radio切换
        radioChange() {
            this.changeBar()
            this.pieCharts()
        },
        // 获得数据
        getListData() {
            axios({
                method:'get',
                url: '/user_api/analysis/multidimensionalAnalysis',
                params: {
                    type: Number(this.activekey),
                    dataYear: this.dataYear
                }
            }).then(res => {
                if(res.data.code === 200) {
                    this.listData = res.data.data
                    this.changeBar();
                    this.pieCharts();
                }
            }).catch(e => {
                console.error(e)
            })
        },
        // 柱状图
        changeBar() {
            const myEChart = this.$echarts.init(document.getElementById("myEChartsBar"));
            const option = {
                tooltip: {
                    trigger: 'item',
                },
                xAxis: {
                    data: getAttrs(this.listData, 'binning'),
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
                        formatter: function (params) {
                            var val = "";
                            if (params.length > 6) {
                                val = params.substr(0, 6) + '..';
                                return val;
                            } else {
                                return params;
                            }
                        }
                    },
                },
                yAxis: [
                    
                    {
                        type: 'value',
                        name: this.tabSelect === 'number' ? '整治企业数（家）' : this.tabSelect === 'landAreaVacate' ? '腾出用地（万亩）' : '腾出用能（万吨标煤）',
                        show: true,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#5e859e',
                                width: 2
                            }
                        }
                    },
                    {
                        type: 'value',
                        name: '完成率',
                        // min: 0,
                        // max: 100,
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#5e859e',//纵坐标轴和字体颜色
                                width: 2
                            }
                        }
                    },
                ],
                series: [
                    {
                        name: this.tabSelect === 'number' ? '整治企业数（家）' : this.tabSelect === 'landAreaVacate' ? '腾出用地（万亩）' : '腾出用能（万吨标煤）',
                        type: "bar",
                        data: getAttrs(this.listData, this.tabSelect),
                    },
                    {
                        name: '完成率',
                        data: getAttrs(this.listData, this.tabSelect+'CompletionRate'),
                        type: 'line',
                        yAxisIndex: 1
                    }
                ],
            };
            myEChart.setOption(option);
            // 根据页面大小自动响应图表大小
            window.addEventListener("resize", function () {
                myEChart.resize();
            });
        },
        pieCharts() {
            const myEChart = this.$echarts.init(document.getElementById("pieCharts"));
            const option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 40,
                    top: 20,
                    bottom: 20,
                    formatter: function (params) {
                        var val = "";
                        if (params.length > 6) {
                            val = params.substr(0, 6) + '...';
                            return val;
                        } else {
                            return params;
                        }
                    }
                },
                series: [
                    {
                        name: this.tabSelect === 'number' ? '整治企业数（家）' : this.tabSelect === 'landAreaVacate' ? '腾出用地（万亩）' : '腾出用能（万吨标煤）',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['40%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        data: getObjData(this.listData, 'binning' ,this.tabSelect)
                    }
                ]
            };
            myEChart.setOption(option);
            // 根据页面大小自动响应图表大小
            window.addEventListener("resize", function () {
                myEChart.resize();
            });
        },
    }
}
</script>
<style lang="less" scoped>
.multAnalysis {
    display: flex;
    flex-direction: column;
    height: 100%;
    &-chart {
        height: 300px;
        margin-top: 10px;
        &-btns {
            display: flex;
        }
        &-charts {
            display: flex;
            width: 100%;
            height: 100%;
            .myEChartsBar {
                height: 90%;
                width: 60%;
            }
            .pieCharts {
                height: 90%;
                width: 40%;
            }
        }
    }
    &-list {
        position: relative;
        flex: 1;
        margin-top: 10px;
        &Container {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    }
}
</style>