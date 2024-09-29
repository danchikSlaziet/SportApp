import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { setActivePanel } from '../../store/mainReducer';

const Snackbar = ({overlayClass, setOverlayClass}) => {
  const dispatch = useDispatch();
  const groupLink = useSelector(state => state.main.groupLink);
  const [linkText, setLinkText] = useState('Перейти в сообщество');
  function onClickOverlay(evt) {
    // if (evt.target.className === "snackbar-faq snackbar-faq_active") {
    //   setOverlayClass('snackbar-faq');
    //   setTimeout(() => {
    //     dispatch(setActivePanel('main-second'))
    //   }, 400)
    // }
  }
  useEffect(() => {
    if (groupLink == null) {
      setLinkText('Перейти в сообщество')
    }
    else {
      setLinkText('Перейти в сообщество автора');
    }
  }, [])
    return (
      <div onClick={onClickOverlay} className={overlayClass}>
        <div className='snackbar-faq__content'>
          {/* <a href="https://vk.com/tsunamipicnic" target='_blank' className='snackbar-faq__content-link'></a> */}
          <div className='snackbar-faq__info'>
            <img className='snackbar-faq__info-arrow' src="assets/images/overlay-arrow.svg" alt="" />
            <p className='snackbar-faq__info-title'>
              Голос учтен!
            </p>
            <p className='snackbar-faq__info-subtitle'>
              Итоги подведем в&nbsp;конце дня и&nbsp;объявим 
              в&nbsp;нашем сообществе <a href='https://vk.com/igoradrive' target='_blank' className='snackbar-faq__info-subtitle-link'>ВКонтакте</a>
            </p>
          </div>
          <a href='https://vk.com/igoradrive' target='_blank' className='snackbar-faq__info-link'>
            Перейти в сообщество
          </a>
        </div>
      </div>
    );
}


export default Snackbar;