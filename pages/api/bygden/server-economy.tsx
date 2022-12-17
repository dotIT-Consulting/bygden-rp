import { prisma } from "@utils/libs/Prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res
      .status(500)
      .json({ success: false, response: "Incorrect HTTP method" });
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

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
    return res.status(200).json({
      total: (serverEconomy).toLocaleString('sv-SE', {
        style: 'currency',
        currency: 'SEK',
      })
    });
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect();
  }

  return res.status(500).json({
    error: 'Failed to fetch server economy'
  });
}

export default handler;