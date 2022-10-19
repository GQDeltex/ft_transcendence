import { CurrentJwtPayload } from './current-jwt-payload.decorator';
import { UserPipe } from './user-pipe.service';

export const CurrentUser = () => CurrentJwtPayload(UserPipe);
