<template>
  <div class="content">
    <div class="back">
        <img src="@/assets/back.png" width="20px" @click="goBack">
    </div>
    <div id="main" style="width:100%; height:400px;"></div>
    <button @click="startCount">startCount</button>
    <button @click="stopCount">stopCount</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as echarts from 'echarts';
export default {
    data(){
        return {
            myChart:{},
            task:{},
            gaugeData: []
        }
    },
    computed: {
        ...mapState(['timerInfo']),
    },
    mounted(){
        console.log("timerInfo", this.timerInfo)
        this.initChart()
    },
    methods:{
        initChart(){
            this.myChart = echarts.init(document.getElementById('main'));
            var option;
            this.gaugeData = [
              {
                value: 20,
                name: 'Perfect',
                title: {
                  show:false,
                },
                detail: {
                  show:false,
                }
              },
              {
                value: 40,
                name: 'Good',
                title: {
                  show:false,
                },
                detail: {
                  show:false,
                }
              },
              {
                value: 60,
                name: 'Commonly',
                title: {
                  show:false,
                },
                detail: {
                  show:false,
                }
              }
            ];
            option = {
              series: [
                {
                  type: 'gauge',
                  startAngle: 90,
                  endAngle: -270,
                  pointer: {
                    show: false
                  },
                  progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: false,
                  },
                  axisLine: {
                    lineStyle: {
                      width: 40
                    }
                  },
                  splitLine: {
                    show: false,
                    distance: 0,
                    length: 10
                  },
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: false,
                    distance: 50
                  },
                  data: this.gaugeData,
                  title: {
                    fontSize: 14
                  },
                  detail: {
                    width: 50,
                    height: 14,
                    fontSize: 14,
                    color: 'inherit',
                    borderColor: 'inherit',
                    borderRadius: 20,
                    borderWidth: 1,
                    formatter: '{value}%'
                  }
                }
              ]
            };

            option && this.myChart.setOption(option);

        },
        goBack(){
            this.$router.back()
        },
        startCount(){
            if(this.gaugeData.length == 0){
                return
            }
            let that = this
            this.task = setInterval(function () {
                that.gaugeData[0].value = that.gaugeData[0].value -0.1 <= 0  ? 0 : that.gaugeData[0].value -0.1;
                that.gaugeData[1].value = that.gaugeData[1].value -0.1 <= 0  ? 0 : that.gaugeData[1].value -0.1;
                that.gaugeData[2].value = that.gaugeData[2].value -0.1 <= 0  ? 0 : that.gaugeData[2].value -0.1;
                that.myChart.setOption({
                  series: [
                    {
                      data: that.gaugeData,
                      pointer: {
                        show: false
                      }
                    }
                  ]
                });
            }, 100);            
        },
        stopCount(){
            clearInterval(this.task)
        }
    }
}
</script>

<style lang="less" scoped>
.content{
    margin: 20px;

    .back{
        text-align: left;
    }
}
</style>