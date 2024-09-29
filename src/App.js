import React,{ useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import Main from './components/Main';
import Loading from './components/Loading';

import Overlay from './panels/Overlay';
import bridge from '@vkontakte/vk-bridge';

import { setLaunchParams, setPlatform, setAttempts, setIncrement, setActiveModal, setModalName, setConfirmAll, setFirstPage, setGroupLink, setTickets, setHeals, setTasks, setTgID, setPrizes, setGameDays, setReferal, setFriendsCount } from "./store/mainReducer"

import ServerConnect from './service';

import { Snackbar } from "@vkontakte/vkui";
import { Icon24DismissSubstract, Icon24CheckCircleOn } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';
import { isIOS } from 'react-device-detect';
import OnBoardingFirst from './components/OnBoardingFirst';
import OnBoardingSecond from './components/OnBoradingSecond';
import Navbar from './components/Navbar';
import Info from './components/Info';
import Task from './components/Task';
import Prize from './components/Prize';
import Rebus from './components/Rebus';

const App = () => {
  const dispatch = useDispatch();
  const [firstInteraction, setFirstInteraction] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const activePanel = useSelector(state => state.main.activePanel);
  const isActiveNavbar = useSelector(state => state.main.isActiveNavbar);
  const platform = useSelector(state => state.main.platform);
  const [overlayClass, setOverlayClass] = useState('snackbar-faq');
  const [updatedDays, setUpdatedDays] = useState([]);
  const [requestPending, setRequestPending] = useState(false);
  function parseQuery(queryString) {
    let query = {};
    let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }
  let userChatId;

  const longAudio = 'assets/images/long.mp3';
  const longAudioRef = useRef(new Audio(longAudio));
  function startPlay() {
    longAudioRef.current.loop = true;
    longAudioRef.current.play();
  }
  const togglePlay = () => {
    setFirstInteraction(true);
    if (isPlaying) {
      longAudioRef.current.pause();
      setIsPlaying(false);
    } else {
      longAudioRef.current.loop = true;
      longAudioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('Failed to play long audio:', error);
        });
    }
  };
  function decryptTelegramId(encryptedId) {
    // Создаем обратный словарь для сопоставления букв и цифр
    const reverseDictionary = {
      'x': '0', 'q': '1', 'z': '2', 'p': '3', 'a': '4',
      'k': '5', 'w': '6', 'r': '7', 'n': '8', 'j': '9'
    };
  
    let decryptedId = '';
    for (const letter of encryptedId) {
      decryptedId += reverseDictionary[letter];
    }
  
    return decryptedId;
  }
  useEffect(() => {
    let app = window.Telegram.WebApp;
    let query = app.initData;
    let user_data_str = parseQuery(query).user;
    let user_data = JSON.parse(user_data_str);
    app.disableVerticalSwipes();
    app.expand();
    app.ready();
    userChatId = user_data["id"];
    let dataString = `tg_id=${userChatId}`;;
    // const urlParams = new URLSearchParams(window.location.search);

    // // Извлекаем значение tgWebAppStartParam
    // const tgWebAppStartParam = urlParams.get('tgWebAppStartParam');
    // if (tgWebAppStartParam) {
    //   const decryptedId = decryptTelegramId(tgWebAppStartParam);
    //   // Выводим значение в консоль
    //   console.log('decryptedId:', decryptedId);
    //   dataString = `tg_id=${userChatId}&referal=${decryptedId}`
    // }
    // else {
    //   dataString = `tg_id=${userChatId}`;
    // }
    dispatch(setReferal(dataString));
    dispatch(setTgID(userChatId));
    ServerConnect.getUser('/users/', dataString)
      .then((data) => {
        setRequestPending(true);
        // console.log(data);
        dispatch(setTickets(data.tickets));
        dispatch(setHeals(data.heals));
        dispatch(setTasks(data.quests));
        dispatch(setPrizes(data.prizes));
        dispatch(setGameDays(data.gameDays));
        dispatch(setFriendsCount(data.invited_friends));
        const copyOfGameDays = [...data.gameDays];
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
        const updatedDaysArr = sortedData.slice(0, currentIndex + 1);
        
        setUpdatedDays(updatedDaysArr);
      })
      .catch((err) => {
        
      });
  }, []);

  let content = []
  if (activePanel === 'loading') {
    content.push(<Loading requestPending={requestPending} key='loading'/>)
  }
  else if (activePanel === 'onboarding-first') {
    content.push(<OnBoardingFirst key='onboarding-first'/>)
  }
  else if (activePanel === 'onboarding-second') {
    content.push(<OnBoardingSecond key='onboarding-second'/>)
  }
  else if (activePanel === 'main') {
    content.push(<Main updatedDays={updatedDays} firstInteraction={firstInteraction} setFirstInteraction={setFirstInteraction} setIsPlaying={setIsPlaying} startPlay={startPlay} key='main'/>)
  }
  else if (activePanel === 'info') {
    content.push(<Info key='info'/>)
  }
  else if (activePanel === 'task') {
    content.push(<Task key='task'/>)
  }
  else if (activePanel === 'prize') {
    content.push(<Prize key='prize'/>)
  }
  else if (activePanel === 'rebus') {
    content.push(<Rebus key='rebus'/>)
  }
  return (
    <div className={`app ${platform}`}>
      <>
        <img className='music-icon' onClick={togglePlay} style={{display: isActiveNavbar ? 'block' : 'none', position: 'absolute',zIndex: '11',top: activePanel == 'prize' ? '17px' : activePanel == 'rebus' ? '30px' : '68px', right: '10px'}} src={isPlaying ? 'assets/images/music.svg' : 'assets/images/no-music.svg'} alt="" />
        {/* <div className={isIOS ? 'ios-help-bg' : 'not-ios-help'}></div> */}
        {content}
        <Navbar isActive={isActiveNavbar}/>
        <Overlay>
        </Overlay>
      </>
    </div>
  );
}
export default App;
