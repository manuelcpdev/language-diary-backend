import { SignJWT, jwtVerify, jwtDecrypt } from 'jose';

class JWTService {
    secret = process.env.JWT_SECRET;
    secretRefresh = process.env.JWT_REFRESH_SECRET

    constructor() {
        if (!this.secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!this.secretRefresh) {
            throw new Error('JWT_REFRESH_SECRET is not defined');
        }

        this.secret = new TextEncoder().encode(this.secret);
        this.secretRefresh = new TextEncoder().encode(this.secretRefresh)
    }
    
    validate = async (token, secretType = 'access') => {
        const secret = secretType == 'access' ? this.secret : this.secretRefresh;
        try {
            const result = await jwtVerify(token, secret)
            console.log(result)
            return {
                valid: true,
                payload: result.payload
            };
        } catch (error) {
            const errorObj = {
                error: error.message
            }
            return {
                valid: false,
                error: error.message
            };
        }
    }

    generateToken = async (data, expiration='15m', secretType='access') => {
        const secret = secretType == 'access' ? this.secret : this.secretRefresh;
        const token = await new SignJWT(data)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(expiration)
            .sign(secret);
        return token;
    }

    decryptToken = async (token, secretType='access') => {
        const secret = secretType == 'access' ? this.secret : this.secretRefresh;
        const decrypted = await jwtVerify(token, secret);
        return decrypted;
    }
}

export const jwtService = new JWTService();