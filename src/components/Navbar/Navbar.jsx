import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { setActivePanel } from "../../store/mainReducer";
import bridge from '@vkontakte/vk-bridge';
import './style.css'
import ServerConnect from '../../service';
import homeGreen from '../../../public/assets/images/static/navbar-home-green.png';
import homeWhite from '../../../public/assets/images/static/navbar-home-white.png';
import infoGreen from '../../../public/assets/images/static/navbar-info-green.png';
import infoWhite from '../../../public/assets/images/static/navbar-info-white.png';
import taskGreen from "../../../public/assets/images/static/navbar-task-green.png";
import taskWhite from "../../../public/assets/images/static/navbar-task-white.png";
import prizeGreen from "../../../public/assets/images/static/navbar-prize-green.png";
import prizeWhite from '../../../public/assets/images/static/navbar-prize-white.png';

const Navbar = ({isActive}) => {
    const currentScreen = useSelector((state) => state.main.activePanel);
    useEffect(() => {
      // console.log(currentScreen)
      if (currentScreen == 'main') {
        setClassMain({
          class: 'navbar__button navbar__button_active',
          src: homeWhite
        });
        setClassInfo({
          class: 'navbar__button',
          src: infoGreen
        });
        setClassTask({
          class: 'navbar__button',
          src: taskGreen
        });
        setClassPrize({
          class: 'navbar__button',
          src: prizeGreen
        });
      }
      if (currentScreen == 'task') {
        setClassMain({
          class: 'navbar__button',
          src: homeGreen
        });
        setClassInfo({
          class: 'navbar__button',
          src: infoGreen
        });
        setClassTask({
          class: 'navbar__button navbar__button_active',
          src: taskWhite
        });
        setClassPrize({
          class: 'navbar__button',
          src: prizeGreen
        });
      }
      if (currentScreen == 'info') {
        setClassMain({
          class: 'navbar__button',
          src: homeGreen
        });
        setClassInfo({
          class: 'navbar__button navbar__button_active',
          src: infoWhite
        });
        setClassTask({
          class: 'navbar__button',
          src: taskGreen
        });
        setClassPrize({
          class: 'navbar__button',
          src: prizeGreen
        });
      }
      if (currentScreen == 'prize') {
        setClassMain({
          class: 'navbar__button',
          src: homeGreen
        });
        setClassInfo({
          class: 'navbar__button',
          src: infoGreen
        });
        setClassTask({
          class: 'navbar__button',
          src: taskGreen
        });
        setClassPrize({
          class: 'navbar__button navbar__button_active',
          src: prizeWhite
        });
      }
    }, [currentScreen])
    const dispatch = useDispatch();
    const [classMain, setClassMain] = useState({
      class: 'navbar__button navbar__button_active',
      src: homeWhite,
    });
    const [classInfo, setClassInfo] = useState({
      class: 'navbar__button',
      src: infoGreen
    });
    const [classTask, setClassTask] = useState({
      class: 'navbar__button',
      src: taskGreen
    });
    const [classPrize, setClassPrize] = useState({
      class: 'navbar__button',
      src: prizeGreen
    });
    function buttonHandler(name) {
      if (name === "Главная") {
        dispatch(setActivePanel('main'))
      }
      if (name === "Информация") {
        dispatch(setActivePanel('info'))
      }
      if (name === "Задания") {
        dispatch(setActivePanel('task'))
      }
      if (name === "Призы") {
        dispatch(setActivePanel('prize'))
      }
    }

    return (
        <div className='navbar' style={{display: isActive ? 'flex' : 'none'}}>
          <div onClick={() => buttonHandler('Главная')} className={classMain.class}>
            <img className='navbar__button-img' src={classMain.src} alt="" />
            <p className='navbar__button-text'>Главная</p>
          </div>
          <div onClick={() => buttonHandler('Информация')} className={classInfo.class}>
            <img className='navbar__button-img' src={classInfo.src} alt="" />
            <p className='navbar__button-text'>Информация</p>
          </div>
          <div onClick={() => buttonHandler('Задания')} className={classTask.class}>
            <img className='navbar__button-img' src={classTask.src} alt="" />
            <p className='navbar__button-text'>Задания</p>
          </div>
          <div onClick={() => buttonHandler('Призы')} className={classPrize.class}>
            <img className='navbar__button-img' src={classPrize.src} alt="" />
            <p className='navbar__button-text'>Призы</p>
          </div>
        </div>
    );
}


export default Navbar;