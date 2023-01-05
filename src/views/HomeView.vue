<template>
<div class="content">
  <div class="home">
    <div class="top">
      Time to make <br>your soul relax
    </div>
    <div class="top-small">
      Getting more focus in a couple of<br>minutes with a simple movement
    </div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id" @click="changeItem(item)">
        <img src="@/assets/remove.png" width="20px" style="z-index:2" v-if="isCustom" @click="remove(item)">
        <div class="title" @click="editItem(item)">{{item.title}}</div>
        <img src="@/assets/checked.png" width="20px" v-if="!isCustom && checkedId == item.id">
      </div>
      <div class="item" v-if="isCustom" @click="showPopup">
        <div class="title" style="color:rgb(0,166,89)">+添加自定义计时</div>
      </div>
    </div>
    <div class="btn-list">
      <van-button @click="custom"
        color=" linear-gradient(to right, #0aa0ee, #1989FA)" class="btn custom-btn">
        自定义
      </van-button>
      <van-button @click="start"
        color="linear-gradient(to right, #ff6034, #ee0a24)" class="btn">
        开始计时
      </van-button>
    </div>
  </div>

    <!-- 添加计时弹窗 -->
    <van-popup v-model="isShowPopup" round position="bottom" >
      <div class="popup-title">添加计时计划</div>
      <div class="popup-content">
        <van-cell-group>
          <van-field v-model="timerName" label="计时名称" placeholder="请输入名称" maxlength="8" input-align="right"/>
          <!-- <van-cell title="单元格" is-link value="内容" /> -->
          <van-cell is-link @click="()=>{isShowTimerPopup = true; currentIndex = index}" title-style="text-align: left;"
            v-for="(node, index) in nodes" title="设置时长" :value="node" :key="index"/>
          <van-cell is-link @click="()=>{this.nodes.push('00:00')}">            
            <span class="custom-title">添加节点</span>
            <template #right-icon>
              <van-icon name="plus" style="margin-right:2px"/>
            </template>
          </van-cell>
          <van-button type="primary" size="large" class="popup-btn" @click="submit">保存</van-button>
        </van-cell-group>
      </div>
    </van-popup>

    <!-- 选择时间弹窗 -->
    <van-popup v-model="isShowTimerPopup" round position="bottom" :style="{ height: '40%' }" >
      <van-datetime-picker v-model="currentTime" @confirm="confirm" @cancel="()=>{isShowTimerPopup = false}" type="time" title="选择时间" :formatter="formatter"  :min-hour="0"  :max-hour="24"/>
    </van-popup>

</div>
</template>

<script>

export default {
  name: 'HomeView',
  data(){
    return{
      isCustom: false,
      isShowPopup:false,
      isShowTimerPopup: false,
      checkedId: 0,
      currentTime: '00:00',
      currentIndex: 0,
      timerName:"",
      nodes:['00:00'],
      list:[
        {
          id: 0,
          title: "C2刷脸提醒计时",
          nodes: ['12:00', '25:00', '36:00']
        },
        {
          id: 1,
          title: "25分钟番茄计时",
          nodes: ['25:00']
        },
        {
          id: 2,
          title: "10分钟提醒计时",
          nodes: ['10:00']
        }
      ]
    }
  },
  methods:{
    custom(){
      this.isCustom = !this.isCustom
    },
    changeItem(item){
      this.checkedId = item.id
    },
    remove(item){
        let tempList = this.list.filter((v)=>{
          return v.id != item.id
        })
        this.list = tempList
    },
    editItem(item){
      if(!this.isCustom){
        return
      }
      console.log("editItem", item)

    },
    showPopup(){
      this.isShowPopup = true
    },
    formatter(type, val){
      return `${val}${type == "hour" ? "小时":"分钟"}`
    },
    confirm(v){
      this.nodes[this.currentIndex] = v
      this.isShowTimerPopup = !this.isShowTimerPopup
      this.currentTime = '00:00'
    },
    submit(){
      this.list.push({
        id: this.list[this.list.length - 1].id + 1,
        title: this.timerName,
        nodes: this.nodes
      })
      this.isShowPopup = false
    },
    start(){}
  }
}
</script>
<style lang="less" scoped>
.content{
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #ededed;
}
.home{
  margin: 10px 0 10px 5%;

  .top{
    font-size: 26px;
    text-align: left;
    margin-top: 20%;
    font-family: 'TVPS-Vain-Capital-2';
  }
  .top-small {
    text-align: left;
    margin-top: 4%;
    margin-bottom: 5%;
    font-family: 'JetBrainsMono-Light';
    font-size: 12px;
    font-weight: bold;
  }
  .btn-list{
    text-align: left;
    width: 50%;
    display: flex;
    justify-content: space-between;

    .btn{
      border-radius: 4px;
      font-family: 'JetBrainsMono-Light';
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .custom-btn{
      margin-right: 10px;
    }
    .start-btn{

    }
  }
  .list{
    text-align: left;
    margin-top: 10%;
    margin-bottom: 10%;
    font-family: 'JetBrainsMono-Light';
    // height: 500px;

    .item{
      width: 45%;
      margin: 10px 0;
      padding-right: 10px;
      border: 1px solid #ededed;
      background-color: #ffffff;
      // margin-right: 5%;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      border-radius: 5px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title{
        margin: 0 10px;
      }
    }
    .item-highlight{
      top: 0 !important;
    }
  }
  
}
.popup-title{
  margin: 20px 0 5px;
  font-size: 18px;
  font-weight: bold;
}
.popup-content{
  margin: 10px 20px;
}
.popup-btn{
  width: 60%;
  height: 35px;
  margin: 10px 0;
  border-radius: 5px;
}
</style>
