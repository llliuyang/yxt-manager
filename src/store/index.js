import Vue from 'vue'
import Vuex from 'vuex'
import html2canvas from 'html2canvas'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total:30,
    sy:10,
    disabled: true
  },
  mutations: {
    refresh(state,payload){
      state.sy = Math.floor(Math.random()*10);
      payload.$message({
        message: '数据刷新成功',
        type: 'success',
        duration:1200
      });
    },
    change(state) {
      let el = document.querySelector('[name="input"]')
      state.disabled = false;
      setTimeout(() => {
        el.focus();
      }, 500);
    },
    changeState(state,payload){
      state.sy = payload
    },
    blur(state){
      state.disabled = true
    },
    capture(state) {
      let target = document.querySelector("#main-content");
      let parent = document.querySelector("#capture");
      html2canvas(target).then(canvas => {
        parent.appendChild(canvas)
      });
      parent.style.cssText = "visibility: visible; opacity: 1;"
    },
  },
  actions: {
  },
  modules: {
  }
})
