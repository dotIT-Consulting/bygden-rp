import { NextApiRequest, NextApiResponse } from 'next';
import { verifySignature } from '@upstash/qstash/nextjs';
import { prisma } from '@utils/libs/Prisma';

//@ts-ignore
const parseJson = (json: any) => {
  try {
    const data = JSON.parse(json);
    return data
  } catch (error) {
    console.log(error)
  }
  return {
    bank: 0
  }
}

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
        inventory: true
      }
    })

    const playerData = [];
    for (const index in data) {
      const { money, citizenid, inventory } = data[index];

      const balance = parseJson(money);
      const { bank } = balance;

      const inv = parseJson(inventory)
      let cash = 0

      for (const index in inv) {
        const pInv = inv[index];

        if (pInv?.name === "cash") {
          cash = pInv?.amount
        }
      }

      const pMoney = Math.floor(bank + cash);
      const pCash = Math.floor(cash);
      const pBank = Math.floor(bank); 

      playerData.push({
        citizenid: citizenid,
        money: (pMoney === null) ? 0 : pMoney,
        cash: (pCash === null) ? 0 : pCash,
        bank: (pBank === null) ? 0 : pBank
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