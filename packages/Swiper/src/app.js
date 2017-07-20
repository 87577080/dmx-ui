import {
    utils
} from '../../../utils/swiperUtils'
export default {
   name: 'dmx-swiper',
    props: {
        type: String, // 轮播类型
        animation: String, // 动画
        speed: String // 运动速度
    },
    mounted () {
        this.init()
    },
    data () {
        return {
            touchEndDistance: 0, 
            touchMoveDistance: 0,
            itemWidthAll: 0,
            animations: [
                'normal',
                'single'
            ]
        }
    },
    computed: {
        isType () {
            return this.type === 'swiper' ? true : false;
        },
        isAnimation () {
            return this.animation;
        }
    },
    methods: {
        init () {
            this.$refs.root.style.overflow = 'hidden';
            this.$refs.swiper.style.width = '1000%';
            for ( let i=0; i<this.$refs.swiper.children.length; i++ ) {
                this.$refs.swiper.children[i].style.float = 'left'
            }
        },

        handleTouch (event, isAnimation) {
            event.preventDefault()
            const screenWidth = window.innerWidth;
            let screenWidthCalc = screenWidth/3;
            let touchStartStarting = event.targetTouches[0].pageX;
            let moveElement = this.$refs.swiper.children;
            let touchEndDiff;
            let touchMoveDiff;
            let arrDiff = [];
            
            if ( this.itemWidthAll === 0 ) {
                for ( var i=0; i<moveElement.length; i++ ) {
                    this.itemWidthAll += (moveElement[i].offsetWidth + utils.GetStyleMargin(moveElement[i],'marginLeft') + utils.GetStyleMargin(moveElement[i],'marginRight'))
                }
            }
            
            if ( moveElement.length <= 2 ) return
            
            const handlerNomal = function ( e ) {
                e.preventDefault();
                let touendX = e.changedTouches[0].clientX;
                touchEndDiff = touendX - touchStartStarting;

                utils.SetStyleAnimations(moveElement,`${this.speed}s all cubic-bezier(0.175, 0.885, 0.320, 1.275)`)

                if ( touchEndDiff < 0 && touchEndDiff <= -50 ) {
                    
                    if (  -this.touchEndDistance < moveElement.length * screenWidthCalc - screenWidth ) {
                        this.touchEndDistance  = this.touchEndDistance - screenWidthCalc;
                        utils.SetStyleAnimations(moveElement,`${this.speed}s all cubic-bezier(0.175, 0.885, 0.320, 1.275)`,this.touchEndDistance)
                    }else {
                        this.touchEndDistance = -(moveElement.length * screenWidthCalc - screenWidth)
                    }
                }else if ( touchEndDiff > 0 && touchEndDiff >=50 ) {
                    this.touchEndDistance  = this.touchEndDistance + screenWidthCalc
                    if ( this.touchEndDistance <= 0 ) {
                        utils.SetStyleAnimations(moveElement,`${this.speed}s all cubic-bezier(0.175, 0.885, 0.320, 1.275)`,this.touchEndDistance)
                    }else {
                        this.touchEndDistance = 0;
                    }
                }
                // 取消end
                this.$refs.swiper.removeEventListener('touchend', handlerNomal)
            }.bind(this)
            
            // 缓冲运动
            const handler = function ( e ) {
                let touchmoveingX = e.changedTouches[0].clientX;
                touchMoveDiff = parseInt(touchmoveingX - touchStartStarting)
                arrDiff.push(touchMoveDiff)
                e.preventDefault()

                if ( this.touchMoveDistance === 0 ) {
                    utils.SetStyleAnimations(moveElement,`${this.speed}s translateX ease`,touchMoveDiff)
                }else if ( this.touchMoveDistance < 0 && -this.touchMoveDistance + screenWidth <= this.itemWidthAll ) {

                    if ( touchMoveDiff < 0 ) {
                        utils.SetStyleAnimations(moveElement,`${this.speed}s translateX ease`,this.touchMoveDistance + touchMoveDiff)
                    }else {
                        utils.SetStyleAnimations(moveElement,`${this.speed}s translateX ease`,this.touchMoveDistance + touchMoveDiff)
                    }

                }else if ( -this.touchMoveDistance + screenWidth > this.itemWidthAll ) {
                    utils.SetStyleAnimations(moveElement,`${this.speed}s translateX ease`,this.touchMoveDistance + touchMoveDiff)
                }
            }.bind(this)

            // 抬起
            const handlerEnd = function (e) {
                let touchendX = e.changedTouches[0].pageX;
                e.preventDefault()
                touchMoveDiff = touchMoveDiff ? touchMoveDiff : 0;
                
                this.touchMoveDistance = this.touchMoveDistance + touchMoveDiff;

                if ( this.touchMoveDistance > 0 && -this.touchMoveDistance + screenWidth <= this.itemWidthAll ) {// 左侧
                     this.touchMoveDistance = 0;
                     utils.SetStyleAnimations(moveElement,`1s translateX ease`,this.touchMoveDistance)
                }else if ( -this.touchMoveDistance + screenWidth > this.itemWidthAll ) {                        // 右侧
                     this.touchMoveDistance = -this.itemWidthAll + screenWidth;
                     utils.SetStyleAnimations(moveElement,`1s translateX ease`,this.touchMoveDistance)
                }else {
                    //this.touchMoveDistance = touchMoveDiff;
                    //console.log( 'end',this.touchMoveDistance )
                    //console.log( touchendX - touchStartStarting  )
                    //utils.SetStyleAnimations(moveElement,`1s translateX ease`,this.touchMoveDistance - 800)
                }
                
                // 移除
                this.$refs.swiper.removeEventListener('touchstart', this.handleTouch,false);
                this.$refs.swiper.removeEventListener('touchmove', handler,true);
                this.$refs.swiper.removeEventListener('touchend', handlerEnd,false);
            }.bind(this)

            
            // 动画类型
            if ( isAnimation === this.animations[0] ) {
                this.$refs.swiper.addEventListener('touchmove',handler );
                this.$refs.swiper.addEventListener('touchend', handlerEnd );
            }else if ( isAnimation === this.animations[1] ) {
                this.$refs.swiper.addEventListener('touchend', handlerNomal);
            }
                      
        }
    }
}