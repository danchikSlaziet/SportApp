import React, { useEffect, useState } from 'react';
import './style.css';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePanel } from '../../store/mainReducer';

const OnBoardingSecond = ({}) => {
  const dispatch = useDispatch();
  const [classPage, setClassPage] = useState('onboarding2');
  function buttonHandler() {
    setClassPage("onboarding2");
    setTimeout(() => {
      dispatch(setActivePanel('main'));
      localStorage.setItem("onboarding", "true");
    }, 500)
  }
  useEffect(() => {
    setClassPage('onboarding2 onboarding2_active');
  }, []);
    return (
        <>
          <div className={`container ${classPage}`}>
            <img className='onboarding2__topBG' src="assets/images/loading-page-topBG.svg" alt="" />
            <img className='onboarding2__main-img' src="assets/images/onboarding2-main-img.png" alt="" />
            <div className='onboarding2__bottomBG'></div>
            <img className='onboarding2__paws' src="assets/images/onboarding1-paws.svg" alt="" />
            <div className='onboarding2__info-wrapper'>
              <p className='onboarding2__title'>
              Заходите каждый день 
              <br /> и получайте призы!
              </p>
              <p className='onboarding2__subtitle'>
                Каждый день&nbsp;&mdash; новые подарки 
                для вашего любимца. Не&nbsp;забывайте заходить, чтобы ваш котик был всегда доволен!
              </p>
              <button onClick={buttonHandler} className='onboarding2__button' type='button'>Начать</button>
            </div>
          </div>
        </>
    );
}

export default OnBoardingSecond;