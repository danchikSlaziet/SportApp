import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import './style.css'

const Header = ({}) => {
    const dispatch = useDispatch();
    return (
        <div className="container header">
            <div className='header__count-wrapper'>
              <p className='header__count-number'>4 871</p>
              <img className='header__count-img' src="assets/images/header-money.svg" alt="" />
            </div>
        </div>
    );
}


export default Header;