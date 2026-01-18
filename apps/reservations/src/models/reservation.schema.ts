import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema({ versionKey: false })
@ObjectType()
export class ReservationDocument extends AbstractDocument {
  @Field()
  @Prop()
  timestamp: Date;

  @Field()
  @Prop()
  startDate: Date;

  @Field()
  @Prop()
  endDate: Date;

  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  invoiceId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
