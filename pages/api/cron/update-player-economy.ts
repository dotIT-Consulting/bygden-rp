import { NextApiRequest, NextApiResponse } from 'next';
import { verifySignature } from '@upstash/qstash/nextjs';
import { prisma } from '@utils/libs/Prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const data = await prisma.players.findMany({
      select: {
        money: true,
        citizenid: true,
      }
    })

    const playerData = [];
    for (const index in data) {
      const { money, citizenid } = data[index];
      const { bank, cash } = JSON.parse(money);

      playerData.push({
        citizenid: citizenid,
        money: (bank + cash),
        cash: cash,
        bank: bank
      })
    }

    await prisma.stats_player_money.createMany({
      data: playerData,
      skipDuplicates: true
    })

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect();
  }

  return res.status(500).json({
    error: 'Failed to update players economy stats'
  });
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};