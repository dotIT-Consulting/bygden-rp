import { prisma } from "@utils/libs/Prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { interval } = req.query;
  if (req.method !== "GET" || !interval) {
    return res
      .status(500)
      .json({ success: false, response: "Incorrect HTTP method or missing interval query" });
  }

  try {
    const lastDay = new Date(Date.now() - (24 * 60 * 60 * 1000)).toISOString();

    const serverStats = await prisma.stats_players_online.findMany({
      where: {
        date: {
          gte: lastDay,
        }
      }
    })

    const timeStats = []

    for (const i in serverStats) {
      const { online, date } = serverStats[i];
      const hour = `${new Date(serverStats[i].date as Date).getHours()}:00`;

      timeStats.push({
        online,
        hour
      })
    }

    return res.status(200).send({
      stats: timeStats
    });
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect();
  }

  return res.status(500).json({
    error: "Failed to fetch server info"
  })
}

export default handler;