import { SignJWT, jwtVerify, jwtDecrypt } from 'jose';

class JWTService {
    secret: Uint8Array = new TextEncoder().encode(process.env.JWT_SECRET) ?? "NO_VALUE";
    secretRefresh: Uint8Array = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET) ?? "NO_VALUE"

    constructor() {
        if (!this.secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!this.secretRefresh) {
            throw new Error('JWT_REFRESH_SECRET is not defined');
        }
    }
    
    validate = async (token: string, secretType: 'access' | 'refresh') => {
        const secret = secretType == 'access' ? this.secret : this.secretRefresh;
        try {
            const result = await jwtVerify(token, secret)
            console.log(result)
            return {
                valid: true,
                payload: result.payload
            };
        } catch (error: unknown) {
            const errorObj = {
                error: error instanceof Error ? error.message : error
            }
            return {
                valid: false,
                error: error instanceof Error ? error.message : error
            };
        }
    }

    generateToken = async (data: AuthJWT, expiration='15m', secretType='access') => {
        const secret = secretType == 'access' ? this.secret : this.secretRefresh;
        const token = await new SignJWT(data)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(expiration)
            .sign(secret);
        return token;
    }

}

export const jwtService = new JWTService();