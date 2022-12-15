export interface IPlayerDto {
  id: string;
  userId: string;
  displayName: string;
  order: number;
  isDealer: boolean;
}

export interface ICreatePlayerDto {
  sessionId: string;
  userId: string;
  displayName: string;
}
