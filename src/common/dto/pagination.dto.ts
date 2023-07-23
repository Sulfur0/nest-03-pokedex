import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  // constructor(limit, offset) {
  //   this.limit = limit;
  //   this.offset = offset;
  // }
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;
}
