import { randomUUID } from 'node:crypto';

interface Props {
  userId?: string;
  userName: string;
  password: string;
  role?: string;
}

export class User {
  private _userId: string;
  protected userName: string;
  protected password: string;
  protected role: string;

  get userId() {
    return this._userId;
  }

  protected constructor({ userId, userName, password, role }: Props) {
    this._userId = userId ?? randomUUID();
    this.userName = userName;
    this.password = password;
    this.role = role ?? 'user';
  }
}
