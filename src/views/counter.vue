<template>
  <div class="content">
    <div class="back">
        <img src="@/assets/back.png" width="20px" @click="goBack">
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            id: "",
            title:"",
            nodes:[]
        }
    },
    computed: {
        ...mapState('display-data', ['timeLine']),
    },
    mounted(){
        this.id = this.$route.query.id
        this.title = this.$route.query.title
        this.nodes = this.$route.query.nodes
        this.$store.commit('updateCount', 1)
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