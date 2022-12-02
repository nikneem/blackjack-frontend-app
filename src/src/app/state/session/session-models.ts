export interface ISessionCreateDto {
  userId: string;
  name: string;
}
export interface ISessionJoinDto {
  userId: string;
  code: string;
}

export interface ISessionDetailsDto {
  id: string;
  name: string;
  code: string;
  isOwner: boolean;
}
