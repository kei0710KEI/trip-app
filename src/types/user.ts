export interface UserToken {
  email: string;
  tokens: number;
  lastUpdated: {
    seconds: number;
    nanoseconds: number;
  };
}
