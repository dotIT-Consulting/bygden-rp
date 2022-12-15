import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res
			.status(500)
			.json({ success: false, response: "Incorrect HTTP method" });
	}

  const raw = await fetch(`http://${process.env.FIVEM_SERVER_IP}/players.json`)
  const data = await raw.json();

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
  return res.status(200).send(data);
}

export default handler;