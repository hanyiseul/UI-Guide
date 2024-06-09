(() => { 


    // const elm = document.querySelectorAll("section");
    // const elmCount = elm.length;
    // elm.forEach((item, index) => {
    //   item.addEventListener("wheel", ((e) => {
    //     e.preventDefault();
    //     let delta = 0;
    //     if (!e) e = window.e;
    //     if (e.wheelDelta) {
    //       delta = e.wheelDelta / 120;
    //       if (window.opera) delta = -delta;
    //     } else if (e.detail) delta = -e.detail / 3;

    //     let moveTop = window.scrollY;
    //     let elmSelector = elm[index];

    //     // wheel down : move to next section
    //     if (delta < 0) {
    //       if (elmSelector !== elmCount - 1) {
    //         try {
    //           moveTop =
    //             window.pageYOffset +
    //             elmSelector.nextElementSibling.getBoundingClientRect().top;
    //         } catch (e) {}
    //       }
    //     }

    //     // wheel up : move to previous section
    //     else {
    //       if (elmSelector !== 0) {
    //         try {
    //           moveTop =
    //             window.pageYOffset +
    //             elmSelector.previousElementSibling.getBoundingClientRect().top;
    //         } catch (e) {}
    //       }
    //     }
    //     window.scrollTo({ top: moveTop, left: 0,});
    //   }));
    // });

    // function debounce(func, delay) {
    //   let timer;
    //   return function() {
    //       const args = arguments;
    //       clearTimeout(timer);
    //       timer = setTimeout(() => {
    //           func.apply(this, args);
    //       }, delay);
    //   }
    // }

})();

  