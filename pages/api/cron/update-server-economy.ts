import { NextApiRequest, NextApiResponse } from 'next';
import { verifySignature } from '@upstash/qstash/nextjs';
import { prisma } from '@utils/libs/Prisma';
import JSONBig from 'json-bigint';

const parseJson = (json: any) => {
  try {
    const data = JSONBig.parse(json);
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
        inventory: true
      }
    })

    let serverEconomy = 0;
    
    for (const index in data) {
      const { money, inventory } = data[index];

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

      serverEconomy += Math.floor(bank + cash);
    }


    await prisma.stats_server_money.create({
      data: {
        money: serverEconomy
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