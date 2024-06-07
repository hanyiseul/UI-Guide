window.addEventListener('load', function() {
    //scroll
    const main = document.querySelector(".main wrap");
    const mainSection = this.document.querySelector(".main");
    const mainHeight = mainSection.offsetHeight;
    const header = document.querySelector("header");
    window.addEventListener('scroll',function(){
        //section
        if(window.pageYOffset > 0){
             mainSection.classList.add("on");
        }else if(mainHeight >= window.pageYOffset){
             header.classList.remove("active");
             mainSection.classList.remove("on");       
        }
        //header
        if(window.scrollY > 450){
             header.classList.add("active");  
        }else{
             header.classList.remove("active");  
        }
    });
});