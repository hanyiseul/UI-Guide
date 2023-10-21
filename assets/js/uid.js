(() => {
  // layout 호출
  function includeHTML(){
    let allElements = document.getElementsByTagName('*');
      Array.prototype.forEach.call(allElements, function (el) {
        let includePath = el.dataset.includePath;
        if (includePath) {
          let xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              el.outerHTML = this.responseText;
            };
          };
          xhttp.open('GET', includePath, true);
          xhttp.send();
        };
      });
    }
    includeHTML();

    function dropdown() {
      const btn = document.querySelectorAll('.dropdown__btn');

      btn.forEach((btn) => {
        btn.addEventListener('click', () => {
          
          // accordion
          // if(btn.closest('.accordion')) {
          //   const before = btn.closest('.accordion').querySelector('.dropdown__btn.is-active')

          //   console.log(before.closest('.dropdown'));
          //   before.closest('.dropdown').querySelector('.dropdown__content').style.maxHeight = null; 
          //   before.classList.remove('is-active');
          //   console.log(before.nextElementSibling);
          // };

          btn.classList.toggle('is-active');
          
          // dropdown show/hide
          const dropdown = btn.closest('.dropdown').querySelector('.dropdown__content');
          if(!btn.classList.contains('is-active')) {
            dropdown.style.maxHeight = 0
          } else {
            dropdown.style.maxHeight = `${dropdown.scrollHeight}px`
          };
        });
      });
    };
    dropdown();

})();