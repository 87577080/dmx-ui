
export class utils {
    // 元素, marginLeft marginRight marginTop marginBottom
    static GetStyleMargin(obj,margin) {
        let result = Math.floor(parseFloat(document.defaultView.getComputedStyle(obj,null)[margin]));
        return result
    }
    // 元素数组, 动画形式, X, Y
    static SetStyleAnimations(objArr,AnimationForm,translateX,translateY) {
        const screenWidth = window.innerWidth;
        let parseInetranslateX = parseInt(translateX);
        let totalWidth = null;

        if ( !totalWidth ) {
            for ( let i=0; i<objArr.length; i++ ) {
                totalWidth += (objArr[i].offsetWidth + utils.GetStyleMargin(objArr[i],'marginLeft') + utils.GetStyleMargin(objArr[i],'marginRight'))
            }
        }
        
        for ( let i = 0; i<objArr.length; i++  ) {
            objArr[i].style.transition = AnimationForm;

            if ( parseInetranslateX < 100) {

                if ( -parseInetranslateX > totalWidth-screenWidth + 100 ) parseInetranslateX = -(totalWidth-screenWidth + 100)

                objArr[i].style.transform = `translate(${parseInt(parseInetranslateX)}px)`;
            }else {
                objArr[i].style.transform = `translate(100px)`;
            }

        } 
    }
    // 数组, 类型
    static GetArrayValue(objArr,type) {
        let result = null
        if ( type === `max` ) result = Math.max.apply(null, objArr)
        if ( type === `min` ) result = Math.min.apply(null, objArr)
        
        return result
    }

}