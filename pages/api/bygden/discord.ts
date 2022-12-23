import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(301).redirect('https://discord.gg/8gx85n5Wjs')
}

export default handler;