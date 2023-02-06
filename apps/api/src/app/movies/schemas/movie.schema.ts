import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Movie {
  @Prop()
  Title!: string;

  @Prop()
  Year!: string;

  @Prop()
  imdbID!: string;

  @Prop()
  Type!: string;

  @Prop()
  Poster!: string;
}

const MovieSchema = SchemaFactory.createForClass(Movie);
MovieSchema.index({ Title: 'text' });

export { MovieSchema };
