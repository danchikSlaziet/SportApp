import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setActivePanel } from "../../store/mainReducer";
import bridge from '@vkontakte/vk-bridge';
import './style.css'
import ServerConnect from '../../service';

const Loading = ({requestPending}) => {
    const dispatch = useDispatch();
    const [classPage, setClassPage] = useState("loading-page")
    useEffect(() => {
      if (requestPending) {
        setTimeout(() => {
          // dispatch(setActivePanel("info"));
          if (localStorage.getItem('onboarding') === 'true') {
            setClassPage('loading-page loading-page_disable')
            setTimeout(() => {
              dispatch(setActivePanel("main"));
            }, 500)
          }
          else {
            setClassPage('loading-page loading-page_disable')
            setTimeout(() => {
              dispatch(setActivePanel("onboarding-first"));
            }, 500)
          }
        }, 2500);
      }
    }, [requestPending]);

    return (
        <div className={`container ${classPage}`}>
            <img className='loading-page__topBG' src="assets/images/loading-page-topBG.svg" alt="" />
            <img className='loading-page__top-left-logo' src="assets/images/loading-page-bg.svg" alt="" />
            <img className='loading-page__center-logo' src="assets/images/loading-page-logo.png" alt="" />
            <img className='loading-page__main-img' src="assets/images/loading-page-main-img.png" alt="" />
            <img className='loading-page__paws' src="assets/images/loading-page-paws.svg" alt="" />
            <div className='loading-page__bottomBG'></div>
            <div className="loading-wrapper">
                <div className="loading-block loading-page__loading-block">
                    <div className="loading-block__bar"></div>
                </div>
            </div>
        </div>
    );
}


export default Loading;