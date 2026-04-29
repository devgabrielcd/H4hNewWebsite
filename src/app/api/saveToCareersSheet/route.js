import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const submittedAt = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    }).format(new Date());

    // Detect content-type and parse accordingly (we expect multipart/form-data from the form)
    const contentType = req.headers.get('content-type') || '';
    let form;
    let data = {};

    if (contentType.includes('multipart/form-data')) {
      form = await req.formData();

      const t = (k) => (form.get(k) ?? '').toString().trim();
      const fname = (k) => {
        const f = form.get(k);
        return f && typeof f === 'object' && 'name' in f ? (f.name || '') : '';
      };

      data = {
        jobOpening: t('jobOpening'),
        firstName: t('firstName'),
        lastName: t('lastName'),
        email: t('email'),
        phone: t('phone'),
        address1: t('address1'),
        address2: t('address2'),
        city: t('city'),
        state: t('state'),
        zip: t('zip'),
        ssn: t('ssn'),
        npn: t('npn'),
        dob: t('dob'), // YYYY-MM-DD
        frontPhotoIdName: fname('frontPhotoId'),
        backPhotoIdName: fname('backPhotoId'),
        education: form.getAll('education').map((v) => v.toString()), // multiple checkboxes
        niprFileName: fname('nipr'),
        resumeFileName: fname('resume'),
        languages: t('languages'),
        recentEmployment: t('recentEmployment'),
        employmentStatus: t('employmentStatus'),
        felony: t('felony') || 'no',
        availableDate: t('availableDate'), // YYYY-MM-DD
        referral: t('referral'),
      };
    } else {
      // JSON fallback (caso chame via fetch com body JSON)
      data = await req.json();
      if (!Array.isArray(data.education)) {
        data.education = data.education ? [data.education] : [];
      }
    }

    const isReferralForm =
      data.formType === 'referFriend' ||
      data.referrerName ||
      data.referredName;

    if (isReferralForm) {
      const requiredFields = [
        'referrerName',
        'referrerEmail',
        'referrerPhone',
        'referredName',
        'referredEmail',
        'referredPhone',
      ];

      const missingFields = requiredFields.filter((field) => !data?.[field]);

      if (missingFields.length > 0 || !data.consent) {
        return NextResponse.json(
          {
            error: 'All referral fields are required and consent must be confirmed',
            status: 400,
          },
          { status: 400 }
        );
      }
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // --- H4H Spreadsheet ---
    const spreadsheetId = '1hCCNo_o8bk7IXva1KZt16FfTQX8m54FbQCxevjjNSt0';
    // Aba esperada: "Careers". Se a sua aba tiver outro nome, ajuste aqui.
    const range = 'Careers!A:Z';

    // Linha na mesma ordem do header recomendado:
    // Submitted At | Job Opening | First Name | Last Name | Full Name | Email | Phone | Address Line 1 | Address Line 2 | City | State | Zip | SSN | NPN | DOB | Front Photo ID | Back Photo ID | Education | NIPR Report | Résumé | Languages | Recent Employment | Employment Status | Felony | Available Date | Referral
    const values = isReferralForm
      ? [[
          submittedAt,
          'Referral Submission',
          data.referrerName || '',
          '',
          data.referrerName || '',
          data.referrerEmail || '',
          data.referrerPhone || '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          `Consent confirmed: ${data.consent ? 'yes' : 'no'}`,
          '',
          '',
          `Referred Name: ${data.referredName || ''}`,
          `Referred Email: ${data.referredEmail || ''}`,
          `Referred Phone: ${data.referredPhone || ''}`,
          'no',
          '',
          `Referral submitted by ${data.referrerName || ''}`,
        ]]
      : [[
          submittedAt,
          data.jobOpening || '',
          data.firstName || '',
          data.lastName || '',
          `${data.firstName || ''} ${data.lastName || ''}`.trim(),
          data.email || '',
          data.phone || '',
          data.address1 || '',
          data.address2 || '',
          data.city || '',
          data.state || '',
          data.zip || '',
          data.ssn || '',
          data.npn || '',
          data.dob || '',
          data.frontPhotoIdName || '',
          data.backPhotoIdName || '',
          (Array.isArray(data.education) ? data.education.join(', ') : (data.education || '')),
          data.niprFileName || '',
          data.resumeFileName || '',
          data.languages || '',
          data.recentEmployment || '',
          data.employmentStatus || '',
          data.felony || 'no',
          data.availableDate || '',
          data.referral || '',
        ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: { values },
    });

    return NextResponse.json({ message: 'Careers (H4H) saved successfully', status: 200 });
  } catch (error) {
    console.error('saveToCareersSheet (H4H) error:', error);
    return NextResponse.json({ error: error.message || String(error), status: 500 }, { status: 500 });
  }
}
