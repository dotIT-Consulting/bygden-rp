import { prisma } from "@utils/libs/Prisma";
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { interval } = req.query;
  if (req.method !== "GET") {
    return res
      .status(500)
      .json({ success: false, response: "Incorrect HTTP method" });
  }

  try {
    let dateInterval;

    switch (interval) {
      case "24h":
        dateInterval = moment().subtract(24, 'hours').toISOString()
        break;

      case "1w":
        dateInterval = moment().subtract(1, 'week').toISOString()
        break;

      case "1m":
        dateInterval = moment().subtract(1, 'month').toISOString()
        break;
    
      default:
        dateInterval = moment().subtract(24, 'hours').toISOString()
        break;
    }

    const serverStats = await prisma.stats_players_online.findMany({
      where: {
        date: {
          gte: dateInterval,
        }
      }
    })

    const timeStats = []

    for (const i in serverStats) {
      const { online, date } = serverStats[i];
      const hour = `${new Date(serverStats[i].date as Date).getHours()}:00`;

      timeStats.push({
        online,
        hour,
        date
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
    error: "Failed to fetch player stats"
  })
}

export default handler;