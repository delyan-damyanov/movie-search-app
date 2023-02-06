import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Rating } from 'types';

@Schema()
export class MovieDetails {
  @Prop()
  Title!: string;

  @Prop()
  Year!: string;

  @Prop()
  Rated!: string;

  @Prop()
  Runtime!: string;

  @Prop()
  Genre!: string;

  @Prop()
  Director!: string;

  @Prop()
  Writer!: string;

  @Prop()
  Actors!: string;

  @Prop()
  Plot!: string;

  @Prop()
  Language!: string;

  @Prop()
  Country!: string;

  @Prop()
  Awards!: string;

  @Prop()
  Poster!: string;

  @Prop()
  Ratings!: Rating[];

  @Prop()
  Metascore!: string;

  @Prop()
  imdbRating!: string;

  @Prop()
  imdbVotes!: string;

  @Prop()
  imdbID!: string;

  @Prop()
  Type!: string;

  @Prop()
  DVD!: string;

  @Prop()
  BoxOffice!: string;

  @Prop()
  Production!: string;

  @Prop()
  Website!: string;

  @Prop()
  Response!: string;
}

const MovieDetailsSchema = SchemaFactory.createForClass(MovieDetails);
MovieDetailsSchema.index({ imdbID: 'text' });

export { MovieDetailsSchema };
