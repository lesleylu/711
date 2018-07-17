function move(elem , options , callback){
    for(var attr in elem.timer){
        clearInterval(elem.timer[attr]);
    }
    elem.timer = new Object();
    //开启定时器之前，先关闭定时器;
    for(var attribute in options){
        if(attribute == "opacity"){
            elem.style.cssText += `transition:opacity 1s;`
            elem.style.opacity = options[attribute];
        }else if(attribute == "rotate"){
            var reg = /[a-z]{10}:\s([a-z]{3,10})/g;
            var str = elem.style.cssText;
            var hasTransition = /transition/g;
            if(hasTransition.test(str)){
                elem.style.cssText = str.replace(reg,`transition: $1,transform`);
            }else{
                elem.style.cssText = "transition:transform 1s;"
            }
            elem.style.transform = `rotate(${options[attribute]}deg)`;
        }else{
            (function(attr){
                elem.timer[attr] = setInterval(function(){
                    var iNow = parseInt(getStyle(elem,attr));
                    var speed = (options[attr] - iNow) / 10;
                      speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
                    if(iNow == options[attr]){
                        clearInterval(elem.timer[attr]);
                        delete elem.timer[attr];
                        var count = 0;
                        for(var time in elem.timer){
                            count ++;
                        }
                        if(count == 0){
                            // console.log("所有动画执行结束");
                            if(callback instanceof Function){
                                callback();
                            }
                        }
                    }else{
                        elem.style[attr] = iNow + speed + "px"; 
                    }
                },30)
            })(attribute)
        }
    }
}

function getStyle(elem,attr){
    if(getComputedStyle){
        return getComputedStyle(elem)[attr]
    }else{
        return elem.currentStyle[attr]
    }
}