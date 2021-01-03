<template>
	<div class="main-content" id="main-content">
		<p class="main-title">白金救助名额查询</p>
		<div class="select-group">
			<el-select v-model="area" placeholder="请选择">
				<el-option
					v-for="item in areas"
					:key="item.index"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>

			<el-select
				filterable
				v-model="prov"
				placeholder="请选择"
				@change="refresh"
			>
				<el-option
					v-for="item in provs"
					:key="item.index"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>

			<el-select v-model="kind" placeholder="请选择">
				<el-option
					v-for="item in kinds"
					:key="item.index"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>

			<el-select v-model="keshi" placeholder="请选择">
				<el-option
					v-for="item in keshis"
					:key="item.index"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
		</div>
		<div class="main-item-group">
			<div class="main-item scroll">
				<vue-seamless-scroll
					:data="xingshi"
					:class-option="classOption"
					class="scroll-con"
				>
					<ul class="list" :class="{ anim: animate == true }">
						<li v-for="item in xingshi" :key="item">
							<span class="name">{{ randomXs() }}**</span>
							<span class="phone">{{ randomPhoneNumber() }}</span>
							<span class="liaocheng">{{ randomLc() }}个疗程</span>
						</li>
					</ul>
				</vue-seamless-scroll>
			</div>

			<div class="main-item echarts"></div>

			<div class="main-item tips">
				<p class="tips-prov">{{ prov }}地区</p>
				<p class="tips-title">今日救助名额详情</p>
				<p class="tips-total">
					全部名额：<span class="tips-num">{{ total }}</span>
				</p>
				<p class="tips-xh">
					已用名额：<span class="tips-num">{{ total - sy }}</span>
				</p>
				<p class="tips-sy">
					剩余名额：<span class="tips-num">
						<el-input
							v-model="sy"
							:disabled="disabled"
							@blur="blur"
							name="input"
							@change="change"
							@keyup.enter.native="blur"
						></el-input>
					</span>
				</p>
				<div class="msg">
					温馨提示：每省仅限前30名患者，不允许内定，名额用完方子即刻送回。
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import vueSeamlessScroll from "vue-seamless-scroll";
	import { mapMutations, mapState } from "vuex";
	const echarts = require("echarts");
	export default {
		data() {
			return {
				area: "中国大陆",
				prov: "湖北省",
				kind: "中医",
				keshi: "内科",
				kinds: ["中医", "西医", "巫术"],
				keshis: ["内科", "外科", "精神科", "心血管科"],
				areas: ["中国大陆", "海外地区"],
				provs: [
					"北京市",
					"天津市",
					"上海市",
					"重庆市",
					"河北省",
					"山西省",
					"辽宁省",
					"吉林省",
					"黑龙江省",
					"江苏省",
					"浙江省",
					"安徽省",
					"福建省",
					"江西省",
					"山东省",
					"河南省",
					"湖北省",
					"湖南省",
					"广东省",
					"海南省",
					"四川省",
					"贵州省",
					"云南省",
					"陕西省",
					"甘肃省",
					"青海省",
					"台湾省",
					"内蒙古",
					"广西",
					"西藏",
					"宁夏",
					"新疆",
					"香港",
					"澳门",
				],
				xingshi: [
					"赵",
					"钱",
					"孙",
					"李",
					"周",
					"吴",
					"郑",
					"王",
					"冯",
					"陈",
					"蒋",
					"沈",
					"韩",
					"杨",
					"朱",
					"秦",
					"尤",
					"许",
					"何",
					"施",
					"张",
					"孔",
					"曹",
					"严",
					"金",
					"魏",
					"陶",
					"姜",
					"戚",
					"谢",
					"邹",
					"喻",
					"章",
					"苏",
					"潘",
					"葛",
					"熊",
					"杜",
					"刘",
					"张",
					"付",
					"彭",
					"习",
					"龙",
					"高",
				],
				animate: false,
				classOption: {
					step: 0.3,
					limitMoveNum: 10,
				},
			};
		},
		components: {
			vueSeamlessScroll,
		},
		methods: {
			...mapMutations(["refresh", "blur", "changeState"]),
			change() {
				this.$message({
					message: "修改数据成功！",
					type: "success",
				}),
					setTimeout(() => {
						this.$notify({
							title: "统计图空白解决办法",
							message:
								"当主动修改数据后，统计图可能会出现空白，此时只需要点两下统计图左下角剩余名额的图例即可解决。",
							position: "bottom-right",
							duration: 0,
						});
					}, 1000);
			},
			randomXs() {
				let arr = this.xingshi;
				return arr[Math.floor(Math.random() * arr.length)];
			},
			randomLc() {
				let arr = [1, 1, 2, 2, 2, 2, 3, 3, 3, 4];
				return arr[Math.floor(Math.random() * arr.length)];
			},
			scroll() {
				this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
				setTimeout(() => {
					this.xingshi.push(this.xingshi[0]);
					this.xingshi.shift();

					this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
				}, 2000);
			},
			// 根据字典生成随机序列
			randomCode: function (len, dict) {
				for (var i = 0, rs = ""; i < len; i++)
					rs += dict.charAt(Math.floor(Math.random() * 100000000) % dict.length);

				return rs;
			},

			// 生成随机手机号码
			randomPhoneNumber: function () {
				// 第1位是1 第2,3位是3458 第4-7位是* 最后四位随机 this.$options.methods使用上一个函数的返回值
				return [
					1,
					this.$options.methods.randomCode(2, "3458"),
					"****",
					this.$options.methods.randomCode(4, "0123456789"),
				].join("");
			},
			echarts() {
				let myChart = echarts.init(document.getElementsByClassName("echarts")[0]);
				let option = {
					title: {
						text: "白金救助名额统计",
						left: "center",
					},

					legend: {
						orient: "vertical",
						left: "6px",
						bottom: "1px",
						data: ["已消耗", "剩余名额"],
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)",
						backgroundColor: "rgba(0,0,0,0.5)",
						borderWidth: 0,
						textStyle: {
							color: "#fff",
						},
					},
					series: [
						{
							name: "名额统计",
							type: "pie",
							radius: "45%",
							data: [
								{
									value: this.total - this.sy,
									name: "已消耗",
									itemStyle: {
										color: "#c23531",
									},
								},
								{
									value: this.sy,
									name: "剩余名额",
									itemStyle: {
										color: "#334b5c",
									},
								},
							],
							clockwise: false,
							// roseType: "radius"
						},
					],
				};
				myChart.setOption(option);
			},
		},
		computed: {
			sy: {
				get() {
					return this.$store.state.sy;
				},
				set(newValue) {
					this.$store.state.sy = newValue;
				},
			},
			...mapState(["total", "disabled"]),
		},
		watch: {
			sy() {
				if (this.$store.state.sy > 30) {
					this.$store.state.sy = 30;
				}
				if (this.$store.state.sy < 0) {
					this.$store.state.sy = 0;
				}
				this.echarts();
			},
		},
		mounted() {
			this.echarts();
			setInterval(this.scroll, 10000);
		},
	};
</script>

<style>
	.main-content {
		width: 960px;
		/* border: 1px solid red; */
		overflow: hidden;
		/* margin-top: 20px;
					  margin-left: 20px; */
		padding: 20px;
		background: url(../assets/mainbg.jpg);
	}
	.main-title {
		font-size: 36px;
		text-align: center;
		color: #bf794e;
		font-weight: bold;
		letter-spacing: 1px;
		margin-bottom: 30px;
	}
	.select-group {
		display: flex;
		justify-content: center;
		margin: 10px 0 20px;
	}

	.select-group .el-select {
		margin: 0 6px;
	}

	.main-item-group {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: center;
	}
	.main-item {
		/* overflow: visible; */
		width: 300px;
		height: 340px;
		padding: 20px 0;
		box-sizing: border-box;
		margin-bottom: 10px;
		-webkit-transition: all 0.4s linear;
		transition: all 0.4s linear;
	}
	.main-item.scroll {
		background: rgba(255, 255, 255, 0.4);
	}
	.scroll-con {
		height: 300px;
		overflow: hidden;
		position: relative;
	}
	ul.list {
		width: 100%;
		overflow: hidden;
		height: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
	}

	.anim {
		transition: all 1s;
		/* margin-top: -30px; */
	}
	ul.list li {
		width: 100%;
		height: 34px;
		line-height: 34px;
		text-align: center;
	}
	ul.list li span {
		display: inline-block;
		text-align: center;
		color: #333;
	}
	.name {
		width: 40px;
	}
	.phone {
		width: 120px;
	}
	.liaocheng {
		width: 60px;
	}

	.echarts {
		background: #eee;
	}

	.tips {
		background: rgba(255, 255, 255, 0.4);
	}
	.tips p {
		line-height: 1.6;
		font-weight: bold;
		color: #b77b57;
		text-align: center;
	}
	.tips-prov,
	.tips-title {
		font-size: 26px;
		letter-spacing: 2px;
	}
	.tips-total {
		margin-top: 30px;
	}
	.tips-total,
	.tips-xh,
	.tips-sy {
		font-size: 24px;
		letter-spacing: 1px;
	}
	.tips-num {
		color: #cd5e3c;
		transition: 0.4s linear;
	}
	.tips-num .el-input {
		width: 36px;
	}
	.tips-num .el-input__inner,
	.el-input.is-disabled .el-input__inner {
		font-weight: bold;
		color: #cd5e3c !important;
		font-size: 25px;
		padding: 0;
		background-color: transparent !important;
		border: 1px solid #008899;
	}
	.el-input.is-disabled .el-input__inner {
		border: 1px solid transparent;
		text-align: center;
	}
	.msg {
		width: 100%;
		padding: 0 5%;
		box-sizing: border-box;
		color: #478384;
		margin-top: 34px;
		text-align: left;
	}
</style>