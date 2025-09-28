import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/db';
import { User } from '../../../../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'dhatuchakra_secure_secret_key_for_jwt_authentication';
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dhatuchakra_secure_refresh_key_for_jwt_authentication';
    
    const accessToken = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
    const refreshToken = jwt.sign({ sub: user._id }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    const res = NextResponse.json({
      user: { userId: user._id, name: user.name, email: user.email, role: user.role },
    });
    const isProd = process.env.NODE_ENV === 'production';
    res.cookies.set('access_token', accessToken, { httpOnly: true, sameSite: 'lax', secure: isProd, path: '/' });
    res.cookies.set('refresh_token', refreshToken, { httpOnly: true, sameSite: 'lax', secure: isProd, path: '/' });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
