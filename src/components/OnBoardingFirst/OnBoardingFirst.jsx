import React, { useEffect, useState } from 'react';
import './style.css';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePanel } from '../../store/mainReducer';

const OnBoardingFirst = ({}) => {
  const dispatch = useDispatch();
  const [classPage, setClassPage] = useState('onboarding1');
  useEffect(() => {
    setClassPage('onboarding1 onboarding1_active');
  }, []);
  function buttonHandler() {
    setClassPage('onboarding1');
    setTimeout(() => {     
      dispatch(setActivePanel("onboarding-second"));
    }, 500)
  }
    return (
        <>
          <div className={`container ${classPage}`}>
            <img className='onboarding1__topBG' src="assets/images/loading-page-topBG.svg" alt="" />
            <img className='onboarding1__main-img' src="assets/images/onboarding1__main-img.png" alt="" />
            <div className='onboarding1__bottomBG'></div>
            <img className='onboarding1__paws' src="assets/images/onboarding1-paws.svg" alt="" />
            <div className='onboarding1__info-wrapper'>
              <p className='onboarding1__title'>
              Самый замурчательный <br /> кликер от «Пятëрочки»
              </p>
              <p className='onboarding1__subtitle'>
                Ваш пушистый друг уже ждёт вас! В&nbsp;&laquo;Мурлыкере&raquo; каждый тап&nbsp;&mdash; это подарок любви и&nbsp;заботы 
                вашему котику.
              </p>
              <button onClick={buttonHandler} className='onboarding1__button' type='button'>Продолжить</button>
            </div>
          </div>
        </>
    );
}

export default OnBoardingFirst;