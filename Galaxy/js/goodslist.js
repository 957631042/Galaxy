class goodsList{
    constructor(){
        this.search = document.querySelector(".search");
        this.cancel = document.querySelector(".cancel");
        this.allnavUrl = "../json/allnav.json"
        this.alliphonUrl = "../json/iphone-list.json"
        this.watchallUrl="../json/watch-list.json"
        this.log = document.querySelector(".log");
        this.cartPage = document.querySelector(".cart");
        this.addEvent();
        this.a = localStorage.getItem("id");
        this.liIndex = localStorage.getItem("index");
        this.load(this.a);    
        this.showname();
		this.searchcc();
    }
    showname(){
        var that=this;
        var user = JSON.parse(localStorage.getItem("user"));
        user.some(function(val,index){
            if(val.off==1){
                that.i=index;
            } 
        })
        if(this.i!=undefined){
            if(user[that.i].off===1){
                that.log.innerHTML= "<i></i>退出登录";
				that.log.style.color="blue";
				  this.log.removeAttribute("href");
                this.cartPage.href="../html/cart.html";
                $(".log").click(function(){
					user.some(function(val,index){
						if(val.off==1){
							that.i=index;
						} 
					})
                    user[that.i].off=0;
                    localStorage.setItem("user",JSON.stringify(user));
                    this.href="../html/login.html";
                })
            }
            if(user[that.i].off===0){
                that.log.innerHTML= "<i></i>登录/注册";
            }
        }
       
    }
    load(b){
        let str=``;
        let str0=``;
        let that=this;
        let arrurl=[this.alliphonUrl,this.watchallUrl,this.alliphonUrl,this.watchallUrl,this.alliphonUrl]
        ajaxGet(that.allnavUrl,function(res){
            that.allnavRes = JSON.parse(res);
        for(var j=0;j<that.allnavRes[b][1].length;j++){
            str0 += `<li><a href="##">${that.allnavRes[b][1][j]}</a></li>`
        }
        $(".allList").html(str0);  
        that.listClick()
        })
        ajaxGet(arrurl[b],function(res){
            that.alliphonRes = JSON.parse(res);
            let arr=[]
        for(var j = 0;j<that.alliphonRes.length;j++){
            for(var i=0;i<that.alliphonRes[j].length;i++){
                str+=`<li><a href="../html/goodsitem.html">
                <img  src="${that.alliphonRes[j][i].src}"><span class="name">${that.alliphonRes[j][i].hotname}</span>
                <span class="descr">${that.alliphonRes[j][i].descr}</span> 
                <span class="price">${that.alliphonRes[j][i].price}</span></a> 
                </li>`;
                arr.push(that.alliphonRes[j][i])
            }

        }	
		
			$(".nowname").html($(".nav-left").children("li").eq(b).children("a").html()+"("+arr.length+")");
            $(".goods").html(str);
            $(".goods").children("li").click(function(){
                localStorage.setItem("mes",JSON.stringify(arr[$(this).index()]))
            })  
            if(localStorage.getItem("index")){
                that.display(that.liIndex)
                $(".allList").find("li>a").css("color","#333")
                $(".allList").find("li>a").eq(that.liIndex).css("color","blue")
                localStorage.removeItem("index")
            }  
        })
        }
    addEvent(){
            var that = this;
        this.search.onclick = function(){
            $(".searchBox").show(500);
            }
            this.cancel.onclick = function(){
                $(".searchBox").hide(500);
            }
            $(".nav-left>li").click(function(){
                $(this).parent("ul").find("a").css("color","black")
                $(this).children("a").css("color","blue")
                that.i = $(this).index();
                that.load(that.i);
            })
            $(".nav-left").children("li").hover(function(){
                $(".nav-tip").eq($(this).index()).stop().slideDown(500);
                that.i = $(this).index();
                    var str =``;
                    var str1 =``;
                    for(var i=0;i<that.allnavRes[that.i][0].length;i++){
                        str+= `<li ><a href="../html/goodsitem.html">
                        <img  src="${that.allnavRes[that.i][0][i].src}"><span class="hotname">${that.allnavRes[that.i][0][i].hotname}</span>
                        </a></li>`;
                    }
                    for(var j=0;j<that.allnavRes[that.i][1].length;j++){
                        str1 += `<li>${that.allnavRes[that.i][1][j]}</li>`
                    }
                    $(".nav-img").html(str);  
                    $(".nav-small").html(str1);
                     $(".nav-img").children("li").click(function(){
                    localStorage.setItem("mes",JSON.stringify(that.allnavRes[that.i][0][$(this).index()]))
                })  
            },function(){
                $(".nav-tip").eq($(this).index()).stop().slideUp();
            })
        }
    listClick(){
        let that = this;
        let arrli=[$(".allList>li"),$(".nav-small>li")]
        for(var i=0;i<arrli.length;i++){
            arrli[i].click(function(eve){
                that.liIndex=$(this).index();
                $(".nav-small>li").eq($(this).index()).parent("ul").find("li").css("color","black");
                $(".allList>li").eq($(this).index()).parent("ul").find("li").find("a").css("color","black")
                $(".nav-small>li").eq($(this).index()).css("color","blue");
                $(".allList>li").eq($(this).index()).find("a").css("color","blue")
                that.display(that.liIndex);
                eve.stopPropagation();   
        })
        }
    }
    display(liIndex){
        var that=this;
        let str = ``;
            for(var i=0;i<this.alliphonRes[liIndex].length;i++){
                str+=`<li><a href="../html/goodsitem.html">
                <img  src="${this.alliphonRes[liIndex][i].src}">       <span class="name">${this.alliphonRes[liIndex][i].hotname}</span>
                <span class="descr">${this.alliphonRes[liIndex][i].descr}</span> 
                <span class="price">${this.alliphonRes[liIndex][i].price}</span></a>
                </li>`;
            }
			$(".nowname").html($(".allList").children("li").eq(liIndex).children("a").html()+"("+this.alliphonRes[liIndex].length+")");
            $(".goods").html(str);
            $(".goods").children("li").click(function(){
                localStorage.setItem("mes",JSON.stringify(that.alliphonRes[liIndex][$(this).index()]))
            })  
    }
	searchcc(){
		var that=this;
		let keyword=["手机","手表","电脑","家居","配件"];
		$(".searchBtn").click(function(){
			keyword.some(function(val,index){
				if(val==$(".searchword").val()){
					that.key=index;
					localStorage.setItem("id",that.key);
				}
			})
		})
		
	}

}
new goodsList();