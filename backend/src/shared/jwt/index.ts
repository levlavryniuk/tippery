export type JwtPayload = {
  sub: string;
};

export type TokenPair = {
  access_token: string;
  refresh_token: string;
};
