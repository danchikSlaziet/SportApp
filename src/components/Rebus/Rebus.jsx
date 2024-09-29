import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNavbar, setActivePanel, setCheques, setHeals, setPrizes, setTasks, setTickets, setUserAvatar, setUserName, setUserNumber } from '../../store/mainReducer';
import { isIOS } from 'react-device-detect';
import ServerConnect from '../../service';

const Rebus = ({overlayClass, setOverlayClass}) => {
  function lockScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }
  function unlockScroll() {
    window.onscroll = null;
  }
  const dispatch = useDispatch();
  const questID = useSelector(state => state.main.questID);
  const questLink = useSelector(state => state.main.questLink);
  const questText = useSelector(state => state.main.questText);
  const tgID = useSelector(state => state.main.tgID);
  const [classPage, setClassPage] = useState('rebus');
  const [rebusBtn, setRebusBtn] = useState('rebus__input-button');
  const [rebusBlock, setRebusBlock] = useState('rebus__input-block');
  const [submitClass, setSubmitClass] = useState('rebus__submit-popup');
  const [rejectClass, setRejectClass] = useState('rebus__reject-popup');
  const [inputValue, setInputValue] = useState('');
  function backHandler() {
    dispatch(setActivePanel("task"));
  }
  function closeSubmit() {
    dispatch(setActivePanel("task"));
  }
  function closeReject() {
    setRejectClass('rebus__reject-popup');
    setTimeout(() => {
      setRebusBlock('rebus__input-block');
    }, 150)
  }
  function checkHandler(value) {
    ServerConnect.postQuestion('/answer_question/', `tg_id=${tgID}`, {
      "quest_id": questID,
      "answer": value,
      })
      .then((data) => {
        if (data == 'Неверный ответ') {
          setRebusBlock('rebus__input-block rebus__input-block_disable');
          setRejectClass('rebus__reject-popup rebus__reject-popup_active');
        }
        else {
          dispatch(setTasks(data.quests));
          dispatch(setHeals(data.heals));
          dispatch(setTickets(data.tickets));
          setRebusBlock('rebus__input-block rebus__input-block_disable');
          setSubmitClass("rebus__submit-popup rebus__submit-popup_active");
        }
        // console.log(data)
      })
      .catch((err) => {});
  }
  useEffect(() => {
    setClassPage('rebus rebus_active');
    lockScroll();
  }, []);
    return (
        <>
          <div className={`container ${classPage}`}>
            <div onClick={(evt) => {
              if (evt.target.className === "rebus__submit-popup rebus__submit-popup_active") {
                setSubmitClass('rebus__submit-popup');
              }
            }} className={submitClass}>
              <div className='rebus__submit-content'>
                <img onClick={closeSubmit} className='rebus__submit-close' src="assets/images/friend-popup-close.svg" alt="" />
                <p className='rebus__submit-title'>
                  Слово принято
                </p>
                <p className='rebus__submit-subtitle'>
                  Вы&nbsp;ввели верное кодовое слово, 
                  и&nbsp;за&nbsp;это вы&nbsp;получаете 1&nbsp;Пушинку
                </p>
                <button onClick={closeSubmit} className='rebus__submit-btn' type='button'>
                  К заданиям
                </button>
              </div>
            </div>
            <div onClick={(evt) => {
              if (evt.target.className === "rebus__reject-popup rebus__reject-popup_active") {
                setRejectClass('rebus__reject-popup');
              }
            }} className={rejectClass}>
              <div className='rebus__submit-content'>
                <img onClick={closeReject} className='rebus__submit-close' src="assets/images/friend-popup-close.svg" alt="" />
                <p className='rebus__submit-title'>
                  Неверное слово
                </p>
                <p className='rebus__submit-subtitle'>
                  Вы&nbsp;не&nbsp;ввели нужного слова, но&nbsp;всегда можно попытаться снова
                </p>
                <button onClick={closeReject} className='rebus__submit-btn' type='button'>
                  Попробовать еще раз
                </button>
              </div>
            </div>
            <div className='rebus__bg'></div>
            <div className='rebus__content'>
              <img onClick={backHandler} className='rebus__back' src="assets/images/rebus-back.png" alt="" />
              <p className='rebus__title'>
                Разгадайте ребус
              </p>
              <p className='rebus__subtitle'>
                {questText}
              </p>
              <div className='rebus__link'>
                <p className='rebus__link-text'>
                  Перейти к ребусу
                </p>
                <a className='rebus__link-href' target='_blank' href={questLink}></a>
                <img className='rebus__link-arrow' src="assets/images/info-faq-arrow.png" alt="" />
              </div>
              <div className={rebusBlock}>
                <p className='rebus__input-title'>Кодовое слово</p>
                <input value={inputValue} onChange={(e) => {
                    setInputValue(e.target.value);
                    if (e.target.value.trim() != '') {
                      setRebusBtn('rebus__input-button rebus__input-button_active')
                    }
                    else {
                      setRebusBtn('rebus__input-button')
                    }
                  }   
                } onFocus={(e) => {
                  if (isIOS) {
                    e.target.closest('.rebus__input-block').style = 'margin-top: 0;'
                  }
                }} onBlur={(e) => {
                  if (isIOS) {
                    e.target.closest('.rebus__input-block').style = 'margin-top: auto;';
                  }
                }} className='rebus__input' type="text"  placeholder='КОДОВОЕ СЛОВО'/>
                <button onClick={() => checkHandler(inputValue)} className={rebusBtn} type='button'>Проверить</button>
              </div>
            </div>
          </div>
        </>
    );
}

export default Rebus;