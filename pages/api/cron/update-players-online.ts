import { NextApiRequest, NextApiResponse } from 'next';
import { verifySignature } from '@upstash/qstash/nextjs';
import { prisma } from '@utils/libs/Prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const raw = await fetch(`http://${process.env.FIVEM_SERVER_IP}/players.json`)
    const online = await raw.json();

    await prisma.stats_players_online.create({
      data: {
        online: online.length ?? 0
      }
    })

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect();
  }

  return res.status(500).json({
    error: 'Failed to update players online stats'
  });
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};