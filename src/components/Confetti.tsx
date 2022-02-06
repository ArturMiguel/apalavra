import { NextPage } from "next"
import ReactConfetti from "react-confetti";

const Confetti: NextPage = () => {
  return (
    <ReactConfetti
      width={window.innerWidth}
      height={window.innerHeight}
      tweenDuration={1}
      recycle={false}
    ></ReactConfetti>
  )
}

export default Confetti;