import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASED_STRING
});

export async function GET(_request: Request) {
  try {
    const queryString = 'SELECT * FROM crashes ORDER BY created_at DESC LIMIT 1';
    const client = await pool.connect();
    const result = await client.query(queryString);
    client.release();

    return NextResponse.json({lastDate: result.rows[0].created_at});
  } catch(err: any) {
    return new Response(null, {
      status: 500,
      statusText: err.message
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const insertQuery = 'INSERT INTO crashes (created_at) VALUES ($1)';
    const { date, token } = await request.json();

    if(token !== process.env.TOKEN) throw new Error('Invalid token');

    const client = await pool.connect();

    await client.query(insertQuery, [date]);
    client.release();
    return NextResponse.json({status: "success"});
  } catch(err: any) {
    return new Response(null, {
      status: 500,
      statusText: err.message
    });
  }
}