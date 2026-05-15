import * as jose from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'a_very_secret_key_change_me_in_production',
);

export async function createToken(payload: any) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
