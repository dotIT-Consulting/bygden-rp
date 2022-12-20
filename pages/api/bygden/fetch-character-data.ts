import { prisma } from "@utils/libs/Prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { citizenid } = req.query;
  if (req.method !== "GET" || !citizenid) {
    return res
      .status(500)
      .json({ success: false, response: "Incorrect HTTP method or missing Citizen ID" });
  }

  try {
    const character = await prisma.players.findFirst({
      select: {
        money: true,
        charinfo: true,
        job: true,
        gang: true,
        metadata: true,
        inventory: true,
        last_updated: true,

      },
      where: {
        citizenid: citizenid as string
      }
    })

    const vehicles = await prisma.player_vehicles.findMany({
      select: {
        vehicle: true,
        plate: true,
        garage: true,
        fuel: true,
        engine: true,
        body: true,
        damages: true
      },
      where: {
        citizenid: citizenid as string
      }
    })

    const houses = await prisma.loaf_properties.findMany({
      select: {
        shell: true
      },
      where: {
        owner: citizenid as string
      }
    })

    const response = {...character, vehicles, houses}

    return res.status(200).send({
      character: response ?? [],
    });
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect();
  }

  return res.status(500).json({
    error: "Failed to fetch character info"
  })
}

export default handler;