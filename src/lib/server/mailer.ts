import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
	if (transporter) return transporter;
	const host = env.SMTP_HOST;
	const port = Number(env.SMTP_PORT) || 587;
	const user = env.SMTP_USER;
	const pass = env.SMTP_PASS;
	if (!host || !user || !pass) {
		throw new Error('SMTP is not configured (SMTP_HOST, SMTP_USER, SMTP_PASS required)');
	}
	transporter = nodemailer.createTransport({
		host,
		port,
		secure: port === 465,
		auth: { user, pass }
	});
	return transporter;
}

/**
 * Send an email. No-ops if SMTP is not configured (e.g. in tests).
 */
export async function sendEmail(options: {
	to: string;
	subject: string;
	text: string;
	html?: string;
}): Promise<void> {
	const host = env.SMTP_HOST;
	const user = env.SMTP_USER;
	if (!host || !user) {
		console.warn('[mailer] SMTP not configured, skipping email to', options.to);
		return;
	}
	const transport = getTransporter();
	await transport.sendMail({
		from: env.SMTP_FROM ?? user,
		to: options.to,
		subject: options.subject,
		text: options.text,
		html: options.html ?? options.text.replace(/\n/g, '<br>\n')
	});
}
