export interface CreateRequestDto {
  name: string;
  desription?: string;
}

export interface UpdateRequestDto {
  name?: string;
  description?: string;
}
