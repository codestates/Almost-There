interface ShowList {
  login: boolean,
  signin: boolean
}

type SigninModalProps = {
  setShow: React.Dispatch<React.SetStateAction<ShowList>>
}

function SignInModal ({setShow}: SigninModalProps) {
  return (
    <div></div>
  )
}

export default SignInModal;