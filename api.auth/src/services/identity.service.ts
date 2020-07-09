import connection from '../common/persistence/persistence.mysql';
import { UserCreateDto } from '../dtos/user.dto';
import { ApplicationException } from '../common/exceptions/application.exception';
import SHA from 'sha.js';
import jwt from 'jsonwebtoken';

export class IdentityService {
    async authenticate(email: string, password: string): Promise<string> {
        const con = await connection;

        // Hash passowrd
        password = SHA('sha256').update(password).digest('base64');

        const [rows]: any[] = await con.execute(
            'SELECT * FROM auth_user WHERE email = ? AND password = ?',
            [email, password]
        );

        if (process.env.jwt_secret_key) {
            const secretKey: string = process.env.jwt_secret_key;

            if (rows.length) {
                return jwt.sign({
                    id: rows[0].id,
                    email: rows[0].email
                }, secretKey, { expiresIn: '7h', algorithm: 'ES256' });
            }
        } else {
            throw new Error('Secret key is not defined.');
        }

        throw new ApplicationException('Invalid user credentials supplied.');
    }

    async create(user: UserCreateDto): Promise<void> {
        const con = await connection;

        // Hash password
        user.password = SHA('sha256').update(user.password).digest('base64');

        await con.execute(
            'INSERT INTO auth_user(email, password, created_at) VALUES(?, ?, ?)',
            [user.email, user.password, new Date()]
        );
    }
}