<template>
  <div class="content">
    <div class="back">
        <img src="@/assets/back.png" width="20px" @click="goBack">
    </div>
    
  </div>
</template>

<script>
export default {
    data(){
        return {
            id: "",
            title:"",
            nodes:[]
        }
    },
    mounted(){
        this.id = this.$route.query.id
        this.title = this.$route.query.title
        this.nodes = this.$route.query.nodes
    },
    methods:{
        goBack(){
            this.$router.back()
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