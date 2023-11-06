import { Rule } from 'src/users/entitie/user';

export abstract class SingDTO {
  userId: number;
  userName: string;
  password: string;
  rule: Rule;
}

export abstract class ResponseAuth {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNjA2MTk4OC8yMDIzIiwibmFtZSI6IkZhZ25lcnNhbnRpYWdvIiwiaWF0IjoxNTE2MjM5MDIyfQ.veeXlc4DXkkgw6v6LllSU9iGaVf3fIbM1HkqxTRnbMc';
}
