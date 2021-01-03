<template>
	<div class="top">
		<p class="title">医心堂中医门诊内部查询系统</p>
		<p class="time">{{ time }} 星期{{ day }}</p>
		<p class="welcome">Hi! {{greet}}</p>
	</div>
</template>

<script>
	import dayjs from "dayjs";
	export default {
		name: "header",
		data() {
			return {
        time: "time Loading...",
        day:'',
        greet:''
			};
		},
		created() {
			let week = dayjs().day();
			let week_Zh = ["日", "一", "二", "三", "四", "五", "六"];
			this.day = week_Zh[week];
			setInterval(() => {
				this.time = dayjs().format("YYYY年MM月DD日 HH:mm:ss");
      }, 1000);
      this.checkTime() 
    },
    mounted(){
      setInterval(()=>{
        this.checkTime()
      },15000)
    },
    methods:{
      checkTime(){
        let hour = dayjs().hour()
        if(hour < 9){
          this.greet = '早上好~'
        }else if(hour >=9 && hour < 12){
          this.greet = '上午好~'
        }else if(hour >=12 && hour < 14){
          this.greet = '中午好~'
        }else if(hour >=14 && hour <18){
          this.greet = '下午好~'
        }else if(hour >=18 && hour < 23){
          this.greet = '晚上好~'
        }
      }
    }
	};
</script>

<style scoped>
	.top {
		height: 60px;
		background: #2a2a2a;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 20px;
		color: #fff;
	}
</style>