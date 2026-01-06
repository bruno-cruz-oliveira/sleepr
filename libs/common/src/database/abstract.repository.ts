import { Logger, NotFoundException } from '@nestjs/common';
import { Model, Types, QueryFilter } from 'mongoose';
import { UpdateFilter } from 'mongodb';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON() as TDocument;
  }

  async findOne(filter: QueryFilter<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filter).lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filter', filter);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filter: QueryFilter<TDocument>,
    update: UpdateFilter<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filter, update, { new: true })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filter', filter);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async find(filterQuery: QueryFilter<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndDelete(filter: QueryFilter<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filter)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filter', filter);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }
}
