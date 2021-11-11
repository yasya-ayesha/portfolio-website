const disabledScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;

  document.querySelector('.page__header').style.left = `calc(50% - ${720 + widthScroll/2}px)`; // fix bug with jumping section while modal opens/closes
  
  document.body.scrollPosition = window.scrollY;
  document.documentElement.style.cssText = `
    position: relative;
    height: 100vh;
  `
  document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding-right: ${widthScroll}px;
  `;
};

const enabledScroll = () => {
  document.querySelector('.page__header').style.left = 'calc(50% - 720px)';
  document.documentElement.style.cssText = '';
  document.body.style.cssText = 'position: relative;';
  window.scroll({top: document.body.scrollPosition});
};

{ // * modal window
  const presentOrderBtn = document.querySelector('.present__order-btn');
  const pageOverlayModal = document.querySelector('.page__overlay_modal');
  const modalClose = document.querySelector('.modal__close');

  const handlerModal = (openBtn, modal, openSelector, closeTrigger, sk = 'default') => {
    let opacity = 0;
    const speed = {
      slow: 0.02,
      medium: 0.05,
      fast: 0.1
    };

    const openModal = () => {
      disabledScroll();
      modal.style.opacity = opacity;
      modal.classList.add(openSelector);
      const anim = () => {
        opacity += speed[sk];
        modal.style.opacity = opacity;
        if (opacity < 1) requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
      /* 
      * alternative animation through setInterval
      const timer = setInterval(() => {
        opacity += 0.02;
        modal.style.opacity = opacity;
        if (opacity >= 1) clearInterval(timer)
      }, speed[sk]
      // speed[sk] ? speed[sk] : speed.default - alternative way to set speed
      );
      */
    };

    const closeModal = () => {
      enabledScroll();
      const anim = () => {
        opacity -= speed[sk];
        modal.style.opacity = opacity;
        if (opacity > 0) {
          requestAnimationFrame(anim);
        } else {
          modal.classList.remove(openSelector);
        }
      };
      requestAnimationFrame(anim);
      /* 
      * alternative animation through setInterval
      const timer = setInterval(() => {
        opacity -= 0.02;
        modal.style.opacity = opacity;
        if (opacity <= 0) {
          clearInterval(timer);
          modal.classList.remove(openSelector);
        }
      }, speed[sk]);
      */
    }

    openBtn.addEventListener('click', openModal);
    closeTrigger.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    })
  };

  handlerModal(
    presentOrderBtn,
    pageOverlayModal,
    'page__overlay_modal_open',
    modalClose,
    'medium'
  );
}

{ // * burger menu
  const headerContactsBurger = document.querySelector('.header__contacts-burger');
  const headerContacts = document.querySelector('.header__contacts');
  
  const handlerBurger = (openBtn, menu, openSelector) => {
    openBtn.addEventListener('click', () => {
      if (menu.classList.contains(openSelector)) {
        menu.style.height = '';
        menu.classList.remove(openSelector);
      } else {
        menu.style.height = menu.scrollHeight + 'px';
        menu.classList.add(openSelector);
      }
    })
  };
  handlerBurger(headerContactsBurger, headerContacts, 'header__contacts_open');
}

{ // * gallery
  const portfolioList = document.querySelector('.portfolio__list');
  
  const pageOverlay = document.createElement('div');
  pageOverlay.classList.add('page__overlay');

  portfolioList.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card) {
      document.body.append(pageOverlay);
      const title = card.querySelector('.card__client');

      const picture = document.createElement('picture');
      picture.style.cssText = `
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 1440px;
      `;

      picture.innerHTML = `
        <source srcset="${card.dataset.fullImage}.avif" type="image/avif">
        <source srcset="${card.dataset.fullImage}.webp" type="image/webp">
        <img src="${card.dataset.fullImage}.jpg" alt="${title.textContent}">
      `;

      /* 
      * simple way to add image (.jpg only)
      // .avif is tiniest one, .webp is 2 times heavier and .jpg is 2 times heavier than .webp
      const img = document.createElement('img');
      img.src = card.dataset.fullImage + '.jpg';
      img.style.cssText = `
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
      `
      */

      pageOverlay.append(picture);
      disabledScroll();
    }
  });
  pageOverlay.addEventListener('click', () => {
    pageOverlay.remove();
    pageOverlay.textContent = '';
    enabledScroll();
  })
}