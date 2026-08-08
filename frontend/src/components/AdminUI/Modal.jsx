import { useEffect } from "react";

/** Lightweight modal/popup for the admin portal. */
function Modal({ open, title, subtitle, onClose, children, footer, width = 520 }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="adm-modal" onMouseDown={onClose}>
      <div className="adm-modal__card" style={{ maxWidth: width }} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="adm-modal__head">
          <div>
            <h3 className="adm-modal__title">{title}</h3>
            {subtitle && <p className="adm-modal__sub">{subtitle}</p>}
          </div>
          <button className="adm-modal__close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="adm-modal__body">{children}</div>
        {footer && <div className="adm-modal__foot">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
