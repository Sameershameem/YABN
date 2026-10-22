import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Phone, X } from 'lucide-react'

// Public number from yasiraliclasses.in; change both here if a dedicated YABN line is set up
const PHONE = '+918439417079'
const WHATSAPP_TEXT = 'Hi YABN, I would like to know more about your programs.'

function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23a7.46 7.46 0 0 1-1.38-1.71c-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  )
}

const actions = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
    icon: WhatsAppIcon,
    tint: 'bg-[#25D366] text-white',
    external: true,
  },
  { label: 'Call us', href: `tel:${PHONE}`, icon: Phone, tint: 'bg-[#021329] text-[#dcc17b]' },
]

/* One quiet floating button that opens WhatsApp and phone options */
export default function ContactFab() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => (e.type === 'keydown' ? e.key === 'Escape' : !ref.current?.contains(e.target)) && setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', close)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-end gap-2.5 sm:right-6 sm:bottom-6"
    >
      <ul id="contact-fab-menu" className="flex flex-col items-end gap-2" aria-hidden={!open}>
        {actions.map(({ label, href, icon: Icon, tint, external }, i) => (
          <li
            key={label}
            className={`transition-[opacity,transform] duration-300 ease-out ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
            style={{ transitionDelay: open ? `${(actions.length - 1 - i) * 50}ms` : '0ms' }}
          >
            <a
              href={href}
              tabIndex={open ? 0 : -1}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-1.5 pl-4 text-[13px] font-medium text-ink shadow-[0_8px_24px_-10px_rgba(22,20,18,0.35)] ring-1 ring-line transition-transform active:scale-95 sm:hover:-translate-x-0.5"
            >
              {label}
              <span className={`grid size-8 place-items-center rounded-full ${tint}`}>
                <Icon className="size-4" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="contact-fab-menu"
        aria-label={open ? 'Close contact options' : 'Contact us on WhatsApp or phone'}
        className="relative grid size-12 place-items-center rounded-full bg-gradient-to-tr from-[#B98F32] via-[#cca244] to-[#B98F32] text-[#021329] shadow-[0_12px_30px_-6px_rgba(185,143,50,0.5)] ring-2 ring-white/50 transition-all duration-200 hover:scale-105 active:scale-95 sm:size-14"
      >
        <MessageCircle className={`absolute size-5 transition-[opacity,transform] duration-300 sm:size-6 ${open ? 'scale-50 rotate-45 opacity-0' : 'opacity-100'}`} strokeWidth={1.6} />
        <X className={`absolute size-5 transition-[opacity,transform] duration-300 sm:size-6 ${open ? 'opacity-100' : 'scale-50 -rotate-45 opacity-0'}`} strokeWidth={1.6} />
      </button>
    </div>
  )
}
