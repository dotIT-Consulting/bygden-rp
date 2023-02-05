import { prisma } from "@utils/libs/Prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res
      .status(500)
      .json({ success: false, response: "Incorrect HTTP method" });
  }

  try {
		const data = await prisma.site_admins.findMany({
			select: {
				name: true,
        license: true,
        steam_id: true,
        role: true,
        added_date: true,
        added_by: true,
			}
    })

    return res.status(200).json(data)
	
	} catch(error) {
		console.log(error)
	} finally {
		await prisma.$disconnect();
	}

  return res.status(500).json({
    success: false,
    message: "Failed to fetch user role."
  })
}

export default handler;