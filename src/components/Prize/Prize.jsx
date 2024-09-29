import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNavbar, setActivePanel } from '../../store/mainReducer';

const Prize = ({overlayClass, setOverlayClass}) => {
  const dispatch = useDispatch();
  const tgID = useSelector(state => state.main.tgID);
  const prizes = useSelector(state => state.main.prizes);
  const tickets = useSelector(state => state.main.tickets); 
//   const prizes = [
//     {
//         "type": "Скидка 500₽!",
//         "data": "МУРЛЫКЕР",
//         "description": "Скидка 500₽ на первый заказ от 1500₽ из «Пятëрочки»"
//     },
//     {
//         "type": "Скидка 500₽!",
//         "data": "ЛАПКА",
//         "description": "Скидка 500₽ на первый заказ от 1500₽ из «Пятëрочки»"
//     },
//     {
//         "type": "Скидка 25%!",
//         "data": "КОТИК",
//         "description": "Скидка 25% на первый заказ от 1500₽ из «Пятëрочки»"
//     },
//     {
//         "type": "Скидка 500₽!",
//         "data": "ДОСТАВКА",
//         "description": "Скидка 500₽ на первый заказ от 1500₽ из «Пятëрочки»"
//     }
// ]
// const tickets = [
//   {
//       "id": 2,
//       "type": "invite",
//       "done": false,
//       "text": "Пригласить 3 друзей",
//       "friends_amount": 3
//   },
//   {
//       "id": 3,
//       "type": "invite",
//       "done": false,
//       "text": "Пригласить 5 друзей",
//       "friends_amount": 5
//   },
//   {
//       "id": 1,
//       "type": "invite",
//       "done": true,
//       "text": "Пригласить 1 друга",
//       "friends_amount": 1
//   },
//   {
//       "id": 4,
//       "type": "quiz",
//       "done": true,
//       "text": "Решить ребус",
//       "friends_amount": null
//   }
// ]
  const [classPage, setClassPage] = useState('prize');
  const [infoPopup, setInfoPopup] = useState('prize__info-popup');
  const [promoClass, setPromoClass] = useState('prize__nav-item prize__nav-item_active');
  const [ticketClass, setTicketClass] = useState('prize__nav-item');
  const [promosClass, setPromosClass] = useState('promos promos_active');
  const [ticketsClass, setTicketsClass] = useState('tickets');
  const [topPopup, setTopPopup] = useState('prize__top-popup');
  useEffect(() => {
    setClassPage('prize prize_active');
    dispatch(setActiveNavbar(true));
    if (prizes.length == 0) {
      setPromoClass('prize__nav-item');
      setTicketClass('prize__nav-item prize__nav-item_active');
      setPromosClass("promos");
      setTicketsClass('tickets tickets_active')
    }
    if (tickets.length == 0) {
      setPromoClass('prize__nav-item prize__nav-item_active');
      setTicketClass('prize__nav-item');
      setPromosClass("promos promos_active");
      setTicketsClass('tickets')
    }
  }, []);
  function copyHandler(code) {
    setTopPopup('prize__top-popup prize__top-popup_active');
    navigator.clipboard.writeText(code)
     .then(() => {
     })
     .catch(err => {
     });
    setTimeout(() => {
      setTopPopup('prize__top-popup');
    }, 2500)
  }
  function buttonHandler(type) {
    if (type === "Промо") {
      setPromoClass('prize__nav-item prize__nav-item_active');
      setTicketClass("prize__nav-item");
      setPromosClass("promos promos_active");
      setTicketsClass('tickets')
    }
    else {
      setPromoClass('prize__nav-item');
      setTicketClass("prize__nav-item prize__nav-item_active");
      setPromosClass("promos");
      setTicketsClass('tickets tickets_active')
    }
  }
  function closePopup() {
    setInfoPopup("prize__info-popup");
  }
  function mainHandler() {
    dispatch(setActivePanel("main"));
  }
    return (
          <div className={`container ${classPage}`}>
            <div className={topPopup}>
              Промокод скопирован
            </div>
            <div onClick={(evt) => {
              if (evt.target.className === "prize__info-popup prize__info-popup_active") {
                setInfoPopup('prize__info-popup');
              }
            }} className={infoPopup}>
              <div className='prize__info-content'>
                <img onClick={closePopup} className='prize__info-close' src="assets/images/friend-popup-close.svg" alt="" />
                <p className='prize__info-title'>Как получить Лапку?</p>
                <p className='prize__info-subtitle'>
                  Каждый день гладьте своего котика, чтобы он&nbsp;был счастлив. За&nbsp;каждый завершённый день вы&nbsp;получите одну Лапку. Используйте их&nbsp;для получения призов
                </p>
                <button onClick={mainHandler} className='prize__info-button' type='button'>
                  Погладить котика
                </button>
              </div>
            </div>
            <div className='prize__bg'></div>
            <div className='prize__content'>
              <div style={{display: prizes.length === 0 && tickets.length === 0 ? 'none' : 'block'}} className='prize__exist-prizes'>
                <p className='prize__title'>
                  Призы
                </p>
                <div className='prize__nav-block'>
                  <div onClick={() => buttonHandler('Промо')} className={promoClass}>
                    Промокоды
                  </div>
                  <div onClick={buttonHandler} className={ticketClass}>
                    Билетики
                  </div>
                </div>
                <div className={promosClass}>
                  <div style={{display: prizes.length === 0 ? 'block': 'none'}} className='prize__not-prizes-info prize__not-prizes-info-other'>
                    <img className='prize__not-prizes-img' src="assets/images/no-prizes.svg" alt="" />
                    <p className='prize__not-prizes-title'>
                      У вас нет призов
                    </p>
                    <p className='prize__not-prizes-subtitle'>
                      Вы&nbsp;еще не&nbsp;получили Лапку, чтобы забрать ваш первый приз
                    </p>
                    <button onClick={() => {setInfoPopup('prize__info-popup prize__info-popup_active')}} className='prize__not-prizes-button prize__not-prizes-button-other' type='button'>
                      Как получить Лапку
                    </button>
                  </div>
                  {prizes.map((promo, index) => (
                    <div key={index} className='promo'>
                      <div className='promo__top-info'>
                        <img className='promo__top-img' src="assets/images/promo-prize-img.svg" alt="" />
                        <p className='promo__top-text'>
                          {promo.description}
                        </p>
                      </div>
                      <div className='promo__block'>
                        <div className='promo__block-left'>
                          <p className='promo__block-title'>Промокод:</p>
                          <p className='promo__block-subtitle'>
                            {promo.data}
                          </p>
                        </div>
                        <img onClick={() => copyHandler(promo.data)} className='promo__block-img' src="assets/images/promo-copy.svg" alt="" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className={ticketsClass}>
                  <div style={{display: tickets.length === 0 ? 'block': 'none'}} className='prize__not-prizes-info prize__not-prizes-info-other'>
                    <img className='prize__not-prizes-img' src="assets/images/no-prizes-ticket.svg" alt="" />
                    <p className='prize__not-prizes-title'>
                      У вас нет Билетиков
                    </p>
                    <p className='prize__not-prizes-subtitle'>
                      Вы&nbsp;еще не&nbsp;получили Билетики, продолжайте гладить Мурлыку
                    </p>
                    <button onClick={() => {setInfoPopup('prize__info-popup prize__info-popup_active')}} className='prize__not-prizes-button prize__not-prizes-button-other' type='button'>
                      Как получить Лапку
                    </button>
                  </div>
                  {tickets.map((ticket, index) => (
                    <div key={index} className='ticket'>
                      <img className='ticket__img' src="assets/images/prizes-ticket-img.svg" alt="" />
                      <p className='ticket__text'>
                        Ваш Билетик
                      </p>
                      <p className='ticket__number'>
                        {ticket.id}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display: prizes.length === 0 && tickets.length === 0 ? 'block' : 'none'}} className='prize__not-prizes'>
                <p className='prize__not-prizes-main-title'>
                  Призы
                </p>
                <div className='prize__not-prizes-info'>
                  <img className='prize__not-prizes-img' src="assets/images/no-prizes.svg" alt="" />
                  <p className='prize__not-prizes-title'>
                    У вас нет призов
                  </p>
                  <p className='prize__not-prizes-subtitle'>
                    Вы&nbsp;еще не&nbsp;получили Лапку, чтобы забрать ваш первый приз
                  </p>
                </div>
                <button onClick={() => {setInfoPopup('prize__info-popup prize__info-popup_active')}} className='prize__not-prizes-button' type='button'>
                  Как получить Лапку
                </button>
              </div>
            </div>
          </div>
    );
}

export default Prize;