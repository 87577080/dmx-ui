import Vue from 'vue';
import global from './global';
import Button from './packages/Button';
import Cell from './packages/Cell';
import Swiper from './packages/Swiper';
import SwiperItem from './packages/swiper-item'
import Drag from './packages/Drag';
import DragItem from './packages/drag-item';
import CheckBox from './packages/Checkbox';
import CheckList from './packages/CheckList';
import Checked from './packages/Checked';

//document.querySelector('html').style.fontSize = document.documentElement.clientWidth / 10 + 'px';

if ( global.config.isDev ) { // 开发环境
  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component(Swiper.name, Swiper);
  Vue.component(SwiperItem.name, SwiperItem);
  Vue.component(Drag.name,Drag);
  Vue.component(DragItem.name,DragItem);
  Vue.component(CheckList.name,CheckList);
  Vue.component(CheckBox.name,CheckBox);
  Vue.component(Checked.name,Checked);
  let vm = new Vue({}).$mount('#app');
}

let Version = '1.1.5';

/* use全局组件 */
const Dmx = function(Vue) {  
  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component(Swiper.name, Swiper);
  Vue.component(SwiperItem.name, SwiperItem);
  Vue.component(Drag.name,Drag);
  Vue.component(DragItem.name,DragItem);
  Vue.component(CheckList.name,CheckList);
  Vue.component(CheckBox.name,CheckBox);
  Vue.component(Checked.name,Checked);
};

// 注入Vue
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export {
  Dmx,
  Version,
  Button,
  Swiper,
  Cell,
  SwiperItem,
  Drag,
  DragItem,
  CheckBox,
  CheckList,
  Checked
}