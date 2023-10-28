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

    // dropdown
    function dropdown() {
      const btn = document.querySelectorAll('.dropdown__btn');

      btn.forEach(btn => {
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

    // tab
    function tab() {
      const tab = document.querySelectorAll('.tabs > li .btn__tab')

      tab.forEach(tab => {
        tab.addEventListener("click", () => {
          const tabs = document.querySelectorAll('.btn__tab');

          tabs.forEach(tab => {
            if(tab.classList.contains('is-acitve')) {
              console.log(tab)
              tab.classList.remove('is-active');
            }
          })
          tab.classList.add('is-active');
          // for(let i = 0; i < tabs.length; i++) {
          //   if(tabs[i].classList.contains('is-acitve')) {
          //     console.log(tabs)
          //     tabs[i].classList.remove('is-active');
          //   }
          //   tab.classList.add('is-active');
          // }
        });
      });
    };
    tab();

    // tooltip
    function tooltip () {
      const tooltip = document.querySelectorAll('.tooltip__desc');

      tooltip.forEach(tooltip => {
        console.log(tooltip.getBoundingClientRect())
        console.log(window.innerHeight / 2)
        console.log(tooltip.getBoundingClientRect().y)

        if(window.innerHeight / 2 < tooltip.getBoundingClientRect().y) {
          tooltip.style.top = '-30px'
        } else {
          tooltip.style.bottom = '-30px'
        }
      });

      const tooltipText = document.querySelectorAll('.tooltip__text');

      tooltipText.forEach(tooltipText => {
        const tooltipContents = document.createElement('span');
        tooltipContents.className = 'tooltip__desc';
        tooltipContents.innerHTML = tooltipText.innerHTML;
        tooltipText.parentNode.style.position = 'relative';
        tooltipText.after(tooltipContents)
      })
    }
    tooltip();
})();