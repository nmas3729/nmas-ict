# NMAS Innovations website

## Public pages

The website has five public pages: `/` (Home), `/solutions` (Solutions and Product Portfolio), `/markets` (Target Markets), `/about` (Company Profile and Quality Assurance), and `/contact` (Contact and Request a Quote). Quote submissions are handled by the backend-only `/api/quote` endpoint.

## Run locally

Install dependencies with `pnpm install` and start the development server with `pnpm dev`. Do not put quote-email credentials in source files or `.env.example`.

## Quote request email

The `/api/quote` endpoint sends requests through Resend. Configure these server-side environment variables in Coolify for the deployed application:

- `SITE_URL` — the public site URL used to verify quote-form request origins.
- `ALLOWED_ORIGINS` — optional comma-separated list of additional legitimate origins, such as a production alias or preview host. Origins not explicitly listed are rejected.
- `RESEND_API_KEY` — Resend API key.
- `QUOTE_TO_EMAIL` — inbox that should receive quote requests; use `hello@nmas.co.za`.
- `QUOTE_FROM_EMAIL` — sender address verified with Resend. Verify the sender address with Resend before configuring it; do not assume `hello@nmas.co.za` is verified.

The quote form accepts one PDF, Word (`.doc` or `.docx`), or Excel (`.xls` or `.xlsx`) file up to 10 MB. The endpoint validates required fields, the consent field, the file extension and file signature, and sends a file to Resend as an email attachment; it does not save uploads to a public directory.

The endpoint includes a same-origin check and a honeypot field, but the project does not include distributed rate limiting. Before public production use, configure a distributed rate limit at the hosting, edge, or gateway layer and apply appropriate email-provider controls. Do not treat the honeypot alone as production spam protection.

Before enabling public quote submissions, the business owner should review the contact-consent wording and confirm how submitted personal information and uploaded RFQ / BOQ documents should be handled and retained. The site does not state a privacy or retention policy.

If the email settings are missing or delivery fails, the form displays an error and provides NMAS contact details; it does not report a successful submission.

## Internal TODO: proposed services requiring owner confirmation

The following are proposed future services only. They are not advertised on the site and must not be enabled until the business owner confirms capability and service arrangements:

- Device setup and configuration
- Installation and deployment
- Data migration
- On-site or remote IT support
- Business or home Wi-Fi setup
- Printer setup
- Cloud or Microsoft 365 setup
- Backup planning
- Endpoint security management
- ICT asset and lifecycle management
