import { prisma } from "@utils/libs/Prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { steam } = req.query;
  if (req.method !== "GET" || !steam) {
    return res
      .status(500)
      .json({ success: false, response: "Incorrect HTTP method or missing Steam ID" });
  }

  try {
		const data = await prisma.site_admins.findFirst({
      where: {
        steam_id: steam as string
      },
			select: {
				role: true
			}
    })

    const num = await prisma.site_admins.count()

    return res.status(200).json({
      allowed: data?.role ? true : false,
      role: data?.role,
      numStaff: num
    })
	
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