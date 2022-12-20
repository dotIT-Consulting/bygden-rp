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
    const characters = await prisma.players.findMany({
      select: {
        citizenid: true,
        charinfo: true
      },
      where: {
        license: license as string
      }
    })

    return res.status(200).send({
      characters: characters ?? [],
    });
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect();
  }

  return res.status(500).json({
    error: "Failed to fetch characters info"
  })
}

export default handler;