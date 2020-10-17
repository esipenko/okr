import { ConflictException } from '@nestjs/common';

export class EmailAlreadyExistsError extends ConflictException {
    constructor() {
        super('Email already exists');
    }
}
