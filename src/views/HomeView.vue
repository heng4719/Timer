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
        {{isCustom?"完成":"自定义"}}
      </van-button>
      <van-button @click="start"
        color="linear-gradient(to right, #ff6034, #ee0a24)" class="btn">
        开始计时
      </van-button>
    </div>
  </div>

    <!-- 添加计时弹窗 -->
    <van-popup v-model="isShowPopup" round position="bottom" >
      <div class="popup-title">{{ popupTitle }}</div>
      <div class="popup-content">
        <van-cell-group>
          <van-field v-model="timerName" label="计时名称" placeholder="请输入名称" required @input="inputTitle" maxlength="8" input-align="right"/>
          <div class="warningText" v-if="!hasPopupTitle">* 请输入名称</div>
          <!-- <van-cell is-link @click="setTimer(node, index)" title-style="text-align: left;"
            v-for="(node, index) in nodes" title="设置时长" :value="node" :key="index"/> -->

            <van-swipe-cell v-for="(node, index) in nodes" :key="index">
              <van-cell is-link @click="setTimer(node, index)" title-style="text-align: left;" title="设置时长" :value="node"/>
              <template #right>
                <van-button square type="danger" text="删除" @click="removeTimer(index)"/>
              </template>
            </van-swipe-cell>

          <van-cell is-link @click="()=>{this.nodes.push('00:00'); this.showWarning = false}">            
            <span class="custom-title">添加节点</span>
            <template #right-icon>
              <van-icon name="plus" style="margin-right:2px"/>
            </template>
          </van-cell>
          <div class="warningText" v-if="showWarning">* 计时不可为空或为零，请设置计时节点</div>

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
      checkedItem:{},
      currentTime: '00:00',
      currentIndex: 0,
      currentId: -1, //新增/修改计划的id
      timerName:"",
      popupTitle:"",
      nodes:['00:00'],
      hasPopupTitle: true,
      showWarning: false,
      list:[
        {
          id: 0,
          title: "C2刷脸提醒计时",
          nodes: ['00:01', '00:02', '00:03']
        },
        {
          id: 1,
          title: "25分钟番茄计时",
          nodes: ['00:05', '00:12','01:25', '12:02']
        },
        {
          id: 2,
          title: "10分钟提醒计时",
          nodes: ['00:10']
        }
      ]
    }
  },
  mounted(){
    this.checkedItem = this.list[0]
    this.$store.commit('updateTimerInfo', this.checkedItem)
  },
  methods:{
    removeTimer(v){
      this.nodes.splice(v, 1)
    },
    inputTitle(v){
      if(v.length > 0){
        this.hasPopupTitle = true
      }
    },
    setTimer(node, index){
      this.currentTime = node
      this.currentIndex = index
      this.isShowTimerPopup = true
    },
    custom(){
      this.isCustom = !this.isCustom
    },
    changeItem(item){
      this.checkedId = item.id
      this.checkedItem = item      
      this.$store.commit('updateTimerInfo', this.checkedItem)
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
      this.currentId = item.id
      this.timerName = item.title
      this.nodes = item.nodes
      this.popupTitle = "修改计时计划"
      this.isShowPopup = true

    },
    showPopup(){
      this.clearForm()
      this.popupTitle = "添加计时计划"
      this.isShowPopup = true
    },
    formatter(type, val){
      return `${val}${type == "hour" ? "小时":"分钟"}`
    },
    confirm(v){
      this.nodes[this.currentIndex] = v
      this.isShowTimerPopup = !this.isShowTimerPopup
      this.currentTime = '00:00'
      this.showWarning = false
    },
    submit(){
      if(this.timerName.length == 0) {
        this.hasPopupTitle = false
        return
      }
      if(this.nodes.length == 0){
        this.showWarning = true
        return
      }
      if(this.nodes.length == 1 && this.nodes[0] == "00:00"){
        this.showWarning = true
        return
      }
      let tempList = []
      this.nodes.forEach(node => {
        node = parseInt(String(node).replace(":", ""))
        tempList.push(node)
      });
      tempList.sort((a,b)=>{return a-b})
      let tempList2 = []
      tempList.forEach(item => {
        if(item < 10) {
          tempList2.push(`00:0${item}`)
        }
        else if(10 <= item && item <= 59) {
          tempList2.push(`00:${item}`)
        }
        else if(100 <= item && item <= 959) {
          tempList2.push(`0${parseInt(item/100)}:${item%100}`)
        }
        else if(1000 <= item) {
          tempList2.push(String(item).slice(0,2) + ":" + String(item).slice(2,4))
        }
      })
      console.log("tempList2", tempList2)
      this.nodes = tempList2

      if(this.currentId > -1){
        for(let i = 0; i < this.list.length; i++){
          if(this.list[i].id == this.currentId){
            this.list[i].nodes = this.nodes
            this.list[i].title = this.timerName
            break
          }
        }
      }else{
        this.list.push({
          id: this.list[this.list.length - 1].id + 1,
          title: this.timerName,
          nodes: this.nodes
        })
      }
      this.isShowPopup = false
    },
    sortArr(){

    },
    start(){
      // this.$router.push(`/timer?item=${JSON.stringify(this.checkedItem)}`)
      this.$router.push({
        name:"timer",
        query: this.checkedItem
      })
    },
    clearForm(){
      this.hasPopupTitle = true
      this.showWarning = false
      this.currentId = -1
      this.timerName = ""
      this.nodes = []
    }
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
.warningText{
  text-align: right;
  font-size: 12px;
  color: red;
}
</style>
