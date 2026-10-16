# YABN: Yasir Ali Business Network

Website for YABN: entrepreneurship training, business growth services and a trusted founder network. *Har Ghar Se Ek Entrepreneur.*

Built with React, Vite, Tailwind CSS 4 and React Router.

## Run locally

```sh
npm install
npm run dev      # development server
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Pages

`/` Home · `/about` About (founder) · `/services` Academy, growth services, assessment, network · `/mission-100` Mission 100 and application · `/contact` Contact form and FAQs

## Forms

All forms (contact, Mission 100 application, assessment → discovery call) are emailed through [FormSubmit](https://formsubmit.co) to the inbox set in `src/lib/submit.js`.

- The **first** submission sends an "Activate Form" email to that inbox. Click it once; after that every submission is delivered.
- To hide the address from the page source, put the alias FormSubmit gives you in a `.env.local` file:
  `VITE_FORM_ENDPOINT=https://formsubmit.co/ajax/<your-alias>`

## Deploying

The site is a single-page app, so the host must serve `index.html` for every route. `vercel.json` handles this on Vercel; on Netlify add a `_redirects` file with `/* /index.html 200`.

## Credits

Photos: Unsplash (see `public/img/CREDITS.txt`); founder photo from yasiraliclasses.in.
Built by [Sameer Shameem](https://portfolio-psi-inky-18.vercel.app/).
