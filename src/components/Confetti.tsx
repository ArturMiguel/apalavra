import ReactConfetti from "react-confetti";

export default function Confetti() {
  return (
    <ReactConfetti
      width={window.innerWidth}
      height={window.innerHeight}
      tweenDuration={1}
      recycle={false}
    ></ReactConfetti>
  )
}