import React, { useEffect, useState } from 'react';
import './style.css';
import coin1 from '../../../public/assets/images/static/coin1-ver1.svg';
import coin2 from '../../../public/assets/images/static/coin1-ver2.svg';
import coin3 from '../../../public/assets/images/static/coin2-ver1.svg';
import coin4 from '../../../public/assets/images/static/coin2-ver2.svg';

const Coin = ({ x, y, children }) => {
  const [opacity, setOpacity] = useState(1);
  const [src, setSrc] = useState(coin1);
  const coinImages = [coin1, coin2, coin3, coin4];
  function getRandomImage(images) {
    // Проверяем, что images - это массив с картинками
    if (!Array.isArray(images) || images.length === 0) {
      return null;
    }
  
    // Получаем случайный индекс в массиве
    const randomIndex = Math.floor(Math.random() * images.length);
  
    // Возвращаем случайную картинку из массива
    return images[randomIndex];
  }
  useEffect(() => {
    setSrc(getRandomImage(coinImages));
    const intervalId = setInterval(() => {
      if (opacity > 0) {
        setOpacity(opacity => Math.max(opacity - 0.05, 0)); // Уменьшаем opacity каждые 50 миллисекунд, но не ниже 0
      } else {
        clearInterval(intervalId); // Прекращаем уменьшение, когда opacity достигает 0
      }
    }, 50);

    return () => {
      clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    };
  }, []);

  return (
    <>
        <img className="coin" style={{ left: `${x}px`, top: `${y}px`, opacity }} src={src} alt="" />
    </>
  );
};

export default Coin;