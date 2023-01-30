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
            for(let i = this.timerInfo.nodes.length - 1; i > -1; i--){              
              let hours = parseInt(String(this.timerInfo.nodes[i]).split(":")[0])
              let minutes = parseInt(String(this.timerInfo.nodes[i]).split(":")[1])
              let totalSec = parseInt((hours * 60 + minutes) * 60)
              this.gaugeData.push({
                value: totalSec,
                name: '',
                title: {
                  show:false,
                },
                detail: {
                  show:true,
                  offsetCenter: ['0%', `-${i * 20}%`]
                }
              })
            }
            console.log("this.gaugeData",this.gaugeData)
            option = {
              animationDurationUpdate:0,
              series: [
                {
                  type: 'gauge',
                  startAngle: 90,
                  endAngle: -270,
                  min: 0,
                  max: this.gaugeData[0].value,
                  pointer: {
                    show: false
                  },
                  progress: {
                    show: true,
                    overlap: true,
                    roundCap: true,
                    clip: true,
                    width:30,
                  },
                  axisLine: {
                    lineStyle: {
                      width: 30
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
                    // borderColor: 'inherit',
                    // borderRadius: 20,
                    // borderWidth: 1,
                    // formatter: '{value}%'
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
              that.gaugeData.forEach(item => {
                item.value = parseFloat(item.value - 0.1 <= 0  ? 0 : item.value - 0.1).toFixed(3);                
              });
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