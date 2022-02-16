import { useHistory } from "react-router-dom";
import "./CSS/mypage.css"
import axios from "axios";
import React, { useState } from "react";


// user >> props로 app.js에서 받아와야

function Mypage () {

  const [users, setUsers] = useState({
    name: "",
    email: "",
    id: "",
  });

  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");


  const handleInputValue = (key) => (e) => {
    setUsers({ ...users, [key]: e.target.value });
  }

  // 회원정보 수정
  const handleUserinfo = () => {
    if (
      users.email === "" ||
      users.name === "" 
      //회원정보 수정 항목에서 입력을 안할 경우
    ) {
      setErrorMessage("모든 항목입력은 필수입니다");
    } 
    const { email, name } = users;
    axios
      .patch(
        //put
        `http://localhost:4000`,
        {
          email: email,
          name: name,
        },
        // axios patch 로 이메일, 이름 정보 업데이트
        {
          withCredentials:true
        }
      )
      // then >> async/await 통일
      .then(() => {
        console.log("userinfo successfully updated");
        // history.push("/");
        // 회원정보 수정후 기본경로로 이동
        // 모달 사라지고 끝남
      })
      .catch((err) => {
        if (err) throw err;
      });
  };




  return (
  
  <div className="mypage">
    <div className="userinfo">
      <div className="userinfo-title"> 회원정보</div>
      <div className="userinfo-detail">
        <div> 00000님 환영합니다 </div>  
        <div> 아이디</div>
        <div> 이메일 </div>
      </div>
      <div className="buttons">
        <div>
          <button className="mypage-button" onClick={handleUserinfo}> 
          회원정보 수정
          </button>
          <button> 비밀번호 변경</button>
        </div>
      </div>
    </div>
  
    <div className="groupinfo">
      <div className="group-title">그룹정보</div>
      <div className="group-box">
        <div className="group-name"> 
          <div>
          test group1
          </div>
          <div>
            <button> 그룹나가기 </button>
          </div>
        </div>
      
        <div className="group-name"> 
          <div>
          test group2
          </div>
          <div>
            <button> 그룹나가기 </button>
          </div>

        </div>
      
        <div className="group-name"> 
          <div>
          test group3
          </div>
          <div>
            <button> 그룹나가기 </button>
          </div>

        </div>
      </div>  
    </div>
    <div className="delete">회원탈퇴</div>


    <div> 모달창구성</div> 


    <div >{errorMessage}</div>
    <div>  
      <div className="mypage-input-box">      
        <input
          className="mypage-input"
          type="email"
          placeholder="변경할 이메일"
          onChange={handleInputValue("email")}
        />
      </div>
      <div className="mypage-input-box">      
        <input
          className="mypage-input"
          type="text"
          placeholder="변경할 이름"
          onChange={handleInputValue("name")}
        />
      </div>
    </div>




  </div>
  
  )
  }
  
  export default Mypage;