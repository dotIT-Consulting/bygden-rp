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
        money: true
      }
    })

    let serverEconomy = 0;
    
    for (const index in data) {
      const { money } = data[index]
      const { bank, cash } = JSON.parse(money)
      const playerMoney = bank + cash
      serverEconomy += playerMoney
    }

    const rounded = Math.round(serverEconomy)

    await prisma.stats_server_money.create({
      data: {
        money: rounded
      }
    })

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect();
  }

  return res.status(500).json({
    error: 'Failed to update server economy stats'
  });
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};