import { NextApiRequest, NextApiResponse } from 'next';
import { verifySignature } from '@upstash/qstash/nextjs';
import { prisma } from '@utils/libs/Prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
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
      let playerMoney = 0;

      const { money, citizenid } = data[index];
      const { bank, cash } = JSON.parse(money);

      playerMoney += Math.round(bank + cash)

      playerData.push({
        citizenid: citizenid,
        money: playerMoney
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

export default verifySignature(handler);;

export const config = {
  api: {
    bodyParser: false,
  },
};