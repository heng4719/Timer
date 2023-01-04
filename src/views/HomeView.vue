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
      <div class="item" v-for="item in list" @click="changeItem(item)">
        <img src="@/assets/remove.png" width="20px" style="z-index:2" v-if="isCustom" @click="remove(item)">
        <div class="title">{{item.title}}</div>
        <img src="@/assets/checked.png" width="20px" v-if="!isCustom && checkedId == item.id">
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

</div>
</template>

<script>

export default {
  name: 'HomeView',
  data(){
    return{
      isCustom: false,
      checkedId: 0,
      list:[
        {
          id: 0,
          title: "C2刷脸提醒计时"
        },
        {
          id: 1,
          title: "25分钟番茄计时"
        },
        {
          id: 2,
          title: "10分钟提醒计时"
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
        console.log("changeItem", item.id)
        let tempList = this.list.filter((v)=>{
          return v.id != item.id
        })
        console.log("tempList", tempList)
        this.list = tempList
    },
    start(){

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
</style>
