import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/db';
import { User } from '../../../../models/user.model';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await connectToDatabase();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    return NextResponse.json({
      user: { userId: user._id, name: user.name, email: user.email, role: user.role },
    }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
