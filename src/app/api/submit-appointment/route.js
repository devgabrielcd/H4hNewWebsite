import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const runtime = 'nodejs';

function sha256(value) {
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

function parseCookies(cookieHeader = '') {
  const out = {};
  cookieHeader.split(';').forEach((part) => {
    const [k, ...v] = part.trim().split('=');
    if (!k) return;
    out[k] = decodeURIComponent(v.join('=') || '');
  });
  return out;
}

async function sendMetaCapiEvent({ req, eventName, email, eventId }) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn('META CAPI: META_PIXEL_ID ou META_CAPI_TOKEN não configurados.');
    return;
  }

  const headers = req.headers;
  const cookies = parseCookies(headers.get('cookie') || '');
  const clientIp =
    (headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    headers.get('x-real-ip') ||
    undefined;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: headers.get('referer') || 'https://h4hinsurance.com/',
        event_id: eventId,
        user_data: {
          em: email ? [sha256(email)] : undefined,
          client_ip_address: clientIp,
          client_user_agent: headers.get('user-agent') || undefined,
          fbp: cookies?._fbp,
          fbc: cookies?._fbc,
        },
      },
    ],
    test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
  };

  const res = await fetch(
    `https://graph.facebook.com/v24.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(JSON.parse(JSON.stringify(payload))),
    }
  );

  const json = await res.json();
  if (!res.ok) {
    console.error('META CAPI erro:', json);
  } else {
    console.log('META CAPI ok:', json);
  }
}

function formatTimeTo12Hour(timeStr) {
  const [hourStr, minuteStr] = timeStr.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minuteStr} ${ampm}`;
}

export async function POST(req) {
  try {
    const { date, time, method, email, username, locale } = await req.json();

    if (!date || !time || !method || !email || !username) {
      return NextResponse.json(
        { message: 'Missing appointment confirmation fields' },
        { status: 400 }
      );
    }

    const appointmentDate = new Date(`${date}T12:00:00`);
    const formattedDateUS = `${String(appointmentDate.getMonth() + 1).padStart(2, '0')}/${String(appointmentDate.getDate()).padStart(2, '0')}/${appointmentDate.getFullYear()}`;
    const formattedTime12h = formatTimeTo12Hour(time);
    const lang = ['en', 'es', 'ht'].includes(locale) ? locale : 'en';

    const appointmentMethodText = {
      'face-to-face': {
        en: 'Face-to-Face Office Meeting',
        es: 'Reunion presencial en la oficina',
        ht: 'Reyinyon an peson nan biwo',
      },
      phone: {
        en: 'Appointment by Phone',
        es: 'Cita por telefono',
        ht: 'Randevou pa telefon',
      },
      virtual: {
        en: 'Virtual Meeting via Google Meet',
        es: 'Reunion virtual por Google Meet',
        ht: 'Reyinyon vityel sou Google Meet',
      },
    };

    const messages = {
      en: {
        subject: 'Appointment Confirmation',
        greeting: `Hello ${username},`,
        body: `Your appointment is confirmed for <strong>${formattedDateUS}</strong> at <strong>${formattedTime12h}</strong> via <strong>${appointmentMethodText[method][lang]}</strong>.`,
        closing: 'Your H4H Partners',
      },
      es: {
        subject: 'Confirmacion de Cita',
        greeting: `Hola ${username},`,
        body: `Su cita esta confirmada para el <strong>${formattedDateUS}</strong> a las <strong>${formattedTime12h}</strong> via <strong>${appointmentMethodText[method][lang]}</strong>.`,
        closing: 'Sus socios de H4H',
      },
      ht: {
        subject: 'Konfimasyon Randevou',
        greeting: `Bonjou ${username},`,
        body: `Randevou ou konfime pou <strong>${formattedDateUS}</strong> a <strong>${formattedTime12h}</strong> atravè <strong>${appointmentMethodText[method][lang]}</strong>.`,
        closing: 'Patne ou yo nan H4H',
      },
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"H4H Insurance" <info@h4hinsurance.com>',
      to: email,
      subject: messages[lang].subject,
      html: `
        <p>${messages[lang].greeting}</p>
        <p>${messages[lang].body}</p>
        <p>Thank you for reaching out to us. We look forward to connecting with you soon.</p>
        <p>${messages[lang].closing}</p>
        <p>(786) 397-7167 or (844) 544-0663</p>
      `,
    });

    await transporter.sendMail({
      from: '"H4H Insurance Website" <info@h4hinsurance.com>',
      to: [
        'gainam@h4hinsurance.com',
        'gaellem@h4hinsurance.com',
        'riccardo.joseph@h4hinsurance.com',
      ],
      subject: 'A new appointment was scheduled on H4HInsurance website',
      html: `
        <p><strong>New Appointment Scheduled</strong></p>
        <p><strong>Name:</strong> ${username}<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Date:</strong> ${formattedDateUS}<br/>
        <strong>Time:</strong> ${formattedTime12h}<br/>
        <strong>Method:</strong> ${appointmentMethodText[method][lang]}</p>
        <p>Please follow up with the client accordingly.</p>
      `,
    });

    const eventId = crypto.randomUUID();
    await sendMetaCapiEvent({
      req,
      eventName: 'Schedule',
      email,
      eventId,
    });

    return NextResponse.json(
      { message: 'Appointment confirmed and emails sent', meta_event_id: eventId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending appointment confirmation:', error);
    return NextResponse.json(
      { message: 'Failed to send appointment confirmation', error: error.message },
      { status: 500 }
    );
  }
}
