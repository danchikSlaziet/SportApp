import React, { useEffect, useState } from 'react';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNavbar, setActivePanel, setCheques, setPrizes, setUserAvatar, setUserName, setUserNumber } from '../../store/mainReducer';
import bridge from '@vkontakte/vk-bridge';
import Snackbar from '../Snackbar';
import ServerConnect from '../../service';

const Info = ({overlayClass, setOverlayClass}) => {
  const faqArray = [
    {
      question: 'Сроки проведения',
      answer: 'с 19.09 2024 г. по 31.10 2024 г.'
    },
    // {
    //   question: 'Сроки проведения',
    //   answer:    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quod vel magnam fugit molestias! Eius sint provident voluptatum, modi ab doloribus quasi minima repudiandae labore perspiciatis ratione ipsam, neque et.
    //               Accusantium similique recusandae aspernatur architecto, explicabo placeat minus totam necessitatibus assumenda distinctio dolor ab, ratione laborum quia saepe illum aliquam provident minima sed quo quae delectus perspiciatis! Ab, quidem enim.
    //               Quia doloremque eos, animi pariatur obcaecati aliquam totam earum eligendi quidem dicta voluptatibus error sequi saepe fugit facere est et debitis deleniti magnam corrupti. Ipsam eligendi modi doloribus a consectetur!
    //               Libero maxime quidem reiciendis aspernatur. Modi, obcaecati earum. Pariatur excepturi quos iure dolores voluptatibus perferendis officia soluta ipsum illo natus architecto explicabo, nostrum ipsa in, dicta qui cumque porro eveniet.
    //               Eveniet reprehenderit provident dicta recusandae dolores facere, unde consequuntur tempora odio perferendis rem iure porro officia, praesentium sequi! Libero eius in hic sint, est officiis beatae commodi natus! Quisquam, corrupti.
    //               Ipsam nihil ullam illo sit error officia enim deserunt in rem consectetur ipsa est alias perspiciatis architecto vel pariatur, nobis id magnam explicabo praesentium! Aspernatur voluptatibus deleniti necessitatibus? In, aliquid?
    //               Fugit hic laborum deserunt corporis sed suscipit voluptatibus distinctio inventore ea eos laudantium rerum repudiandae quam qui expedita sunt quis exercitationem dolores, vitae ipsa quos fuga, totam veniam perferendis. Ullam!
    //               Aperiam maiores omnis aspernatur. Voluptates consectetur, mollitia adipisci dolores iusto nobis deserunt! Voluptatibus consequuntur laudantium facere suscipit, aut, ex quidem voluptates laborum reiciendis et laboriosam nesciunt officiis id blanditiis saepe.
    //               Amet non officia libero, molestias veritatis similique error ipsa culpa? Provident eaque repellat nam vitae? Fugit tempora accusantium nihil quis asperiores praesentium? Incidunt dolore perferendis tenetur vero, labore fugiat repellendus?
    //               Praesentium expedita autem velit atque soluta accusamus ratione, suscipit quasi voluptate dolor voluptates, recusandae amet necessitatibus, officia doloribus non dolores? Ipsam temporibus non dolor tempora vero nihil amet nobis autem!`
    // },
    // {
    //   question: 'Сроки проведения',
    //   answer:   `Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolor autem saepe corporis ullam neque voluptate asperiores inventore at ea! Ex possimus maiores necessitatibus itaque pariatur? Excepturi harum iusto quidem.
    //             Numquam cumque mollitia similique itaque voluptatum voluptatibus optio obcaecati porro? Illo ex quae, velit quia culpa placeat eum quos nam exercitationem, ratione nihil commodi inventore vitae quo quisquam ducimus non.
    //             Dicta excepturi sapiente quidem quasi odit adipisci itaque deleniti consectetur aperiam, repudiandae officiis, quis aliquid debitis molestias temporibus sed hic blanditiis, reiciendis esse possimus cumque! Velit, dignissimos minus! Quae, tempore.
    //             Delectus quod temporibus excepturi laborum odio, neque, quia optio nihil aliquam necessitatibus hic eius accusamus iure officiis, quaerat eligendi? Nam voluptas nemo velit doloribus assumenda obcaecati deserunt hic ea minus?
    //             Vel ullam itaque incidunt magni culpa natus alias rem similique, quis aliquid veritatis amet provident aperiam molestiae, quos commodi inventore maxime, deserunt minus! Ut beatae totam sed nobis repudiandae quidem.`
    // },
  ]
  const dispatch = useDispatch();
  const [classPage, setClassPage] = useState('info');
  const [activeElements, setActiveElements] = useState({});

  const handleClick = (index) => {
    setActiveElements((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  useEffect(() => {
    setClassPage('info info_active');
    dispatch(setActiveNavbar(true));
  }, []);
    return (
          <div className={`container ${classPage}`}>
            <div className='info__bg'></div>
            <div className='info__content'>
              <p className='info__title'>
                Информация
              </p>
              <div className='info__banner'>
                <div className='info__banner-bg'></div>
                <img className='info__banner-img' src="assets/images/info-banner-img.png" alt="" />
                <p className='info__banner-title'>
                  Самый милый кликер <br />
                  от&nbsp;«Пятëрочки»
                </p>
                <p className='info__banner-subtitle'>
                  Мурлыкер&nbsp;&mdash; это игра, где каждый день приносит радость вашему котику и&nbsp;награды вам. Гладьте котика, зарабатывайте Лапки и&nbsp;Билетики, и&nbsp;участвуйте в&nbsp;розыгрыше &nbsp;потрясающих призов!
                </p>
              </div>
              <div className='info__boosts'>
                <div className='info__boost'>
                  <img className='info__boost-img' src="assets/images/info-pen.svg" alt="" />
                  <p className='info__boost-title'>
                    Получайте<br />
                    Пушинки
                  </p>
                  <p className='info__boost-subtitle'>
                    Зарабатывайте Пушинки, чтобы восстанавливать пропущенные дни
                  </p>
                </div>
                <div className='info__boost'>
                  <img className='info__boost-img' src="assets/images/info-ticket.svg" alt="" />
                  <p className='info__boost-title'>
                    Собирайте<br />
                    Билетики
                  </p>
                  <p className='info__boost-subtitle'>
                    Они дают шанс участвовать в&nbsp;главном розыгрыше.
                  </p>
                </div>
              </div>
              <p className='info__middle-title'>
                Собирайте Лапки, получайте
                Билетики и&nbsp;участвуйте
                в&nbsp;розыгрыше призов
                от&nbsp;«Пятëрочки»
              </p>
              <div className='info__main-prize'>
                <div className='info__main-prize-help'></div>
                <img className='info__main-prize-img' src="assets/images/info-main-prize.png" alt="" />
                <p className='info__main-prize-title'>Главный приз</p>
                <p className='info__main-prize-name'>
                  Смартфон
                  <br />
                  Apple iPhone 16
                </p>
                <p className='info__main-prize-count'>1 шт</p>
              </div>
              <div className='info__swiper'>
                <Swiper
                        spaceBetween={8}
                        slidesPerView={'auto'}
                        >
                  <SwiperSlide>
                    <div className='info__swiper-card'>
                      <img style={{width: '108px', top: '-52px', left:'50%'}} className='info__swiper-card-img' src="assets/images/info-swiper-img-1.png" alt="" />
                      <p className='info__swiper-card-text'>
                        Колонка<br />
                        Xiaomi S28D
                      </p>
                      <p className='info__swiper-card-count'>
                        5 шт
                      </p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='info__swiper-card'>
                      <img style={{width: '132px', left: '50%', top: '-17px'}} className='info__swiper-card-img' src="assets/images/info-swper-img-2.png" alt="" />
                      <p className='info__swiper-card-text'>
                        3000 рублей<br />
                        на Wildberries
                      </p>
                      <p className='info__swiper-card-count'>
                        10 шт
                      </p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='info__swiper-card'>
                      <img style={{width: '136px', left: '50%', top: '-33px'}} className='info__swiper-card-img' src="assets/images/info-swiper-img-3.png" alt="" />
                      <p className='info__swiper-card-text'>
                        Наушники<br />
                        JBL Tune
                      </p>
                      <p className='info__swiper-card-count'>
                        2 шт
                      </p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='info__swiper-card'>
                      <img style={{width: '131px', left: '50%', top: '-20px'}} className='info__swiper-card-img' src="assets/images/info-swiper-img-4.png" alt="" />
                      <p className='info__swiper-card-text'>
                        Умная колонка<br />
                        Sberboom Mini
                      </p>
                      <p className='info__swiper-card-count'>
                        10 шт
                      </p>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className='info__cloud'>
                <img className='info__cloud-img' src="assets/images/info-cloud.png" alt="" />
                <p className='info__cloud-title'>
                  Мяу-мяу! Нас ждёт самое <br /> милое приключение!
                </p>
                <p className='info__cloud-subtitle'>
                  Каждый день&nbsp;&mdash; новая Лапка и&nbsp;подарки для вас! 
                  Соберайте Лапки, чтобы получать больше призов, и&nbsp;я&nbsp;всегда был доволен!
                </p>
              </div>
              <div className='info__faq-title'>
                Ответы на частые <br />
                вопросы
              </div>
              <div className='info__faq'>
                {faqArray.map((faq, index) => (
                  <div key={index} className={activeElements[index] ? 'info__faq-item info__faq-item_active' : 'info__faq-item'}>
                    <div onClick={() => handleClick(index)} className='info__faq-item-question'>
                      <p className='info__faq-item-text'>{faq.question}</p>
                      <img className='info__faq-item-arrow' src="assets/images/faq-arrow.svg" alt="" />
                    </div>
                    <div className='info__faq-item-answer'>
                      {faq.answer}
                    </div>
                  </div>
                ))}
                <div className='info__faq-link'>
                  <a className='info__faq-href' target='_blank' href="https://docs.google.com/document/d/1KbXxk0Exg9ZRjlzLtA4E_HmsQpL5QDXU61awhTZPYTo/edit?usp=sharing"></a>
                  <img className='info__faq-link-img' src="assets/images/info-link-img.svg" alt="" />
                  <p className='info__faq-link-text'>
                    Правила и условия
                  </p>
                  <img className='info__faq-link-arrow' src="assets/images/info-faq-arrow.png" alt="" />
                </div>
              </div>
                
            </div>
          </div>
    );
}

export default Info;