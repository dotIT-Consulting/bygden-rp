import { prisma } from "@utils/libs/Prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const parseJSON = (json: any, vehicle = false) => {
  let jsonData = {}
  let vehData = []

  if (vehicle) {
    for (const key in json) {
      let vehicleData = json[key]

      if (typeof vehicleData.mods === 'string') {
        vehicleData.mods = JSON.parse(vehicleData.mods)
      }

      vehData.push(vehicleData)
    }
  
    return vehData
  }
  
  for (const key in json) {
    try {
      const parsed = JSON.parse(json[key])
      //@ts-ignore
      jsonData[key] = parsed
    } catch (error) {
      console.error(error)
    }
  }

  return jsonData
}

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
        damages: true,
        mods: true,
        state: true
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

    const parsedCharacter = parseJSON(character)

    const parsedVehicle = parseJSON(vehicles, true)

    return res.status(200).send({
      character_info: parsedCharacter,
      vehicles: parsedVehicle,
      houses: houses
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