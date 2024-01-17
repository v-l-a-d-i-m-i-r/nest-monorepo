import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  public async sendUserCreatedEmail(input: UserCreatedEmailInput): Promise<void> {
    const { name, email, createdAt } = input;

    console.log('******');
    console.log(`User with name: ${name} and email: ${email} created at ${createdAt}`);
    console.log('******');
  }

  public async sendUserDeletedEmail(input: UserDeletedEmailInput): Promise<void> {
    const { name, email, deletedAt } = input;

    console.log('******');
    console.log(`User with name: ${name} and email: ${email} deleted at ${deletedAt}`);
    console.log('******');
  }
}

type UserCreatedEmailInput = {
  name: string;
  email: string;
  createdAt: string;
};

type UserDeletedEmailInput = {
  name: string;
  email: string;
  deletedAt: string;
};
