import { prisma } from "@utils/libs/Prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { license } = req.query;
  if (req.method !== "GET" || !license) {
    return res
      .status(500)
      .json({ success: false, response: "Incorrect HTTP method or missing FiveM license" });
  }

  try {
    const rawPlayers = await fetch(`http://${process.env.FIVEM_SERVER_IP}/players.json`)
    const online = await rawPlayers.json();

    const rawInfo = await fetch(`http://${process.env.FIVEM_SERVER_IP}/info.json`)
    const info = await rawInfo.json();

    const characters = await prisma.players.count({
      where: {
        license: license as string
      }
    })

    const economy = await prisma.stats_server_money.findFirst({
      select: {
        money: true,
      },
      orderBy: {
        date: 'desc'
      }
    })

    return res.status(200).send({
      online: online.length ?? 0,
      players: online ?? [],
      characters: characters ?? 0,
      economy: economy?.money ?? 0,
      max_slots: info.vars.sv_maxClients ?? 0
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