var obj={
    created(){
        console.log("chuangjian")
        this.$store.commit('tabHidde')
    },
    destroyed(){
        console.log("销毁")
         this.$store.commit('tabShow')
    }
}

export default obj