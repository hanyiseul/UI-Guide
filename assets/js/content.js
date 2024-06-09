(() => {
    // gnb
    const menu = document.querySelector('.gnb > .menu');
    const body = document.querySelector("body");
    const btnMenu = document.querySelector(".btnMenu");
    btnMenu.setAttribute("tabindex","1");
    body.addEventListener('click', function(e){
        if(e.target == btnMenu){
            menu.classList.toggle("on");
        }else{
            menu.classList.remove("on");
        }
    });          

    //tab
    const tab = document.querySelectorAll(".tabWrap li");
    const con = document.querySelectorAll(".tabPannel");

    for(let i=0; i<tab.length; i++){
        tab[0].classList.add("on");
        con[0].classList.add("on");
        tab[i].setAttribute("tabindex","0");
        tab[i].addEventListener("click", function(){
            if(tab[i].getAttribute("class") != "on"){
                for(let x= 0; x<tab.length; x++){
                    tab[x].classList.remove("on");
                    con[x].classList.remove("on");
                }
                tab[i].classList.add("on");
                con[i].classList.add("on");
            }
        });
    }

     //accodian
     const acco = document.querySelectorAll(".acco");
     const accoHead = document.querySelectorAll(".accoHead");
     
     for(let i=0; i<acco.length; i++){
         acco[i].addEventListener("click", function(){
             if(acco[i].className.match("on")){
                 this.classList.remove("on");
             }else{
                 this.classList.add("on");
             }
         });
     }

     

    //  function scroll(e){
    //     if(window.innerWidth >= 1200){
    //         //scroll
    //         const main = document.querySelector(".main");
    //         const mainSection = main.parentNode;
    //         const mainHeight = mainSection.offsetHeight;
    //         const header = document.querySelector("header");
    //         window.addEventListener('scroll',function(){
    //             //section
    //             if(window.pageYOffset > 0){
    //                 mainSection.classList.add("on");
    //             }else if(mainHeight >= window.pageYOffset){
    //                 header.classList.remove("active");
    //                 mainSection.classList.remove("on");       
    //             }
    //             //header
    //             if(window.scrollY > 450){
    //                 header.classList.add("active");  
    //             }else{
    //                 header.classList.remove("active");  
    //             }
    //         });
            
    //     }
    //     return scroll;
    // }
    // scroll();
    // window.addEventListener('resize', function(e){
    //     if(window.innerWidth >= 1200){
    //         console.log("test");
    //         scroll();
    //         return;
    //     }else{
    //         return scroll;
    //         console.log("모바일");
    //     }
    // });
})();