import { useEffect } from 'react'
import './Popup.css'

/**
 * Lightweight modal popup used for lightweight messages
 * (e.g. "Imabong coming soon", sign-up confirmation).
 */
function Popup({ open, onClose, title, image, children, actionLabel = 'Got it', onAction }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const handleAction = () => (onAction ? onAction() : onClose?.())

  return (
    <div className="popup__overlay" onClick={onClose} role="presentation">
      <div
        className="popup__card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup__close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {image && <img className="popup__image" src={image} alt="" />}
        {title && <h3 className="popup__title">{title}</h3>}
        <div className="popup__body">{children}</div>

        <button className="popup__btn" onClick={handleAction}>{actionLabel}</button>
      </div>
    </div>
  )
}

export default Popup
