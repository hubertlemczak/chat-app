import { Command, Handler, Registry, Depot } from 'depot-command-bus';

import dbClient from '../utils/dbClient';

export type TCreateMessage = {
  content: string;
  userId: string;
  conversationId: string;
};

export class CreateMessage implements Command {
  private _content: string;
  private _conversationId: string;
  private _userId: string;

  constructor({ content, userId, conversationId }: TCreateMessage) {
    this._content = content;
    this._conversationId = conversationId;
    this._userId = userId;
  }

  get content(): string {
    return this._content;
  }
  get conversationId(): string {
    return this._conversationId;
  }
  get userId(): string {
    return this._userId;
  }

  getName(): string {
    return 'CreateMessage';
  }
}

class CreateMessageHandler implements Handler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(command: CreateMessage): Promise<any> {
    const newMessage = await dbClient.message.create({
      data: {
        content: command.content,
        conversationId: command.conversationId,
        userId: command.userId,
      },
      include: {
        user: true,
      },
    });

    return newMessage;
  }
}

const registry = new Registry([['CreateMessage', new CreateMessageHandler()]]);

export const messagesCmdBus = new Depot(registry);
