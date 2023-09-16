function includeHTML(){
    let allElements = document.getElementsByTagName('*');
      Array.prototype.forEach.call(allElements, function(el) {
        let includePath = el.dataset.includePath;
        if (includePath) {
          let xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              el.outerHTML = this.responseText;
            }
          };
          xhttp.open('GET', includePath, true);
          xhttp.send();
        }
      });
}//includeHTML
 
 
/* ✨ 실행 */
window.addEventListener('DOMContentLoaded',()=>{
    includeHTML();
});
 