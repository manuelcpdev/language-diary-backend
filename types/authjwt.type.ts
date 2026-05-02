type AuthJWT = {
    sub: string
    name?: string,
    role?: 'user' | 'admin'
}