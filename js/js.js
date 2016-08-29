/**
 * Created by Administrator on 2016/8/23.
 */
var flashBox=document.getElementById("flash");
var flash_left=document.getElementById("flash_left");
var flash_right=document.getElementById("flash_right");
var spanNodes=document.getElementsByTagName("span");
var ulNode=document.getElementsByTagName("ul")[0];
var liNodes=ulNode.getElementsByTagName("li");
var flash;
var scale;
var count;

flashBox.onmouseenter=function(){
    flash_left.style.display="";
    flash_right.style.display="";
    clearInterval(flash);

};
flashBox.onmouseleave=function(){
    flash_left.style.display="none";
    flash_right.style.display="none";
    flash=setInterval(flash_left.onclick,2000);
};

for(i=0;i<spanNodes.length;i++){
    spanNodes[i].index=i;
    spanNodes[i].onmouseenter= function () {
        if(this.className.indexOf("flash_btnCur")!=-1){//如果移入当前已有样式则返回函数
            return false;
        }
        var oldPos;
        for(j=0;j<spanNodes.length;j++){//查找旧的样式位置
            if(spanNodes[j].className.indexOf("flash_btnCur")!=-1){
                oldPos=j;
                break;
            }
        }
        spanNodes[oldPos].className="";//去除旧位置的样式
        this.className="flash_btnCur";//当前加上样式
        scale=this.index;//0的时候外边距为0*900、1的时候外边距为2*900、2的时候外边距为3*900
        count=Math.abs(oldPos-this.index);//得到前后移动的倍数差
        moveFun(scale,count);

    }
}

function moveFun(num,num2) {
    var imgWidth=liNodes[0].clientWidth;//获取图片宽度
    var margin=parseFloat(ulNode.style.marginLeft);//获取当前ul节点的marginLeft
    var dist=-num*imgWidth;//目标外边距
//    console.log(margin,dist);
//    console.log(num2);
    if(margin>dist){    //向右移动    //当当前外边距大于目标外边距时进入循环
        margin-=num2*imgWidth/90;//变速移动，固定90ms移动
        ulNode.style.marginLeft=margin+"px";
        setTimeout(function () {
            moveFun(scale,count);
        },8)
    }

    if(margin<dist){ //向左移动     //当当前外边距小于目标外边距时进入循环
        margin+=num2*imgWidth/90;
        ulNode.style.marginLeft=margin+"px";
        setTimeout(function () {
            moveFun(scale,count);
        },8)
    }
}

flash_left.onclick= function () {
    var oldPos,newPos;
    for(j=0;j<spanNodes.length;j++){//找到旧的位置
        if(spanNodes[j].className.indexOf("flash_btnCur")!=-1){
            oldPos=j;
            break;
        }
    }
    newPos= oldPos==spanNodes.length-1 ? 0 :oldPos+1;//找到新的位置
    spanNodes[oldPos].className="";
    spanNodes[newPos].className="flash_btnCur";
    scale=newPos;//外边距移动倍数
    count=Math.abs(oldPos-newPos);//前后移动的倍数差
    moveFun(scale,count);
};
flash_right.onclick= function () {
    var oldPos,newPos;
    for(j=0;j<spanNodes.length;j++){
        if(spanNodes[j].className.indexOf("flash_btnCur")!=-1){
            oldPos=j;
            break;
        }
    }
    newPos= oldPos==0 ? spanNodes.length-1:oldPos-1;
    spanNodes[oldPos].className="";
    spanNodes[newPos].className="flash_btnCur";
    scale=newPos;
    count=Math.abs(oldPos-newPos);
    moveFun(scale,count);
};

