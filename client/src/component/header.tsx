import { useState } from 'react';
import './CSS/header.css';

type HeaderProps = {
  login: boolean;
}

const Header = ({ login }: HeaderProps) => {
  
  return (
    <header>
      <div className='taps'>
        <div className='logo'>
          - 로고 - A l m o s t - T h e r e
        </div>
      </div>
      {login 
        ?
          <div className='taps'>
            <div className='menu'>menu</div>
            <div className='direction'>
              <div className='tap'>알림</div>
              <div className='tap'>그룹 생성</div>
              <div className='tap'>마이페이지</div>
            </div>
            <div className='lastap'>로그아웃</div>
          </div>
        : 
          <div className='taps'>
            <div className='tap'>체험하기</div>
            <div className='tap'>로그인</div>
            <div className='lastap'>회원가입</div>
          </div>
      }
    </header>
  )
}

export default Header;