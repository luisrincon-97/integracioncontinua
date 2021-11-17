import { IsArray, IsDateString, IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateGameDto {

  @IsNotEmpty()
  title: string;

  @IsDefined()
  @IsNumber()
  price: number;

  @IsArray()
  tags: string[];

  @IsDateString()
  releaseDate: Date;

  @IsDefined()
  @IsNumber()
  publisherId: number

  constructor(title: string, price: number, tags: string[], releaseDate: Date) {
    this.title = title;
    this.price = price;
    this.tags = tags;
    this.releaseDate = releaseDate;
  }
}
