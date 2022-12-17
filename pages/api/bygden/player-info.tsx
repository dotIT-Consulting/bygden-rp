import { prisma } from "@utils/libs/Prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { steam } = req.query;
  if (req.method !== "GET" || !steam) {
    return res
      .status(500)
      .json({ success: false, response: "Incorrect HTTP method or missing Steam ID" });
  }

  try {
    const characters = await prisma.players.count({
      where: {
        license: 'license:deb5e58da906e04eccfb22cf255e6d4ab58c5b42'
      }
    })

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
    return res.status(200).json({
      number: characters
    });
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect();
  }

  return res.status(500).json({
    error: 'Failed to fetch characters'
  });
}

export default handler;