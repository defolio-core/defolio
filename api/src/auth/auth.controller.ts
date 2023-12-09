import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/nonce')
  async generateNonce() {
    const nonceSession = await this.authService.generateNonce();
    return {
      nonceSessionId: nonceSession.id,
      nonce: nonceSession.nonce,
    };
  }

  @Post('/verify')
  async verify(
    @Body()
    {
      nonceSessionId,
      message,
      signature,
    }: {
      nonceSessionId: string;
      message: string;
      signature: string;
    },
  ) {
    return this.authService.verify(nonceSessionId, message, signature);
  }

  @Get('/me')
  async me(
    @Req() req: Request & { user: { id: string; address: string } | null },
  ) {
    return req.user;
  }
}
