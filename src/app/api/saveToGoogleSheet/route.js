import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const requiredFields = [
      'zipCode',
      'coverageType',
      'insuranceCoverage',
      'householdIncome',
      'firstName',
      'lastName',
      'dob',
      'address',
      'city',
      'state',
      'email',
      'phone',
    ];

    const missingFields = requiredFields.filter((field) => !body?.[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const dateTime = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    }).format(new Date());
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1hCCNo_o8bk7IXva1KZt16FfTQX8m54FbQCxevjjNSt0';
    const range = 'Sheet2!A:M';
    const values = [[
      body.zipCode,
      body.coverageType,
      body.insuranceCoverage,
      body.householdIncome,
      body.firstName,
      body.lastName,
      body.dob,
      body.address,
      dateTime,
      body.city,
      body.state,
      body.email,
      body.phone,
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values,
      },
    });

    return NextResponse.json({
      message: 'Data saved to Google Sheets successfully',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed to save data to Google Sheets',
      },
      { status: 500 }
    );
  }
}
