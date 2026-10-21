// Every form on the site sends through here and arrives as an email.
// FormSubmit (https://formsubmit.co) relays it: no account or server needed.
// The very first submission triggers a one-time "Activate form" email to the inbox;
// after it's clicked, every submission is delivered. FormSubmit then also offers a
// private alias you can put in VITE_FORM_ENDPOINT so the address isn't in the page source.
export const INBOX = 'yabnbusiness@gmail.com'
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || `https://formsubmit.co/ajax/${INBOX}`

/**
 * @param {string} subject   e.g. "New enquiry: Mission 100"
 * @param {Record<string, string>} fields  label → value, shown as a table in the email
 * @returns {Promise<void>}  rejects with a human-readable message
 */
export async function sendForm(subject, fields) {
  // a bot-trap field: real visitors never fill it, so a value means spam
  if (fields._honey) return

  const body = {
    ...fields,
    'Sent from': window.location.href,
    'Sent at': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    ...(fields.Email ? { _replyto: fields.Email } : {}),
  }

  let res
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Could not reach the server. Please check your connection and try again.')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok || String(data.success) !== 'true') {
    if (data.message && data.message.toLowerCase().includes('activ')) {
      throw new Error(
        `Action Required: FormSubmit has sent a 1-click 'Activate Form' confirmation email to ${INBOX}. Please open ${INBOX} (check Inbox, Updates, or Spam folder) and click the 'Activate Form' button. Once clicked, all submissions from this domain will be permanently active.`
      )
    }
    throw new Error(data.message || 'Something went wrong while sending. Please try again.')
  }
}

/* Read a <form> into a label → value object using each field's data-label and name */
export function readForm(form) {
  const out = {}
  for (const el of form.elements) {
    if (!el.name || el.type === 'submit') continue
    const val = el.type === 'checkbox' ? (el.checked ? 'Yes' : 'No') : el.value.trim()
    out[el.name] = val
    if (el.dataset.label) {
      out[el.dataset.label] = val
    }
  }
  return out
}
