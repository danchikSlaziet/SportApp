import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNavbar, setActivePanel, setCheques, setGameDays, setHeals, setPrizes, setTasks, setTickets, setUserAvatar, setUserName, setUserNumber } from '../../store/mainReducer';
import bridge from '@vkontakte/vk-bridge';
import Snackbar from '../Snackbar';
import ServerConnect from '../../service';
import { isIOS, isDesktop } from 'react-device-detect';
import Coin from '../Coin';
import catEnd from '../../../public/assets/images/static/main-cat-end.png';
import cat from '../../../public/assets/images/static/main-cat.png';


const Main = ({overlayClass, setOverlayClass, firstInteraction, setFirstInteraction, setIsPlaying, startPlay, updatedDays}) => {
  const dispatch = useDispatch();
  const referal = useSelector((state) => state.main.referal);
  const tgID = useSelector((state) => state.main.tgID);
  const healsCount = useSelector((state) => state.main.heals);
  const ticketsCount = useSelector((state) => state.main.tickets.length);
  const gameDays = useSelector((state) => state.main.gameDays);
  const [progressWidth, setProgressWidth] = useState('0%');
  const [endPage, setEndPage] = useState('main__end-page');
  const [catHeadClass, setCatHeadClass] = useState('cat__head-block');
  const [catBodyClass, setCatBodyClass] = useState('cat-img cat-img_body')
  const [classPage, setClassPage] = useState('main');
  const [penPopup, setPenPopup] = useState('pen-popup');
  const [penRejectPopup, setPenRejectPopup] = useState('pen-popup');
  const [penSuccessPopup, setPenSuccessPopup] = useState('pen-popup');
  const [penWaitPopup, setPenWaitPopup] = useState('pen-popup');
  const [ticketPopup, setTicketPopup] = useState('ticket-popup');
  const [pawPopup, setPawPopup] = useState('paw-popup')
  const [coinClass, setCoinClass] = useState('days__cat');
  const [pawPage, setPawPage] = useState('paw-page')
  const [coins, setCoins] = useState([]);
  const [count, setCount] = useState(0);
  const [pawsDecrease, setPawsDecrease] = useState('paw-page__paw-img');
  const [pawsButton, setPawsButton] = useState('paw-page__open-btn paw-page__open-btn_disable');
  const [pawPageSecondTicket, setPawPageSecondTicket] = useState("paw-page__second_ticket");
  const [pawPageSecondPromo, setPawPageSecondPromo] = useState("paw-page__second_promo");
  const [topPopup, setTopPopup] = useState('main__top-popup');
  const [endClicking, setEndClicking] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(null);
  const [days, setDays] = useState(updatedDays);
  const [gameDayID, setGameDayID] = useState(0);
  const [pawsInfo, setPawsInfo] = useState({});
  const [pawsPromo, setPawsPromo] = useState(false);
  const [ticketText, setTicketText] = useState('');

  let currentSwiperIndex;
  const swiperRef = useRef(null);
  useEffect(() => {
    // console.log(gameDays);
    const pseudo = [
      {
          "id": 1,
          "date": "2024-09-13",
          "clicks": 0,
          "done": true,
          "closed_by_heal": true,
          "reward_obtained": true
      },
      {
          "id": 2,
          "date": "2024-09-14",
          "clicks": 0,
          "done": false,
          "closed_by_heal": false,
          "reward_obtained": false
      },
      {
          "id": 3,
          "date": "2024-09-15",
          "clicks": 0,
          "done": false,
          "closed_by_heal": false,
          "reward_obtained": false
      },
      {
          "id": 4,
          "date": "2024-09-16",
          "clicks": 0,
          "done": false,
          "closed_by_heal": false,
          "reward_obtained": false
      },
      {
          "id": 5,
          "date": "2024-09-17",
          "clicks": 15,
          "done": false,
          "closed_by_heal": false,
          "reward_obtained": false
      },
      {
          "id": 6,
          "date": "2024-09-18",
          "clicks": 0,
          "done": false,
          "closed_by_heal": false,
          "reward_obtained": false
      },
      {
          "id": 7,
          "date": "2024-09-19",
          "clicks": 0,
          "done": false,
          "closed_by_heal": false,
          "reward_obtained": false
      }
  ]
    const copyOfGameDays = [...gameDays];
    // const copyOfGameDays = [...pseudo];
    const sortedData = copyOfGameDays.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Определяем текущую дату по Москве
    const currentDateObj = new Date();
    const currentDateOptions = { timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit', day: '2-digit' };
    const currentDateStr = currentDateObj.toLocaleString('ru-RU', currentDateOptions).replace(/\./g, '-');
    const dateArray = currentDateStr.split('-');
    const formattedCurrentDateStr = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;

    // console.log(formattedCurrentDateStr);

    // Находим индекс объекта, подходящего под текущую дату по Москве
    const currentIndex = sortedData.findIndex(obj => obj.date === formattedCurrentDateStr);

    // Создаем новый массив, состоящий из элементов, начиная с начала и заканчивая текущим днем
    const updatedDays = sortedData.slice(0, currentIndex + 1);
    // console.log(`currentDay: ${updatedDays[updatedDays.length - 1]}`);
    // setCount(updatedDays[updatedDays.length - 1].clicks);
    // setProgressWidth(`${count/250 * 100}%`)
    currentSwiperIndex = currentIndex;
    if (updatedDays[updatedDays.length - 1].done) {
      setEndClicking(true);
      setEndPage('main__end-page main__end-page_active');
    }
    setDays(updatedDays);

  }, [gameDays])

  useEffect(() => {
    ServerConnect.getUser('/users/', referal)
      .then((data) => {
        const copyOfGameDays = [...data.gameDays];
        // const copyOfGameDays = [...pseudo];
        const sortedData = copyOfGameDays.sort((a, b) => new Date(a.date) - new Date(b.date));
        // Определяем текущую дату по Москве
        const currentDateObj = new Date();
        const currentDateOptions = { timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit', day: '2-digit' };
        const currentDateStr = currentDateObj.toLocaleString('ru-RU', currentDateOptions).replace(/\./g, '-');
        const dateArray = currentDateStr.split('-');
        const formattedCurrentDateStr = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    
        // console.log(formattedCurrentDateStr);
    
        // Находим индекс объекта, подходящего под текущую дату по Москве
        const currentIndex = sortedData.findIndex(obj => obj.date === formattedCurrentDateStr);
    
        // Создаем новый массив, состоящий из элементов, начиная с начала и заканчивая текущим днем
        const updatedDays = sortedData.slice(0, currentIndex + 1);
        // console.log(data);
        setCount(updatedDays[updatedDays.length - 1].clicks);
        setProgressWidth(`${updatedDays[updatedDays.length - 1].clicks/250 * 100}%`)
      })
      .catch((err) => {});
      setTimeout(() => {
        if (swiperRef.current) {
          // Выбираем второй слайд как активный
          swiperRef.current.swiper.slideTo(currentSwiperIndex);
        }
      }, 500)
      return () => {
        // ServerConnect.postClick('/click/', `tg_id=${tgID}`, {
        //   'clicks': count
        // })
        //   .then((data) => {
        //     // dispatch(setGameDays(data.gameDays));
        //   })
        //   .catch((err) => {});
      }
  }, [])

  function copyHandler(code) {
    setTopPopup('main__top-popup main__top-popup_active');
    navigator.clipboard.writeText(code)
     .then(() => {
     })
     .catch(err => {
     });
    setTimeout(() => {
      setTopPopup('main__top-popup');
    }, 2500)
  }
  function vibro() {
    if (isIOS) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
    else {
      if ("vibrate" in navigator) {
        // Вибрируем устройство в течение 1000 миллисекунд (1 секунда)
        navigator.vibrate(10);
      } else {
        // Ваш браузер не поддерживает API вибрации
        // console.log("Ваш браузер не поддерживает API вибрации.");
      }
    }
  }
  function closeTicketPopup() {
    setTicketPopup("ticket-popup");
  }
  function closePenPopup() {
    setPenPopup('pen-popup');
  }
  function closePenRejectPopup() {
    setPenRejectPopup('pen-popup');
  }
  function closePenSuccessPopup() {
    ServerConnect.postHeal('/use_heal/', `tg_id=${tgID}`, {
      'gameDay_id': gameDayID,
    })
      .then((data) => {
        setPenSuccessPopup('pen-popup');
        // console.log(data);
        dispatch(setHeals(data.heals));
        dispatch(setGameDays(data.gameDays));
      })
      .catch((err) => {});
  }
  function closePenWaitPopup() {
    setPenWaitPopup('pen-popup');
  }
  function penHandler() {
    setPenPopup('pen-popup pen-popup_active');
  }
  function ticketHandler() {
    setTicketPopup('ticket-popup ticket-popup_active');
  }
  
  function startClick(event) {
    // if (!firstInteraction) {
    //   setTimeout(() => {
    //     startPlay();
    //     setIsPlaying(true);
    //   }, 100)
    // }
    setFirstInteraction(true);
    vibro();
    if(count < 249) {
      setCatHeadClass('cat__head-block cat__head-block_animate');
      setCatBodyClass('cat-img cat-img_body cat-img_body_active')
      const currentTime = Date.now();
      setLastClickTime(currentTime);
      setProgressWidth(`${count/250 * 100}%`)
      setCount((prevCount) => prevCount + 1);
      setCoinClass('days__cat days__cat_active');
      // Получаем координаты клика
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;

      // Создаем анимированную монету и добавляем в состояние
      let newCoins = [...coins];
      if (newCoins.length >= 30) {
        newCoins = [];
      }
      newCoins.push({ x, y });
      setCoins(newCoins);
    }
    else {
      setCount(250);
      ServerConnect.postClick('/click/', `tg_id=${tgID}`, {
        'clicks': 250
      })
        .then((data) => {
          dispatch(setGameDays(data.gameDays));
          setEndClicking(true);
          setEndPage('main__end-page main__end-page_active');
        })
        .catch((err) => {});
    }
  }
  function startPCClick(event) {
    if (isDesktop) {
      // if (!firstInteraction) {
      //   setTimeout(() => {
      //     startPlay()
      //     setIsPlaying(true);
      //   }, 100)
      // }
      setFirstInteraction(true);
      vibro();
      // console.log('pc click')
      if(count < 249) {
        setCatHeadClass('cat__head-block cat__head-block_animate');
        setCatBodyClass('cat-img cat-img_body cat-img_body_active')
        const currentTime = Date.now();
        setLastClickTime(currentTime);
        setProgressWidth(`${count/250 * 100}%`)
        setCount(prevState => prevState + 1);
        setCoinClass('days__cat days__cat_active');
        // Получаем координаты клика
        const x = event.clientX;
        const y = event.clientY;
  
        // Создаем анимированную монету и добавляем в состояние
        let newCoins = [...coins];
        if (newCoins.length >= 30) {
          newCoins = [];
        }
        newCoins.push({ x, y });
        setCoins(newCoins);
      }
      else {
        setCount(250);
        ServerConnect.postClick('/click/', `tg_id=${tgID}`, {
          'clicks': 250
        })
          .then((data) => {
            dispatch(setGameDays(data.gameDays));
            setEndClicking(true);
            setEndPage('main__end-page main__end-page_active');
          })
          .catch((err) => {});
      }
    }
  }
  function endClick() {
    setCoinClass('days__cat');
    setCatHeadClass('cat__head-block');
    setCatBodyClass('cat-img cat-img_body')
  }

  useEffect(() => {
    setClassPage('main main_active');
    dispatch(setActiveNavbar(true));
    ServerConnect.getUser('/users/', referal)
      .then((data) => {
        // console.log(data);
        dispatch(setGameDays(data.gameDays));
      })
      .catch((err) => {});
  }, []);
  
  const lastExecutionTimeRef = useRef(null);
  const requestIdRef = useRef(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    const executeCallback = () => {
      // console.log('post clicks');
      // console.log(count);
      if (count < 249) {
        ServerConnect.postClick('/click/', `tg_id=${tgID}`, {
          'clicks': count
        })
          .then((data) => {
            // dispatch(setGameDays(data.gameDays));
          })
          .catch((err) => {});
      }
      lastExecutionTimeRef.current = performance.now();
      requestIdRef.current = requestAnimationFrame(checkAndExecute);
    };

    const checkAndExecute = () => {
      if (
        lastExecutionTimeRef.current === null ||
        performance.now() - lastExecutionTimeRef.current >= 20000
      ) {
        if (didMountRef.current) {
          executeCallback();
        } else {
          didMountRef.current = true;
        }
      } else {
        requestIdRef.current = requestAnimationFrame(checkAndExecute);
      }
    };

    requestIdRef.current = requestAnimationFrame(checkAndExecute);

    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [count]);

  // const firstCountRef = useRef(0);
  // useEffect(() => {
  //   let timeoutId = null;
  //   console.log(`мгн разница: ${count - firstCountRef.current}`)
  //   if (Date.now() - lastClickTime >= 1000 && lastClickTime != null) {
  //     console.log(`Разница: ${count - firstCountRef.current}`);
      // ServerConnect.postClick('/click/', `tg_id=${tgID}`, {
      //   'clicks': count - firstCountRef.current
      // })
      //   .then((data) => {
      //     dispatch(setGameDays(data.gameDays));
      //   })
      //   .catch(err => console.log(err));
    // }
  //   if (lastClickTime !== 0 && lastClickTime != null) {
  //     timeoutId = setTimeout(() => {
  //       setLastClickTime(0);
  //     }, 1000);
  //   }
  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //     else {
  //       firstCountRef.current = count;
  //     }
  //   };
  // }, [lastClickTime]);
    return (
        <>
          <div className={`container ${classPage}`}>
            <div className={pawPopup}>
              <div className='paw-popup__content'>
                <img className='paw-popup__img' src="assets/images/paw-popup-bg.png" alt="" />
                <img className='paw-popup__paw' src="assets/images/paw-popup-paw.png" alt="" />
                <p className='paw-popup__title'>
                  Лапка получена
                </p>
                <p className='paw-popup__subtitle'>
                  Вы&nbsp;получили свою ежедневную Лапку &mdash; можете забрать приз 
                </p>
                <button onClick={() => {
                    setPawPopup('paw-popup');
                    ServerConnect.postFinish('/finish_day/', `tg_id=${tgID}`, {
                      "gameDay_id": gameDayID
                    })
                      .then((data) => {
                        // console.log(data);
                        setPawsInfo(data)
                        if (data.description) {
                          setPawsPromo(true)
                        }
                        else {
                          setPawsPromo(false);
                          if (data.length == 1) {
                            setTicketText('+ 1 Билетик')
                          }
                          if (data.length == 2) {
                            setTicketText('+ 2 Билетика')
                          }
                          if (data.length == 3) {
                            setTicketText('+ 3 Билетика')
                          }
                          if (data.length == 4) {
                            setTicketText('+ 4 Билетика')
                          }
                          if (data.length == 5) {
                            setTicketText('+ 5 Билетиков')
                          }
                        }
                        ServerConnect.getUser('/users/', referal)
                          .then((data) => {
                            // console.log(data);
                            
                            dispatch(setTickets(data.tickets));
                            dispatch(setHeals(data.heals));
                            dispatch(setTasks(data.quests));
                            dispatch(setPrizes(data.prizes));
                            dispatch(setGameDays(data.gameDays));
                          })
                          .catch((err) => {});
                        setPawPage('paw-page paw-page_active');
                        setPawsButton('paw-page__open-btn');
                      })
                      .catch((err) => {});
                  }} className='paw-popup__button' type='button'>
                  ЗАБРАТЬ
                </button>
              </div>
            </div>
            <div className={pawPage}>
              <div className='main__bg'></div>
              <div className='paw-page__first'>
                <img className={`${pawsDecrease} paw-page__paw-img_top-left`} src="assets/images/paw-page-top-left.png" alt="" />
                <img className={`${pawsDecrease} paw-page__paw-img_top-right`} src="assets/images/paw-page-top-right.png" alt="" />
                <img className={`${pawsDecrease} paw-page__paw-img_bottom-left`} src="assets/images/paw-page-bottom-left.png" alt="" />
                <img className={`${pawsDecrease} paw-page__paw-img_bottom-right`} src="assets/images/paw-page-bottom-right.png" alt="" />
                <button onClick={() => {
                  setPawsDecrease('paw-page__paw-img paw-page__paw-img_active');
                  setPawsButton('paw-page__open-btn paw-page__open-btn_disable');
                  setTimeout(() => {
                    if (pawsPromo) {
                      setPawPageSecondPromo('paw-page__second_promo paw-page__second_promo_active')
                    }
                    else {
                      setPawPageSecondTicket('paw-page__second_ticket paw-page__second_ticket_active');
                    }
                  }, 400)
                }} className={pawsButton} type='button'>
                  Раскрыть лапки
                </button>
              </div>
              <div className={`paw-page__second ${pawPageSecondTicket}`}>
                <img className='paw-page__blur-paw paw-page__blur-paw_top-left' src="assets/images/paw-top-left-blur.png" alt="" />
                <img className='paw-page__blur-paw paw-page__blur-paw_top-right' src="assets/images/paw-top-right-blur.png" alt="" />
                <img className='paw-page__blur-paw paw-page__blur-paw_bottom-left' src="assets/images/paw-bottom-left-blur.png" alt="" />
                <img className='paw-page__blur-paw paw-page__blur-paw_bottom-right' src="assets/images/paw-bottom-right-blur.png" alt="" />
                <div className='paw-page__second-info'>
                  <img className='paw-page__second-img' src="assets/images/paw-page-ticket.svg" alt="" />
                  <p className='paw-page__second-title'>
                    {ticketText}
                  </p>
                  <p className='paw-page__second-subtitle'>
                    Теперь ваш шанс победы 
                    в&nbsp;Розыгрыше выше
                  </p>
                </div>
                <button onClick={() => {
                  dispatch(setActivePanel('prize'));
                }} className='paw-page__second-button' type='button'>
                  Мои призы
                </button>
              </div>
              <div className={`paw-page__second ${pawPageSecondPromo}`}>
                <img className='paw-page__blur-paw paw-page__blur-paw_top-left' src="assets/images/paw-top-left-blur.png" alt="" />
                <img className='paw-page__blur-paw paw-page__blur-paw_top-right' src="assets/images/paw-top-right-blur.png" alt="" />
                <img className='paw-page__blur-paw paw-page__blur-paw_bottom-left' src="assets/images/paw-bottom-left-blur.png" alt="" />
                <img className='paw-page__blur-paw paw-page__blur-paw_bottom-right' src="assets/images/paw-bottom-right-blur.png" alt="" />
                <div className={topPopup}>
                  Промокод скопирован
                </div>
                <div className='paw-page__promo-info'>
                  <img className='paw-page__promo-img' src="assets/images/paw-page-promo.svg" alt="" />
                  <p className='paw-page__promo-title'>
                    {pawsInfo.type}
                  </p>
                  <p className='paw-page__promo-subtitle'>
                    {pawsInfo.description}
                  </p>
                  <div className='paw-page__promo-block'>
                    <div className='paw-page__promo-top-info'>
                      <p className='paw-page__promo-top-text'>
                        Промокод:
                      </p>
                      <p className='paw-page__promo-bottom-text'>
                        {pawsInfo.data}
                      </p>
                    </div>
                    <img onClick={() => {copyHandler(pawsInfo.data)}} className='paw-page__promo-copy' src="assets/images/promo-copy.svg" alt="" />
                  </div>
                </div>
                <button onClick={() => {
                  dispatch(setActivePanel('prize'))
                }} className='paw-page__promo-button' type='button'>
                  Мои призы
                </button>
              </div>
            </div>
            <div onClick={(evt) => {
              if (evt.target.className === "ticket-popup ticket-popup_active") {
                setTicketPopup('ticket-popup');
              }
            }} className={ticketPopup}>
              <div className='ticket-popup__content'>
                <img onClick={closeTicketPopup} className='ticket-popup__close' src="assets/images/friend-popup-close.svg" alt="" />
                <p className='ticket-popup__title'>
                  Что такое Билетики?
                </p>
                <p className='ticket-popup__subtitle'>
                  В&nbsp;конце дня вас ждут Билетики! 
                  Их&nbsp;количество зависит от&nbsp;удачи. 
                  Больше Билетиков&nbsp;&mdash; больше шансов 
                  на&nbsp;победу в&nbsp;Розыгрыше!
                </p>
                <button onClick={closeTicketPopup} className='ticket-popup__button' type='button'>
                  Вернуться к котику
                </button>
              </div>
            </div>
            <div onClick={(evt) => {
              if (evt.target.className === "pen-popup pen-popup_active") {
                setPenRejectPopup('pen-popup');
              }
            }} className={penRejectPopup}>
              <div className='pen-popup__content'>
                <img onClick={closePenRejectPopup} className='pen-popup__close' src="assets/images/friend-popup-close.svg" alt="" />
                <img className='pen-popup__pen-img' src="assets/images/main-popup-pen.png" alt="" />
                <div className='pen-popup__pen-help'></div>
                <p className='pen-popup__title'>
                  Пушинок не хватает!
                </p>
                <p className='pen-popup__subtitle'>
                  Не&nbsp;хватает Пушинок для восстановления дня. Пригласите друзей в&nbsp;игру, чтобы получить нужное количество 
                  и&nbsp;продолжить игру с&nbsp;котиком!
                </p>
                <button onClick={() => {
                  dispatch(setActivePanel('task'));
                }} className='pen-popup__button' type='button'>
                  Заработать Пушинки
                </button>
              </div>
            </div>
            <div onClick={(evt) => {
              if (evt.target.className === "pen-popup pen-popup_active") {
                setPenSuccessPopup('pen-popup');
              }
            }} className={penSuccessPopup}>
              <div className='pen-popup__content'>
                <img onClick={closePenSuccessPopup} className='pen-popup__close' src="assets/images/friend-popup-close.svg" alt="" />
                <img style={{top: '-90px'}} className='pen-popup__pen-img' src="assets/images/pen-success-popup.png" alt="" />
                <div className='pen-popup__pen-help'></div>
                <p className='pen-popup__title'>
                  Пропущенный день?<br />
                  Не проблема! 
                </p>
                <p className='pen-popup__subtitle'>
                  С&nbsp;помощью Пушинки вы&nbsp;можете восстановить пропущенный день 
                  и&nbsp;продолжить играть с&nbsp;котиком
                </p>
                <button style={{display: "flex", alignItems: "center", justifyContent: "space-between"}} onClick={() => {
                  closePenSuccessPopup();
                }} className='pen-popup__button' type='button'>
                  <p style={{width: '100%', textAlign: 'center'}} className='pen-popup__button-text'>
                    Использовать Пушинку
                  </p>
                  <img className='pen-popup__button-img' src="assets/images/penpopup-succes-btn.svg" alt="" />
                </button>
              </div>
            </div>
            <div onClick={(evt) => {
              if (evt.target.className === "pen-popup pen-popup_active") {
                setPenPopup('pen-popup');
              }
            }} className={penPopup}>
              <div className='pen-popup__content'>
                <img onClick={closePenPopup} className='pen-popup__close' src="assets/images/friend-popup-close.svg" alt="" />
                <img className='pen-popup__pen-img' src="assets/images/main-popup-pen.png" alt="" />
                <div className='pen-popup__pen-help'></div>
                <p className='pen-popup__title'>
                  Получите больше<br />
                  Пушинок
                </p>
                <p className='pen-popup__subtitle'>
                  Чтобы восстанавливать пропущенные дни, вам потребуются Пушинки, заработайте их&nbsp;за&nbsp;выполнение заданий
                </p>
                <button onClick={() => {
                  dispatch(setActivePanel('task'));
                }} className='pen-popup__button' type='button'>
                  Перейти к заданиями
                </button>
              </div>
            </div>
            <div onClick={(evt) => {
              if (evt.target.className === "pen-popup pen-popup_active") {
                setPenWaitPopup('pen-popup');
              }
            }} className={penWaitPopup}>
              <div style={{paddingTop: '44px'}} className='pen-popup__content'>
                <img onClick={closePenWaitPopup} className='pen-popup__close' src="assets/images/friend-popup-close.svg" alt="" />
                <p className='pen-popup__title'>
                  Немного подождите!
                </p>
                <p style={{marginBottom: '51px'}} className='pen-popup__subtitle'>
                  Этот день ещё закрыт. Возвращайтесь позже, чтобы поиграть с&nbsp;котиком!
                </p>
                <button onClick={() => {
                  setPenWaitPopup("pen-popup");
                }} className='pen-popup__button' type='button'>
                  Окей, подожду
                </button>
              </div>
            </div>
            <div className='main__bg'></div>
            <div className='main__content'>
              <div className={endPage}>
                Сегодня мурлыка отдыхает.<br />
                Завтра он&nbsp;снова будет рад вашим ласкам!
              </div>
              {coins.map((coin, index) => (
                <Coin key={index} x={coin.x} y={coin.y} />
              ))}
              <div className='main__days days'>
                <div className='days__black'></div>
                <div className='days__white'>
                  <img className='days__stand' src="assets/images/main-stand.svg" alt="" />
                  <div style={{pointerEvents: endClicking ? 'none' : 'all'}} onMouseDown={(event) => startPCClick(event)} onMouseUp={endClick} onTouchStart={(event) => startClick(event)} onTouchEnd={endClick} className={'days__cat'}>
                    <img style={{display: endClicking ? 'block' : 'none'}} className='cat-end' src="assets/images/main-cat-end.png" alt="" />
                    <img style={{display: endClicking ? 'none' : 'block'}} className={catBodyClass} src="assets/images/cat-body.png" alt="" />
                    <div style={{display: endClicking ? 'none' : 'block'}} className={catHeadClass}>
                      <img className='cat-img cat-img_head' src="assets/images/cat-had.png" alt="" />
                      <img className='cat-img cat-img_mouth_animate cat-img_mouth' src="assets/images/cat-mouth.png" alt="" />
                    </div>
                    <img style={{display: endClicking ? 'none' : 'block'}} className='cat-img cat-img_tail' src="assets/images/cat-tail.png" alt="" />
                  </div>
                  {/* <img style={styleCat} onMouseDown={(event) => startPCClick(event)} onMouseUp={endClick} onTouchStart={(event) => startClick(event)} onTouchEnd={endClick} className={coinClass} src={catState} alt="" /> */}
                  <Swiper ref={swiperRef}
                          spaceBetween={9}
                          slidesPerView={'auto'}
                          >
                    {[...days].map((day, index) => {
                      if ((index + 1) < days.length && day.done && !day.reward_obtained) {
                        return (
                          <SwiperSlide >
                            <div onClick={() => {
                              setPawPopup('paw-popup paw-popup_active');
                              setGameDayID(day.id);
                              }} className='days__item day'>
                              <p className='day__title'>
                                {index + 1} день
                              </p>
                              <img className='day__lapa' src="assets/images/main-days-lapa.png" alt="" />
                              <button className='day__button' type='button'>
                                Открыть
                              </button>
                            </div>
                          </SwiperSlide>
                        )
                      }
                      if ((index + 1) < days.length && !day.done && !day.reward_obtained) {
                        return (
                          <SwiperSlide >
                            <div onClick={() => {
                                setGameDayID(day.id);
                                if (healsCount > 0) {
                                  setPenSuccessPopup('pen-popup pen-popup_active');
                                }
                                else {
                                  setPenRejectPopup('pen-popup pen-popup_active')
                                }
                              }} className='days__item day-pass'>
                              <p className='day-pass__title'>
                                {index + 1} день
                              </p>
                              <img className='day-pass__img' src="assets/images/day-pass.png" alt="" />
                              <button className='day-pass__button' type='button'>
                                <p className='day-pass__button-text'>
                                  Получить
                                </p>
                                <img className='day-pass__button-img' src="assets/images/day-pass-pen.svg" alt="" />
                                <p className='day-pass__button-count'>-1</p>
                              </button>
                            </div>
                          </SwiperSlide>
                        )
                      }
                      if (index + 1 == days.length && !day.done && !day.reward_obtained) {
                        return (
                          <SwiperSlide >
                            <div className='days__item day-current'>
                              <p className='day-current__title'>
                              {index + 1}  день
                              </p>
                              <div className='day-current__count'>
                                {count}/250
                              </div>
                              <div className='day-current__bar-wrapper'>
                                <div style={{width: progressWidth}} className='day-current__bar'></div>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      }
                      if (index + 1 == days.length && day.done && !day.reward_obtained) {
                        return(
                          <SwiperSlide >
                            <div onClick={() => {
                              setPawPopup('paw-popup paw-popup_active');
                              setGameDayID(day.id);
                              }} className='days__item day'>
                              <p className='day__title'>
                                {index + 1} день
                              </p>
                              <img className='day__lapa' src="assets/images/main-days-lapa.png" alt="" />
                              <button className='day__button' type='button'>
                                Открыть
                              </button>
                            </div>
                          </SwiperSlide>
                        );
                      }
                      if (day.reward_obtained) {
                        return(
                          <SwiperSlide>
                            <div className='days__item day-success'>
                              <img className='day-success__left' src="assets/images/day-success-left.png" alt="" />
                              <img className='day-success__right' src="assets/images/day-success-right.png" alt="" />
                              <img className='day-success__center' src="assets/images/day-success-center.svg" alt="" />
                              <p className='day-success__text'>
                                День<br />завершен
                              </p>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    })}
                    {
                      gameDays.length === 1 ? 
                        <div style={{display: 'none'}}>
                          
                        </div>
                          :
                      <SwiperSlide >
                        <div onClick={() => {
                            setPenWaitPopup('pen-popup pen-popup_active')
                          }} className='days__item day-block'>
                          <img className='day-block__lapa' src="assets/images/main-days-lapa.png" alt="" />
                          <div className='day-block__lock-wrapper'>
                            <img className='day-block__lock-img' src="assets/images/day-block-lock.svg" alt="" />
                            <p className='day-block__lock-text'>{days.length + 1} день</p>
                          </div>
                        </div>
                      </SwiperSlide> 
                    }
                    <SwiperSlide>
                      <div className='days__item day-plug'>
                        <img className='day-plug__img' src="assets/images/day-plug.svg" alt="" />
                        <p className='day-plug__text'>
                          Дальше<br />
                          больше
                        </p>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className='main__topbar topbar'>
                <div onClick={penHandler} className='topbar__pen-block'>
                  <img className='topbar__pen-img' src="assets/images/info-pen.svg" alt="" />
                  <p className='topbar__pen-count'>{healsCount}</p>
                  <img className='topbar__pen-arrow' src="assets/images/topbar-pen-arrow.png" alt="" />
                </div>
                <img className='topbar__pen-logo' src="assets/images/topbar-logo.svg" alt="" />
                <div onClick={ticketHandler} className='topbar__ticket-block'>
                  <img className='topbar__ticket-img' src="assets/images/info-ticket.svg" alt="" />
                  <p className='topbar__ticket-count'>
                    {ticketsCount}
                  </p>
                  <img className='topbar__ticket-info' src="assets/images/topbar-info-img.svg" alt="" />
                </div>
              </div>
              <div className='main__score'>{count}<span className='main__score_other-color'>/250</span></div>
            </div>
          </div>
        </>
    );
}

export default Main;