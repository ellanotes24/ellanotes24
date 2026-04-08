import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.membershipPlan.createMany({
    data: [
      { key: 'free', name: 'Free', price: 0, durationDays: 30, benefits: { earningMultiplier: 1 } },
      { key: 'bronze', name: 'Bronze', price: 9, durationDays: 30, benefits: { earningMultiplier: 1.1 } },
      { key: 'gold', name: 'Gold', price: 29, durationDays: 30, benefits: { earningMultiplier: 1.5 } },
      { key: 'vip', name: 'VIP', price: 99, durationDays: 30, benefits: { earningMultiplier: 2 } },
    ],
    skipDuplicates: true,
  });

  await prisma.taskType.createMany({
    data: [
      { key: 'SURF', name: 'Website Surf', enabled: true, requiresProof: false },
      { key: 'VISIT', name: 'Website Visit Campaign', enabled: true, requiresProof: false },
      { key: 'YOUTUBE_LIKE', name: 'YouTube Like', enabled: true, requiresProof: true },
      { key: 'TWITTER_FOLLOW', name: 'X Follow', enabled: true, requiresProof: true },
    ],
    skipDuplicates: true,
  });
}

main().finally(async () => prisma.$disconnect());
