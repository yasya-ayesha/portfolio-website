const presentOrderBtn = document.querySelector('.present__order-btn');
const pageOverlayModal = document.querySelector('.page__overlay_modal');
const modalClose = document.querySelector('.modal__close');

const handlerModal = (openBtn, modal, openSelector, closeTrigger, sk = 'default') => {
  let opacity = 0;
  const speed = {
    slow: 10,
    medium: 8,
    fast: 1,
    default: 5
  };
  
  openBtn.addEventListener('click', () => {
    modal.style.opacity = opacity;
    modal.classList.add(openSelector);

    const timer = setInterval(() => {
      opacity += 0.02;
      modal.style.opacity = opacity;
      if (opacity >= 1) clearInterval(timer)
    }, speed[sk]
    // speed[sk] ? speed[sk] : speed.default - alternative way to set speed
    );
  });

  closeTrigger.addEventListener('click', () => {
    const timer = setInterval(() => {
      opacity -= 0.02;
      modal.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(timer);
        modal.classList.remove(openSelector);
      }
    }, speed[sk]);
  })
};

handlerModal(
  presentOrderBtn, 
  pageOverlayModal, 
  'page__overlay_modal_open', 
  modalClose, 
  'default'
  );