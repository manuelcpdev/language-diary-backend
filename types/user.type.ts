type User = {
    id: string,
    name: string,
    password: string,
    role: 'user' | 'admin'
}

type CreateUser = Omit<User, 'id'>

type LoginUser = Pick<User, 'name' | 'password'>