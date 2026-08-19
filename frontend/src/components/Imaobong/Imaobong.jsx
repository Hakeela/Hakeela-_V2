import { useRef, useState } from 'react'
import Popup from '../Popup/Popup.jsx'
import './Imaobong.css'

function Imaobong() {
  const boxRef = useRef(null)
  const imgRef = useRef(null)
  const [popupOpen, setPopupOpen] = useState(false)

  const handleMove = (e) => {
    const box = boxRef.current
    const img = imgRef.current
    if (!box || !img) return
    const rect = box.getBoundingClientRect()
    // offset of cursor from the box centre, normalized to -1..1
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    // clamp travel to a fraction of the box so the image never leaves it
    const maxX = rect.width * 0.12
    const maxY = rect.height * 0.12
    const tx = Math.max(-maxX, Math.min(maxX, nx * maxX))
    const ty = Math.max(-maxY, Math.min(maxY, ny * maxY))
    img.style.transform = `translate(${tx}px, ${ty}px) scale(1.05)`
  }

  const handleLeave = () => {
    if (imgRef.current) imgRef.current.style.transform = ''
  }

  return (
    <section className="imaobong">
      <div className="imaobong__inner">
        <div className="imaobong__text">
          <h2 className="imaobong__title">
            Not Sure Which Tech Skill to Learn?
          </h2>
          <p className="imaobong__body">
            If you&rsquo;re struggling to find the right tech program or don&rsquo;t
            know where to start, chat with Imaobong — our A.I. chatbot ready to
            guide you.
          </p>
          <button type="button" className="imaobong__btn" onClick={() => setPopupOpen(true)}>
            Chat with Imaobong
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div
          className="imaobong__avatar"
          ref={boxRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <img ref={imgRef} src="/imaobong.png" alt="Imaobong, the Hakeela A.I. chatbot" />
        </div>
      </div>

      <Popup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        title="Imaobong is coming soon!"
        image="/imaobong.png"
      >
        <p>Imaobong, our A.I. chatbot, is coming soon. Stay tuned!</p>
      </Popup>
    </section>
  )
}

export default Imaobong
