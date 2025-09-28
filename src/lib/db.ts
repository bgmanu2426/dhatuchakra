import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not set in environment variables');
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

let cached = global.mongooseConn;
if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached!.conn) return cached!.conn;
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGO_URI, {});
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
