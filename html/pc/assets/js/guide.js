(() => {
  const guideBtn = document.querySelectorAll('.guideBtn');
    guideBtn.forEach((button)=>{
      button.addEventListener('click', () => {
          const guide = button.closest('.is-guide').getElementsByClassName('guide-code');
          
          for(let i=0; i < guide.length; i++){
              const guideCode = guide[i].innerHTML;
              window.navigator.clipboard.writeText(guideCode.trim()).then(() => {
                  alert("복사완료");
              });
          }
      });
      const guide = button.closest('.is-guide').getElementsByClassName('guide__code');
      const guideCode = button.closest('.is-guide').getElementsByClassName('guideCode');

      for(let i=0; i < guide.length; i++){    
          let code = document.createElement('xmp');
          code.setAttribute('class', 'guide-code');
          code.innerHTML =  guide[i].innerHTML;
          guideCode[i].appendChild(code);
      }

      button.addEventListener('click', () =>{
          console.log(button);
      });
  });

  window.onload = function () {
    const btnMenu = document.querySelector("header .btnMenu");
    console.log(btnMenu)
    btnMenu.addEventListener("click", () => {
      console.log('hi')
      btnMenu.closest(".container.container__guide").classList.toggle('sidebar-active');
    })
  }
})();
