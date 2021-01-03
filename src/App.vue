<template>
	<div id="box">
		<Aside></Aside>
		<el-container class="right">
			<el-header style="padding: 0">
				<Header></Header>
			</el-header>

			<el-main class="main" style="padding: 0">
				<Main></Main>
			</el-main>

			<el-footer height="40" style="padding: 0">
				<Footer></Footer>
			</el-footer>
		</el-container>

		<div id="capture">
			<div class="close" @click="close">X</div>
			<div class="download" @click="download">下载图片</div>
		</div>
	</div>
</template>

<script>
	import Aside from "./components/aside.vue";
	import Header from "./components/header.vue";
	import Footer from "./components/footer.vue";
	import Main from "./components/main.vue";
	import storage from './utils/storage.js'
	export default {
		name: "App",
		components: {
			Aside,
			Header,
			Footer,
			Main,
		},
		methods: {
			close() {
				let parent = document.querySelector("#capture");
				let canvas = document.querySelector("#capture canvas");
				parent.style.cssText = "visibility: hidden; opacity: 0;";
				parent.removeChild(canvas);
			},
			base64Img2Blob(code) {
				let parts = code.split(";base64,");
				let contentType = parts[0].split(":")[1];
				let raw = window.atob(parts[1]);
				let rawLength = raw.length;
				let uInt8Array = new Uint8Array(rawLength);

				for (let i = 0; i < rawLength; ++i) {
					uInt8Array[i] = raw.charCodeAt(i);
				}

				return new Blob([uInt8Array], { type: contentType });
			},
			downloadFile(fileName, content) {
				let aLink = document.createElement("a");
				let blob = this.base64Img2Blob(content);
				let evt = document.createEvent("MouseEvents");
				evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错
				aLink.download = fileName;
				aLink.href = URL.createObjectURL(blob);
				aLink.dispatchEvent(evt);
			},
			download() {
				let canvas = document.querySelector("#capture canvas");
				let dataURL = canvas.toDataURL("image/jpeg", 0.6);
				console.log(dataURL);
				this.downloadFile("image", dataURL);
			},
		},
		mounted(){
			let content = '部分功能优化重写，优化滚动区域视效，剔除不常见姓氏，更新姓氏列表，时间块新增星期提示，问候区根据当前时间点自动切换，优化部分区块布局';
			let title = '2020.12.28更新概述'
			if(!storage.get('user')){
          // this.$confirm(content, title, {
          //   confirmButtonText: '知道啦',
          //   cancelButtonText: '今日勿扰'
          // }).then(() => {
             
          // }).catch(()=>{
          //   storage.set('user','vis','1');
          //   });
         }
		}
	};
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	ul li {
		list-style: none;
	}
	#box {
		width: 100vw;
		height: 100vh;
		display: flex;
		-webkit-user-select: none;
		user-select: none;
	}
	.right {
		width: calc(100vw - 200px);
		height: 100%;
		display: flex;
		flex-flow: column wrap;
		justify-content: space-between;
	}
	.main {
		height: calc(100vh - 100px);
		background: url("./assets/mainbg.jpg");
		overflow-y: scroll;
	}
  
#capture {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  -webkit-transition: 0.3s linear;
  transition: 0.3s linear;
}
#capture .close, #capture .download {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background: #f8f8f8;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  cursor: pointer;
}

#capture .download{
    right: 31px;
    width: 80px;
    font-size: 14px;
}
.el-notification.right{
	height: auto;
}
.el-message-box__wrapper{
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter:blur(5px);
}
</style>
