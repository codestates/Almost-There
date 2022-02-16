import "./CSS/mypage.css"


function Mypage () {

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
          <button> 회원정보 수정</button>
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
  </div>
  
  )
  }
  
  export default Mypage;