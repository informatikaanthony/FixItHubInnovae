import { User } from "./AuthUser.model";

export interface AuthToken {
    access_token: string;
    token_type: string;
    expires_at: Date | null;
    user: User;
  }