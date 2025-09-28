import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../../../lib/db';
import { User } from '../../../../models/user.model';

interface JwtPayloadSub extends jwt.JwtPayload { sub?: string; role?: string }

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('access_token')?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 200 });

    let payload: JwtPayloadSub;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadSub;
    } catch {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    await connectToDatabase();
    const user = await User.findById(payload.sub).lean();
    if (!user) return NextResponse.json({ user: null }, { status: 200 });

    return NextResponse.json({
      user: { userId: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
