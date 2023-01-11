import { prisma } from "@utils/libs/Prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { steam } = req.query;
  if (req.method !== "GET" || !steam) {
    return res
      .status(500)
      .json({ success: false, response: "Incorrect HTTP method or missing Steam ID" });
  }

  const steamId = <string> steam;

  try {
		const data = await prisma.players.findFirst({
      where: {
        steamid: steamId
      },
			select: {
				license: true
			}
    })

		const unformated = data?.license.replace('license:', '')
		
    return res.status(200).json({
      formated: data?.license ?? null,
      unformated: unformated ?? null
    })
	} catch(error) {
		console.log(error)
	} finally {
		await prisma.$disconnect();
	}

  return res.status(500).json({
    success: false,
    message: "Failed to fetch FiveM license."
  })
}

export default handler;