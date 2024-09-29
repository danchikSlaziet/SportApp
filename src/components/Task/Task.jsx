import React, { useEffect, useState } from 'react';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNavbar, setActivePanel, setCheques, setFriendsCount, setPrizes, setQuestID, setQuestLink, setQuestText, setTasks, setUserAvatar, setUserName, setUserNumber } from '../../store/mainReducer';
import bridge from '@vkontakte/vk-bridge';
import Snackbar from '../Snackbar';
import ServerConnect from '../../service';
import taskCompleted from '../../../public/assets/images/static/task-completed.png';
import taskNotCompleted from '../../../public/assets/images/static/task-arrow.png';

const Task = ({overlayClass, setOverlayClass}) => {
  const dispatch = useDispatch();
  const referal = useSelector(state => state.main.referal);
  const tgID = useSelector(state => state.main.tgID);
  const friendsCount = useSelector(state => state.main.friendsCount);
  const healsCount = useSelector((state) => state.main.heals);
  const tasksArray = useSelector((state) => state.main.tasks)
  const [classPage, setClassPage] = useState('task');
  const [friendPopup, setFriendPopup] = useState('task__friend-popup');
  const [topPopup, setTopPopup] = useState('task__top-popup');
  function buttonHandler(text) {
    if (text == 'invite') {
      setFriendPopup('task__friend-popup task__friend-popup_active');
    }
    else {
      dispatch(setActivePanel('rebus'));
    }
  }
  function closePopup() {
    setFriendPopup('task__friend-popup')
  }
  function encryptTelegramId(telegramId) {
    // Создаем словарь для сопоставления цифр и букв
    const dictionary = {
      '0': 'x', '1': 'q', '2': 'z', '3': 'p', '4': 'a',
      '5': 'k', '6': 'w', '7': 'r', '8': 'n', '9': 'j'
    };
  
    let encryptedId = '';
    for (const digit of telegramId) {
      encryptedId += dictionary[digit];
    }
  
    return encryptedId;
  }
  function friendCopyHandler() {
    navigator.clipboard.writeText(`https://t.me/MurMur_click_bot?start=${encryptTelegramId(tgID.toString())}`)
     .then(() => {
     })
     .catch(err => {
     });
    setTopPopup('task__top-popup task__top-popup_active');
    setTimeout(() => {
      setTopPopup('task__top-popup');
    }, 2500)
  }
  useEffect(() => {
    setClassPage('task task_active');
    dispatch(setActiveNavbar(true));
    ServerConnect.getUser('/users/', referal)
      .then((data) => {
        const sortedArray = data.quests;
        sortedArray.sort((a, b) => {
          if (a.done === b.done) {
            return 0;
          }
          if (a.done) {
            return 1;
          }
          return -1;
        });
        dispatch(setTasks(sortedArray));
        dispatch(setFriendsCount(data.invited_friends));
      })
      .catch((err) => {});
  }, []);
    return (
        <>
          <div className={`container ${classPage}`}>
            <div className={topPopup}>
              Ссылка скопирована
            </div>
            <div onClick={(evt) => {
              if (evt.target.className === "task__friend-popup task__friend-popup_active") {
                setFriendPopup('task__friend-popup');
              }
            }} className={friendPopup}>
              <div className='task__friend-content'>
                <img onClick={closePopup} className='task__friend-close' src="assets/images/friend-popup-close.svg" alt="" />
                <img className='task__friend-img' src="assets/images/friend-popup.svg" alt="" />
                <p className='task__friend-title'>
                  Пригласите друга
                </p>
                <p className='task__friend-subtitle'>
                  Приглашайте друзей и&nbsp;получайте Пушинки, чтобы закрывать пропущенные дни
                </p>
                <div className='task__friend-buttons'>
                  <button className='task__friend-invite-btn' type='button'>
                    <a className='task__friend-link' href={`https://t.me/share/url?url=https://t.me/MurMur_click_bot?start=${encryptTelegramId(tgID.toString())}`}></a>
                    Пригласить друзей
                  </button>
                  <div onClick={friendCopyHandler} className='task__friend-copy-btn'>
                    <img className='task__friend-copy-img' src="assets/images/friend-popup-button.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className='task__bg'></div>
            <div className='task__content'>
              <p className='task__title'>
                Задания
              </p>
              <div className='task-info'>
                <div className='task__friends'>
                  <img className='task__friends-img' src="assets/images/task-people-img.svg" alt="" />
                  <p className='task__friends-text'>
                    {friendsCount}
                  </p>
                </div>
                <div className='task__pen'>
                  <img className='task__pen-img' src="assets/images/info-pen.svg" alt="" />
                  <p className='task__pen-text'>
                    {healsCount}
                  </p>
                </div>
              </div>
              {tasksArray.map((task, index) => {
                return (
                  <div onClick={() => {
                    if (!task.done) {
                      dispatch(setQuestID(task.id));
                      if (task.type == 'quiz') {
                        dispatch(setQuestLink(task.url));
                        dispatch(setQuestText(task.text));
                      }
                      buttonHandler(task.type);
                    }
                  }} key={index} style={{pointerEvents: task.done ? 'none' : 'all'}} className='task__taska taska'>
                    <img className='taska__people-img' src="assets/images/task-people-img.svg" alt="" />
                    <div className='taska__info'>
                      <p className='taska__info-text'>
                        {task.type == 'invite' ? task.text : 'Разгадайте ребус'}
                      </p>
                      <div className='taska__info-pen'>
                        <p className='taska__info-pen-count'>+1</p>
                        <img className='taska__info-pen-img' src='assets/images/task-pen.svg' alt="" />
                      </div>
                    </div>
                    <img className='taska__arrow' src={task.done ? taskCompleted : taskNotCompleted} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </>
    );
}

export default Task;