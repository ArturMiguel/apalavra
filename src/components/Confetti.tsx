import ReactCanvasConfetti from "react-canvas-confetti";
import ReactConfetti from "react-confetti";

export default function Confetti({ fire }) {
  return (
    <div>
     <ReactCanvasConfetti fire={fire} style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        zIndex: 2000,
        top: 0,
        left: 0
      }} />
    </div>
  )
}