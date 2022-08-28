import { Injectable } from '@nestjs/common';

@Injectable()
export default class DatabaseService<T extends { id: string }> {
  private array: T[] = [];

  create(element: T) {
    this.array.push(element);
    return element;
  }

  findAll() {
    return this.array;
  }

  findOne(id: string) {
    const entry = this.array.find((element) => element.id === id);
    return entry || null;
  }

  update(id: string, data: Partial<T>) {
    const element = this.findOne(id);

    if (!element) {
      return null;
    }

    Object.assign(element, data);
    return element;
  }

  delete(id: string) {
    const element = this.findOne(id);

    if (!element) {
      return null;
    }

    this.array = this.array.filter((el) => el.id !== id);
    return element;
  }
}
