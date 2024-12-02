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
          sidebar();
        };
      });
    }

  // 모바일 높이
  function mobileHeight () {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  mobileHeight();
  
  //tab
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

  // sidebar
  window.onload = function sidebar() {
    setTimeout(() => {
      const sidebar = document.querySelector('.sidebar');
      const sideBtn = document.querySelector('.header__sidebarTrigger');
      sideBtn.addEventListener('click', () => {
        document.body.style.overflow = "hidden";
        sidebar.classList.add('is-active');
      })
      const sideClose = document.querySelector('.header__sidebarClose');
      sideClose.addEventListener("click", () => {
        document.body.style.overflow = "visible";
        sidebar.classList.remove('is-active');
      })
    }, 350);
  }
  
  function btnClosed() {
    const btnClose = document.querySelectorAll('.btn__closed');
    
    if(btnClose) {
      btnClose.forEach(closed => {
        closed.addEventListener('click', () => {
          closed.closest('[data-closed="closed"]').classList.toggle('is-closed');
          document.querySelector('body').style.overflow = 'visible'
        });
      });
    }
  }

  function listChecked() {
    const checkAll = document.querySelectorAll('.check__all');
    const checkDelete = document.querySelector('.checked__modal .btn__delete');
    const checkbox = document.querySelectorAll('.list__input');
    const checkModal = document.querySelector('.checked__modal');
    
    // // 전체선택
    // checkAll.forEach(checkAll => {
    //   if(checkAll) {
    //     checkAll.addEventListener('change', ()=> {
    //       checkbox.forEach(checkbox => {
    //         if(checkAll.checked) {
    //           checkbox.checked = true
    //           if(checkModal) {
    //             checkModal.classList.remove('is-closed');
    //           }
    //           checkbox.closest('li').classList.add('is-select');
    //         } else {
    //           checkbox.checked = false
    //           if(checkModal) {
    //             checkModal.classList.add('is-closed');
    //           }
    //           checkbox.closest('li').classList.remove('is-select');
    //         }
    //       });
    //     });
    //     checkAll.addEventListener('click', ()=> {
    //       checkbox.forEach(checkbox => {
    //         checkbox.checked = true
    //         checkbox.closest('li').classList.add('is-select');
    //       });
    //     });
    //   }
    // });

    // // 선택 삭제
    // if(checkDelete) {    
    //   checkDelete.addEventListener('click', () => {
    //     const checked = document.querySelectorAll('.list__input:checked')
    //     checked.forEach(checked => {
    //       checked.closest('li').remove();
    //     });
    //   });
    // }
    
    // 선택시 박스 컬러
    checkbox.forEach(checkbox => {
      if(checkbox.checked) {
        checkbox.closest('li').classList.add('is-select');
        if(checkModal) {
          checkModal.classList.remove('is-closed');
        }
      }
      checkbox.addEventListener('change', (e) => {
        if(e.target.checked) {
          e.target.closest('li').classList.add('is-select');
          if(checkModal) {
            checkModal.classList.remove('is-closed');
          }
        } else {
          e.target.closest('li').classList.remove('is-select');
          if(checkModal) {
            checkModal.classList.add('is-closed');
          }
        }
      });
    });
  }

  function dropdown() {
    const btnDropdown = document.querySelectorAll('.btn__dropdown');   

    btnDropdown.forEach(btnDropdown => {
      btnDropdown.addEventListener('click', (e) => {
        btnDropdown.closest('.dropdown__area').classList.toggle("is-active");
        e.target.focus();
        if(document.documentElement.clientWidth / 2 > btnDropdown.getBoundingClientRect().x) {
          btnDropdown.closest('.dropdown__area').querySelector('.dropdown').style.left = `${btnDropdown.getBoundingClientRect().x  - 15}px`;
          btnDropdown.closest('.dropdown__area').querySelector('.dropdown').style.right = `inherit`;
        } else {
          btnDropdown.closest('.dropdown__area').querySelector('.dropdown').style.right = `${document.documentElement.clientWidth - btnDropdown.getBoundingClientRect().x - 45}px`;
          btnDropdown.closest('.dropdown__area').querySelector('.dropdown').style.left = `inherit`;
        }
      })
      btnDropdown.addEventListener('blur', (e) => {
        if(!e.target.closest('.dropdown__area').classList.contains('double__dropdown')) {
          setTimeout(() => {
            btnDropdown.closest('.dropdown__area').classList.remove("is-active");
          }, 200);
        }
      })
    });

    // 댓글 드롭다운
    const btnMore = document.querySelectorAll('.btn__dropdownMore');
    btnMore.forEach(btn => {
      btn.addEventListener('click', (e) => {
        btn.closest('.dropdown__area').classList.add("is-active");
        e.target.focus();
        if(document.documentElement.clientWidth / 2 > e.target.getBoundingClientRect().x) {
          e.target.closest('.dropdown__area').querySelector('.dropdown').style.left = `${e.target.getBoundingClientRect().x  - 15}px`;
          e.target.closest('.dropdown__area').querySelector('.dropdown').style.right = `inherit`;
        } else {
          e.target.closest('.dropdown__area').querySelector('.dropdown').style.right = `${document.documentElement.clientWidth - e.target.getBoundingClientRect().x - e.target.clientWidth - 15}px`;
          e.target.closest('.dropdown__area').querySelector('.dropdown').style.left = `inherit`;
        }
      });
      btn.addEventListener('blur', (e) => {
        setTimeout(() => {
          e.target.closest('.dropdown__area').classList.remove("is-active");
        }, 200);
      });
    });
  }

  function modal() {
    const modal = document.querySelectorAll('.is-modal');

    modal.forEach(modal => {
      modal.addEventListener('click', (e) => {
        let popup = document.querySelector(`#${modal.dataset.modal}`);
        popup.classList.remove('is-closed');
        document.querySelector('body').style.overflow = 'hidden';
      });
    });
  }
  
  function form () {
    // 받는사람 추가
    const receiverInput = document.querySelectorAll('.form__receiver .formText__input');

    receiverInput.forEach(
      input => {
        input.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          const flag = document.createElement('div');
          flag.classList.add('receiver__flag');
          flag.innerHTML = `
          <div class="flag">
            <span class="label">${input.value}</span>
            <button type="button" class="btn btn__remove">
              <img src="/UI-Guide/html/mobile/assets/images/svg/icon-closed.svg" alt="">
              <span class="visually-hidden">삭제</span>
            </button>
          </div>`;
          input.closest('.form__receiver').appendChild(flag);
          input.focus();
          input.value = '';
        }
      });
    });
    
    const receiver = document.querySelectorAll('.form__receiver');

    receiver.forEach(receiver => {
      receiver.addEventListener("click", (e) => {
        console.log(e.target)
        if(e.target.classList.contains("btn__remove")) {
          e.target.closest('.receiver__flag').remove();
        }
      });
    });
    
    // 참조 드롭다운
    const reference = document.querySelectorAll('.reference');
    const referenceShow = document.querySelectorAll('.btn__reference');

    referenceShow.forEach(referenceShow => {
      if(referenceShow) {
        referenceShow.addEventListener('click', () => {
          referenceShow.classList.toggle("on");
          reference.forEach(reference => {
            reference.classList.toggle('on');
          });
        });
      }    
    })

    // 받는사람 탭 드롭다운
    const referenceBtn = document.querySelectorAll('.btn__referenceDropdown');

    const referenceTab = document.createElement('div');
    referenceTab.classList.add('reference__dropdown');
    referenceTab.innerHTML = `
    <div class="tabs">
      <div class="tab__item">
        <button type="button" class="tab__btn is-active" data-url="#tab__reference-1">
          <span>조직도</span>
        </button>
        <button type="button" class="tab__btn" data-url="#tab__reference-2">
          <span>연락처</span>
        </button>
      </div>

      <div class="tab__contents">
        <div class="tab__content is-active" id="tab__reference-1">
          <ul class="check__list contact__list recipient no-line">       
            <li>
              <div class="check__item">
                <div class="input">
                  <input type="checkbox" id="checkbox1" class="input__checkbox list__input" checked="checked">
                  <label for="checkbox1" class="label__checkbox"><span class="visually-hidden">연락처 선택</span></label>
                </div>
                <span class="profile__img">
                  <svg class="img"><use href="#img-profile1"></use></svg>
                </span>
                <div class="contact__item">
                  <div class="contact__info">
                    <span class="contact__name">이예진</span>
                    <span class="contact__team">UI개발팀</span>
                    <div class="contact">
                      <span class="contact__email">it1880SSasKim33@gsitm.com</span>
                      <span class="contact__phone">010-9022-1670</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="check__item">
                <div class="input">
                  <input type="checkbox" id="checkbox2" class="input__checkbox list__input">
                  <label for="checkbox2" class="label__checkbox"><span class="visually-hidden">연락처 선택</span></label>
                </div>
                <span class="profile__img">
                  <svg class="img"><use href="#img-profile1"></use></svg>
                </span>
                <div class="contact__item">
                  <div class="contact__info">
                    <span class="contact__name">이예진</span>
                    <span class="contact__team">UI개발팀</span>
                    <div class="contact">
                      <span class="contact__email">it1880SSasKim33@gsitm.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="tab__content" id="tab__reference-2">
          <ul class="check__list contact__list recipient no-profile no-line">
            <li>
              <div class="check__item">
                <div class="input">
                  <input type="checkbox" id="checkbox4" class="input__checkbox list__input" checked="checked">
                  <label for="checkbox4" class="label__checkbox"><span class="visually-hidden">연락처 선택</span></label>
                </div>
                <div class="contact__item">
                  <div class="contact__info">
                    <span class="contact__email">it1880SSasKim33@gsitm.com</span>
                  </div>
                  <button type="button" class="btn btn__remove">
                    <svg class="icon"><use href="#icon-closed"></use></svg>
                    <span class="visually-hidden">삭제하기</span>
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div class="check__item">
                <div class="input">
                  <input type="checkbox" id="checkbox3" class="input__checkbox list__input">
                  <label for="checkbox3" class="label__checkbox"><span class="visually-hidden">연락처 선택</span></label>
                </div>
                <div class="contact__item">
                  <div class="contact__info">
                    <span class="contact__name">이예진</span>
                    <span class="contact__email">it1880SSasKim33@gsitm.com</span>
                    <span class="contact__phone">010-9022-1670</span>
                  </div>
                  <div class="contact__btn">
                    <button type="button" class="btn btn__remove">
                      <svg class="icon"><use href="#icon-closed"></use></svg>
                      <span class="visually-hidden">삭제하기</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="check__item">
                <div class="input">
                  <input type="checkbox" id="checkbox3" class="input__checkbox list__input">
                  <label for="checkbox3" class="label__checkbox"><span class="visually-hidden">연락처 선택</span></label>
                </div>
                <div class="contact__item">
                  <div class="contact__info">
                    <span class="contact__email">it1880SSasKim33@gsitm.com</span>
                    <span class="contact__phone">010-9022-1670</span>
                  </div>
                  <div class="contact__btn">
                    <button type="button" class="btn btn__remove">
                      <svg class="icon"><use href="#icon-closed"></use></svg>
                      <span class="visually-hidden">삭제하기</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn__area">
        <button type="button" class="btn"><span>확인</span></button>
        <button type="button" class="btn"><span>취소</span></button>
      </div>
    </div>`;

    referenceBtn.forEach(reference => {
      reference.addEventListener('click', (e) => {
        if(e.target.closest('.formControl').classList.contains('has-reference')) {
          reference.closest('.formControl').classList.remove('has-reference');
        } else {
          const sibling = reference.closest('.formControl').parentElement.children;
          for(let i = 0; i < sibling.length; i++) {
            sibling[i].classList.remove('has-reference')
          }
          e.target.closest('.formControl').classList.add('has-reference');
        }

        if(e.target.closest('.formControl').classList.contains('has-reference')) {
          document.querySelector('body').style.overflow ='hidden';

          e.target.closest('.formControl').appendChild(referenceTab);
          referenceTab.style.top = `${e.target.closest('.formControl').getBoundingClientRect().top + e.target.closest('.formControl').offsetHeight}px`;
          referenceTab.style.height = `calc(100% - ${e.target.closest('.formControl').getBoundingClientRect().top + e.target.closest('.formControl').offsetHeight}px)`;
          
          const remove = document.querySelectorAll('.reference__dropdown .btn__remove');
          remove.forEach(remove => {
            remove.addEventListener('click', (e) => {
              if(e.target == e.currentTarget) {
                e.target.closest('li').remove();
                document.querySelector('body').style.overflow ='visible';
              }
            }) ;
          });
        } else {
          reference.closest('.formControl').classList.remove('has-reference');
          referenceTab.remove();
          document.querySelector('body').style.overflow ='visible';
        }
        listChecked();
        tab();
      });
    });

    // input focus 
    const input = document.querySelectorAll('.formText__input');

    input.forEach(input => {
      input.addEventListener('focus', () => {
        if(input.closest('.form').classList.contains('has-full') && input.closest('.formControl__option')) {
          input.closest('.formControl__option').classList.add('is-active');
        } else if(input.closest('.formControl__option')) {
          input.closest('.formControl').classList.add('is-active');
        }
        referenceTab.remove();
        referenceBtn.forEach(reference => {
          reference.closest('.formControl').classList.remove('has-reference');
        });
      });
      input.addEventListener('focusout', () => {
        if(input.closest('.form').classList.contains('has-full') && input.closest('.formControl__option')) {
          input.closest('.formControl__option').classList.remove('is-active');
        } else if(input.closest('.formControl__option')) {
          input.closest('.formControl').classList.remove('is-active');
        }
      });
    });
    
    // 작성폼 추가/삭제
    const formControl = document.querySelectorAll('.formControl');

    formControl.forEach(control => {
      control.addEventListener('click', (e) => {
        if(e.target.classList.contains('form-add')) {
          let formCopy;
          formCopy = e.target.closest('.formControl__option').cloneNode(true);
          e.target.closest('.formControl').appendChild(formCopy);
          formCopy.querySelector('.formText__input').value = '';
        }
        if(e.target.classList.contains('form-delete')) {
          if(e.target.closest('.formControl').querySelectorAll('.formControl__option').length > 1) {
            e.target.closest('.formControl__option').remove();
          }
        }
      });
    });
  }

  function login () {
    // login
    const inputId = document.querySelectorAll('.is-id');
    const inputpw = document.querySelectorAll('.is-pw');
    const btnDelete = document.querySelectorAll('.btn.btn__inputDel');
    const btnShow = document.querySelectorAll('.btn.btn__valueShow');

    if(btnDelete) {
      inputId.forEach(input => {
        btnDelete.forEach(btnDelete => {
          input.addEventListener('focus', () => {
            btnDelete.style.display = 'block'
            btnDelete.addEventListener('click', () => {
              input.value = '';
              btnDelete.style.display = 'none'
            });
          });

          input.addEventListener('focusout', () => {
            input.addEventListener('change', () => {
              if(input.value == '') {
                tnDelete.style.display = 'none'
              } else {
                btnDelete.style.display = 'block'
              }
            });
          });
        });
      });
    }

    if(btnShow) {
      const passwordField = document.querySelectorAll('.input.password');
      passwordField.forEach(field => {
        const input = field.querySelector('.is-pw');
        const btnShow = field.querySelector('.btn__valueShow');

        input.addEventListener('focus', () => {
          btnShow.style.display = 'block'
        });

        input.addEventListener('focusout', () => {
            input.addEventListener('change', () => {
                if(input.value == '') {
                  btnShow.style.display = 'none'
                } else {
                  btnShow.style.display = 'block'
                }
            });
        });

        btnShow.addEventListener('click', () => {
          btnShow.classList.toggle('hidden');
          if(btnShow.classList.contains('hidden')) {
            input.type = 'text'
          } else {
            input.type = 'password'
          }
        });
      });
    }
  }
  
  // DOMContentLoaded
  window.addEventListener("DOMContentLoaded", function () {
    includeHTML();
    mobileHeight();
    tab();
    btnClosed();
    listChecked();
    dropdown();
    modal();
    form();
    login();
  });
  window.addEventListener('resize', mobileHeight);
})();
