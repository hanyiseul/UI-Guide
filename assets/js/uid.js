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
      const tabBtn = document.querySelectorAll('.tab__list > li .btn__tab');
        
        tabBtn.forEach((tabBtn) => {
          const tab = tabBtn.closest('.tab');
          const tabList = tab.querySelector('.tab__list');
          const tabCon = tabList.nextElementSibling;
          const href = tabBtn.getAttribute('href');

          tabBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const tabBtns = tab.querySelectorAll('.btn__tab');
            tabBtns.forEach(btn => {
              btn.classList.remove('is-active');
            });

            const tabCons = tabCon.querySelectorAll('.tab__content');
            tabCons.forEach(con => {
              con.classList.remove('is-active');
            });

            tabBtn.classList.add('is-active');
            tabCon.querySelector(`#${href}`).classList.add('is-active');
          });
        });


      // const tab = document.querySelectorAll('.tab');
      // tab.forEach(tab => {
      //   const tabBtn = tab.querySelectorAll('.tab__list > li .btn__tab');
        
      //   tabBtn.forEach((tabBtn) => {
      //     const tabCon = tabBtn.closest('.tab__list').nextElementSibling;
      //     console.log(tabBtn);

      //     tabBtn.addEventListener('click', (e) => {
      //       e.preventDefault();
      //       console.log(tabCon);
      //     });
      //     // tabBtn.addEventListener('click', (e) => {
      //     //   e.preventDefault();
      //     //   console.log(tabCon);
      //     // });
      //   });
      // })

      // const tab = document.querySelectorAll('.tab');
      // tab.forEach(tab => {
      //   const tabBtn = tab.querySelectorAll('.tab__list > li .btn__tab');
      //   tabBtn.forEach((tabBtn, index) => {
      //     tabBtn.addEventListener('click', (e) => {
      //       console.log(tabBtn)
      //       e.preventDefault();
      //       const btn = tabBtn.closest('.tab').querySelectorAll('.tab__list > li .btn__tab');
      //       const content = tab.closest('.tab').querySelectorAll('.tab__contents > .tab__content');
      //       console.log(content[index])
      //       btn.forEach((btn, index) => {
      //         btn.classList.remove('is-active');
      //         content[index].classList.remove('is-active');
      //       });
      //       tabBtn.classList.add('is-active');
      //       content[index].classList.add('is-active');
      //     });
      //   });
      // });
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