import * as bcrypt from 'bcrypt';

export function encodingPassword(password: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, SALT);
}

export function comparingPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}