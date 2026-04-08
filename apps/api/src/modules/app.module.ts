import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { TasksModule } from './tasks/tasks.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ReferralsModule } from './referrals/referrals.module';
import { MembershipsModule } from './memberships/memberships.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { DepositsModule } from './deposits/deposits.module';
import { FraudModule } from './fraud/fraud.module';
import { OfferwallsModule } from './offerwalls/offerwalls.module';
import { SupportModule } from './support/support.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CmsModule } from './cms/cms.module';
import { AdminModule } from './admin/admin.module';
import { SettingsModule } from './settings/settings.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UsersModule,
    WalletsModule,
    TasksModule,
    CampaignsModule,
    ReferralsModule,
    MembershipsModule,
    WithdrawalsModule,
    DepositsModule,
    FraudModule,
    OfferwallsModule,
    SupportModule,
    NotificationsModule,
    CmsModule,
    AdminModule,
    SettingsModule,
  ],
})
export class AppModule {}
