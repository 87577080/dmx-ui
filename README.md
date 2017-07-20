# dmx-ui

> Vue.js 组件库

![Damai](https://www.damai.cn/dm2015/img/logo.png)

## 使用

* 下载

npm install dmx-ui --save

* 引入全部组件
```javascript
import Vue from 'vue'
import { Dmx } from 'dmx-ui';
Vue.use(Dmx);
```

* 按需引入部分组件
```javascript
import { Button } from 'dmx-ui';
Vue.component(Button.name, Button);
```

* dmx-button 使用
```javascript
// 可选type: default || primary 
// disabled
<dmx-button type="default">default</dmx-button>
<dmx-button type="primary">primary</dmx-button>
<dmx-button disabled>disabled</dmx-button>
<dmx-button type="primary">
  <img src="//xxx.png" width="20" height="20" slot="icon"/>
  带自定义图标
</dmx-button>
```

* dmx-cell 使用
```javascript
<dmx-cell title="标题文字" value="说明文字"></dmx-cell>
<dmx-cell link to="//damai.cn"></dmx-cell>
```

* dmx-swiper 使用

```javascript
// 基本使用 
// type 必选
// animation 值 single || normal
// speed 0.1 ~ 1
// custom 预留插槽
<dmx-swiper type="swiper" animation="normal" speed="0.5">
  <dmx-swiper-item v-for="(item, index) in 10" :key="index">
    <div class="aaa">{{item}}</div>
  </dmx-swiper-item>
</dmx-swiper>
```

* dmx-drag 使用

```javascript

//例:
<dmx-drag @change="changed" :dataSource="dataSource" speed='0.5' opacity="0.6" animation="ease">
    <dmx-drag-item slot="dragItem" v-for="(item, index) in dataSourceAll" :key="index" :index="index" :drag="item.drag">
        <div slot="dragElement" class="drag" :index="index">{{item.content}}</div>
    </dmx-drag-item>
</dmx-drag>

data () {
  return {
    dataSourceAll: [
        {
          content: 'title',
          drag: false
        },
        {
          content: 'value0',
          drag: true
        },
        {
          content: 'value1',
          drag: true
        }
      ],
      dataSource: [
        {
          content: 0
        },
        {
          content: 1
        }
      ]
  }
}

// 必选参数: @change :dataSource
  // :dataSource 值 ===> 数据源
  // @change 值 ===> 回调
  methods: {
    changed(obj) {
      obj.dataSource // 返回拖拽后数据
    }
  }
// 可选参数: speed  opacity  animation
  // speed 拖拽元素回弹速度 默认为0
  // opacity 元素被拖拽时的透明度 默认为0
  // animation 拖拽元素回弹动画 默认为ease 支持css3动画形式

PS: 
  //数据源必须为Array类型
  //slot="dragItem" 元素中 :index 必选
  //slot="dragElement" :index 必选
  //slot="itemTitle" 为可选元素

```

* dmx-checked 使用
```javascript 
// 例:
<div v-for="(item, index) in list">
  <dmx-checked v-model="item.isBuy" @change="changed"></dmx-checked>
</div>

data () {
  return {
    list: [
      {
        isBuy: false
      },
      {
        isBuy: false
      },
      {
        isBuy: false
      }
    ]
  }
}

methods: {
  change (val) {
    console.log( val )
  }
}

PS: 
//v-model 接收Boolean

```




