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
            dropdown.style.maxHeight = 0;
          } else {
            dropdown.style.maxHeight = `${dropdown.scrollHeight}px`;
          };
        });
      });
    };
    dropdown();

    // tab
    function tab() {
      const tabBtn = document.querySelectorAll('.tab__list > li .btn__tab');
        
      tabBtn.forEach((tabBtn) => {
        
        const tab = tabBtn.closest('.tab');
        const tabList = tab.querySelector('.tab > .tab__list');
        const tabCons = tabList.nextElementSibling;
        const href = tabBtn.getAttribute('href');

        tabBtn.addEventListener('click', (e) => {
          e.preventDefault();
          
          const tabBtns = tabList.querySelectorAll('.btn__tab');
          tabBtns.forEach(btn => {
            btn.classList.remove('is-active');
          });

          const tabCon = tabCons.children
          for (let i = 0; i < tabCon.length; i++) {
            tabCon[i].classList.remove('is-active')
          }

          tabBtn.classList.add('is-active');
          tabCons.querySelector(`${href}`).classList.add('is-active');
        });
      });
    };
    tab();

    // tooltip
    function tooltip () {
      const tooltip = document.querySelectorAll('.tooltip__desc');

      tooltip.forEach(tooltip => {

        if(window.innerHeight / 2 < tooltip.getBoundingClientRect().y) {
          tooltip.style.top = '-30px';
        } else {
          tooltip.style.bottom = '-30px';
        }
      });

      const tooltipText = document.querySelectorAll('.tooltip__text');

      tooltipText.forEach(tooltipText => {
        const tooltipContents = document.createElement('span');
        tooltipContents.className = 'tooltip__desc';
        tooltipContents.innerHTML = tooltipText.innerHTML;
        tooltipText.parentNode.style.position = 'relative';
        tooltipText.after(tooltipContents);
      })
    }
    tooltip();

    //popup
    function modal() {
      const modalBtn = document.querySelectorAll('.btn__modal');
      const closedBtn = document.querySelectorAll('.is-closed');
  
      modalBtn.forEach(btn => {
        btn.addEventListener('click', () => {
          let modalName = btn.getAttribute('name')
          document.querySelector(`.${modalName}`).classList.add('is-active');
          document.body.style.overflow = 'hidden';
        })
      })
      closedBtn.forEach(btn => {
        console.log(btn.closest('.modal'))
        btn.addEventListener('click', () => {
          btn.closest('.modal').classList.remove('is-active');
          document.body.removeAttribute('style');
        })
      })
    }
    modal();

    // progress bar scroll
    function progress () {
      const progress = document.querySelector('.progress.is-scroll .progress__bar');

      if(progress) {
        const scrollEvent = () => {
          const scrollTop = document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = document.documentElement.clientHeight;

          const progressBar = (scrollTop / (scrollHeight - clientHeight))  * 100

          progress.style.width = `${progressBar}%`
        }
  
        window.addEventListener('scroll', () => scrollEvent());

      }

        
    }
    progress();
})();