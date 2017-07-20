import { utils } from '../../../utils/swiperUtils'
import bus from '../../../common/bus'

export default {
    name: 'dmx-drag',
    props: {
        dataSource: Array, // 数据源
        speed: String,  // 速度
        opacity: String, // 透明度
        animation: String // 动画形式
    },
    computed: {
        getSpeed () {
            return this.speed === undefined ? 0 : this.speed
        },
        getOpacity () {
            return this.opacity === undefined ? '1' : this.opacity
        },
        getAnimation () {
            return this.animation ===undefined ? 'ease' : this.animation
        },
        gitAction () {
            return null
        }
    },
    data () {
        return {
            itemInitIndex: null, // 拖拽元素初始索引
            itemInitValue: [], // 元素初始值
            itemVariableValue: [] // 元素可变初始值
        }  
    },
    mounted () {
        // 监听索引
        bus.$on('indexValue',function (obj) {
            this.itemInitIndex = obj.index;
        }.bind(this));
        this.init();
    },
    methods: {
        init () {
            this.dataSourceInit()
        },
        // 初始化数据
        dataSourceInit () {
            // 设置拖拽元素索引
            this.setDragIndex ()

            if ( this.dataSource.length === 0  ) return
            let j = 0; // 上次循环索引
            let dragElementsLast; // 拖拽元素
            let dragElementsLastNum; // 拖拽元素上次循环
            let dragElementsLastMarginBottom; // 拖拽元素下边距
            let dragElementsPosition = 0; // 拖拽元素初始位置
            let allHeight = 0;

            this.itemInitValue = []
            this.itemVariableValue = []
            for ( let i=0; i<this.$children.length; i++ ) {
                j = i - 1 < 0 ? 0 : i - 1;

                dragElementsLast = this.$children[i].$el;
                dragElementsLastNum = this.$children[j].$el;
                dragElementsLastMarginBottom = i === 0 ? 0 : utils.GetStyleMargin(dragElementsLast,'marginBottom');
                dragElementsLast.style.position = 'absolute';
                dragElementsLast.style.width = '100%';
                dragElementsLast.style.zIndex = 1;
                dragElementsLast.setAttribute('index', i);

                // 拖拽元素定位判断逻辑
                dragElementsPosition = i === 0 ? 0 : dragElementsPosition += dragElementsLastNum.offsetHeight + utils.GetStyleMargin(dragElementsLastNum,'marginBottom');

                // 设置拖拽元素位置
                dragElementsLast.style.top = `${dragElementsPosition}px`;

                dragElementsLast.style.transition = `${this.getSpeed}s all ${this.getAnimation}`;
                // 设置所有拖拽元素初始值
                this.itemInitValue[i] = JSON.parse(`
                    {   
                        "x": ${this.$children[i].$el.offsetLeft},
                        "y": ${this.$children[i].$el.offsetTop},
                        "h": ${this.$children[i].$el.offsetHeight},
                        "a": ${this.$children[i].$el.offsetTop + this.$children[i].$el.offsetHeight},
                        "isDrag": ${this.$children[i].$el.getAttribute('drag')},
                        "i": ${i}
                    }
                `);

                // 设置所有拖拽元素可变初始值
                this.itemVariableValue[i] = JSON.parse(`
                    {   
                        "x": ${this.$children[i].$el.offsetLeft},
                        "y": ${this.$children[i].$el.offsetTop},
                        "h": ${this.$children[i].$el.offsetHeight},
                        "a": ${this.$children[i].$el.offsetTop + this.$children[i].$el.offsetHeight},
                        "i": ${i}
                    }
                `);
                allHeight += dragElementsLast.offsetHeight + utils.GetStyleMargin(dragElementsLast,'marginBottom');
            }
            // 设置外围元素高度
            this.$refs.parent.style.height = `${allHeight}px`;
        },
        // 数据删除改变
        dataSourceChanged () {
           // 设置拖拽元素索引
            this.setDragIndex ()

            if ( this.dataSource.length === 0  ) return
            let j = 0; // 上次循环索引
            let dragElementsLast; // 拖拽元素
            let dragElementsLastNum; // 拖拽元素上次循环
            let dragElementsPosition = 0; // 拖拽元素初始位置
            let allHeight = 0;

            this.itemInitValue = []
            this.itemVariableValue = []
            for ( let i=0; i<this.$children.length; i++ ) {
                j = i - 1 < 0 ? 0 : i - 1;

                dragElementsLast = this.$children[i].$el;
                dragElementsLastNum = this.$children[j].$el;
                dragElementsLast.style.position = 'absolute';
                dragElementsLast.style.width = '100%';
                dragElementsLast.style.zIndex = 1;
                dragElementsLast.setAttribute('index', i);

                // 拖拽元素定位判断逻辑
                dragElementsPosition = i === 0 ? 0 : dragElementsPosition += dragElementsLastNum.offsetHeight + utils.GetStyleMargin(dragElementsLastNum,'marginBottom');

                // 设置拖拽元素位置
                dragElementsLast.style.top = `${dragElementsPosition}px`;

                dragElementsLast.style.transition = `none`;

                // 设置所有拖拽元素初始值
                this.itemInitValue[i] = JSON.parse(`
                    {   
                        "x": ${this.$children[i].$el.offsetLeft},
                        "y": ${this.$children[i].$el.offsetTop},
                        "h": ${this.$children[i].$el.offsetHeight},
                        "a": ${this.$children[i].$el.offsetTop + this.$children[i].$el.offsetHeight},
                        "isDrag": ${this.$children[i].$el.getAttribute('drag')},
                        "i": ${i}
                    }
                `);

                // 设置所有拖拽元素可变初始值
                this.itemVariableValue[i] = JSON.parse(`
                    {   
                        "x": ${this.$children[i].$el.offsetLeft},
                        "y": ${this.$children[i].$el.offsetTop},
                        "h": ${this.$children[i].$el.offsetHeight},
                        "a": ${this.$children[i].$el.offsetTop + this.$children[i].$el.offsetHeight},
                        "i": ${i}
                    }
                `);
                allHeight += dragElementsLast.offsetHeight + utils.GetStyleMargin(dragElementsLast,'marginBottom');
            }

            // 设置外围元素高度
            this.$refs.parent.style.height = `${allHeight}px`;
        },

        dragItem ( event ) {
            if ( event.target.getAttribute('index') !== null ) event.preventDefault()
            if ( this.$children === undefined ) return
            if ( this.$children.length === 1 ) return 
            if ( this.$children[this.itemInitIndex] === undefined ) return 
            let dragElement =  this.$children[this.itemInitIndex].$el;
            let touchStartY = event.targetTouches[0].pageY;
            let offsetTop = dragElement.offsetTop;
            let touchmoveDiffY; 

            // 当前元素位置
            this.itemVariableValue[this.itemInitIndex].y = dragElement.offsetTop;  
        
            // move
            const handlerMove = function (e) {
                let disableds = this.$children[this.itemInitIndex].$el.getAttribute('drag');
                if ( !disableds ) return 

                event.preventDefault()

                let touchmoveY = e.changedTouches[0].pageY;
                touchmoveDiffY = parseInt(touchmoveY - touchStartY);
                // 最小限制
                const startY = this.itemInitValue[0].y;
                const startItemH = this.itemInitValue[0].isDrag ? this.itemInitValue[0].h : 0;
                // 最大限制
                const limitY = this.itemInitValue[this.itemInitValue.length - 1].y;
                const limitItemH = this.itemInitValue[this.itemInitValue.length - 1].h;

                dragElement.style.transition = null;
                dragElement.style.zIndex = 999;
                dragElement.style.opacity = `${this.getOpacity}`;

                if ( touchmoveDiffY < 0 ) {
                    if ( parseInt(dragElement.style.top) <= startY + startItemH ) {
                        dragElement.style.top = startY + startItemH  + 'px';
                    }else {
                        dragElement.style.top = touchmoveDiffY + this.itemVariableValue[this.itemInitIndex].y + 'px';
                    }
                }else {
                    if ( parseInt(dragElement.style.top) + dragElement.offsetHeight >= this.$refs.parent.offsetHeight ) {
                        dragElement.style.top = `${this.$refs.parent.offsetHeight - dragElement.offsetHeight}px`;
                    }else {
                        dragElement.style.top = touchmoveDiffY + this.itemVariableValue[this.itemInitIndex].y + 'px';
                    }
                }

            }.bind(this)

            // end
            const handlerEnd = function (e) {
                dragElement.style.opacity = null;
                dragElement.style.zIndex = 1;
                

                // 当前操作元素索引
                let sourceIndex = this.itemInitIndex;  

                // 拖拽元素抵达页面索引位置
                let dragPageIndex = this.itemInitValue.findIndex(function(item) {
                    if ( dragElement.offsetTop - (dragElement.offsetHeight / 3) < item.y ) return item;
                }.bind(this))

                // 非拖拽元素return
                if ( !this.$children[dragPageIndex].$el.getAttribute('drag') ) {
                    dragElement.style.transition = `${this.getSpeed}s all ${this.getAnimation}`;
                    dragElement.style.top = this.itemInitValue[this.itemInitIndex].y + 'px';
                    return 
                }else {
                    // 拖拽元素位置还原
                    dragElement.style.transition = `${0.1}s all ${this.getAnimation}`;
                    dragElement.style.top = this.itemInitValue[dragPageIndex].y + 'px';
                    let _this = this
                    setTimeout(function() {
                        dragElement.style.top = _this.itemInitValue[_this.itemInitIndex].y + 'px';
                        dragElement.style.transition = `${_this.getSpeed}s all ${_this.getAnimation}`;
                    },100)
                }

                // 被碰撞元素
                let collisionElement = this.$children.find(function(item){
                    if ( dragPageIndex == item.$el.getAttribute('index') ) return item;
                }.bind(this))

                // 碰撞元素动画
                collisionElement.$el.style.transition = `${this.getSpeed}s all ${this.getAnimation}`;

                // 设置碰撞元素index
                collisionElement.$el.setAttribute('index',dragElement.getAttribute('index'));

                // 设置当前元素index
                dragElement.setAttribute('index',dragPageIndex);
                
                // 设置当前元素最终位置
                this.itemVariableValue[sourceIndex].y = this.itemInitValue[dragPageIndex].y;

                // 拖拽元素终点位置
                let dragElementEndY = parseInt(dragElement.getAttribute('index'));
                // 碰撞元素终点位置
                let collisionElementEndY = parseInt(collisionElement.$el.getAttribute('index'));

                // 当前元素数据索引
                let dragElementIndex = dragElement.getAttribute('dataIndex');
                // 碰撞元素数据索引
                let collisionElementIndex = this.$children[dragPageIndex].$el.getAttribute('dataIndex');

                // 拖拽元素终点数据
                let dragElementEndData = this.dataSource[dragElementIndex];
                // 碰撞元素终点数据
                let collisionElementEndDate = this.dataSource[collisionElementIndex];
                
                this.dataSource[dragElementIndex] = collisionElementEndDate;
                this.dataSource[collisionElementIndex] = dragElementEndData;

                // 交换位置后触发回调
                if ( sourceIndex !== dragPageIndex ) {
                    // 触发回调
                    this.$emit('change',{
                        dataSource: this.dataSource
                    })
                }

                // 取消
                dragElement.removeEventListener('touchmove',handlerMove)
                dragElement.removeEventListener('touchend',handlerEnd)
            }.bind(this)

            // 绑定
            dragElement.addEventListener('touchmove', handlerMove)
            dragElement.addEventListener('touchend', handlerEnd)
        },
        // 设置拖拽元素索引
        setDragIndex () {
            let dataIndex = 0
            this.$children.forEach((item, index) => {
                if ( item.$el.getAttribute('drag') ) {
                    item.$el.setAttribute('dataIndex', dataIndex)
                    dataIndex += 1
                }
            })
        }
    },
    watch: {
        dataSource: {  // 监听数据源变化
            handler () {
                if ( this.dataSource.length <= 0 ) return 
                let _this = this
                setTimeout(function() {
                    _this.dataSourceChanged()
                },100)
            },
            deep: true
        },
        action: {
            handler () {
                
            },
            deep: true
        }
        
    }
}