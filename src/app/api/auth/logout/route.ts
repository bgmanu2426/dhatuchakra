import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/db';
import { User } from '../../../../models/user.model';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST() {
  try {
    const cookieStore = cookies();
    const refresh = cookieStore.get('refresh_token')?.value;

    if (refresh) {
      try {
        const decoded = jwt.decode(refresh) as { sub?: string } | null;
        if (decoded?.sub) {
          await connectToDatabase();
          await User.updateOne({ _id: decoded.sub }, { $set: { accessToken: null, refreshToken: null } });
        }
      } catch {}
    }

    const res = NextResponse.json({ success: true });
    const opts = { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' } as const;
    res.cookies.set('access_token', '', { ...opts, maxAge: 0 });
    res.cookies.set('refresh_token', '', { ...opts, maxAge: 0 });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
