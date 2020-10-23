import { NotFoundException } from '@nestjs/common';

export class InvalidEmailOrPasswordError extends NotFoundException {
    constructor() {
        super('Wrong email end(or) password');
    }
}
