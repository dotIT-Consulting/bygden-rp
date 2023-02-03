import { TablerIconProps } from "@tabler/icons";
import type { NextApiRequest, NextApiResponse } from "next";
import { ReactNode } from "react";

interface IPageMeta {
  title: string;
  description: string;
  cardImage: string;
}

interface ILayoutProps {
  children: ReactNode;
  meta?: IPageMeta;
}

interface ILinkButton {
  label: string;
  linkUrl: string;
  buttonIcon?: string;
  buttonStyle?: "outline" | "white" | "default" | "gradient" | "filled" | "light" | "subtle" | undefined;
}

interface INavData {
  logoImage?: {
    url?: string;
  };
  title: string;
  buttonLinks: ILinkButton[]
}

interface IHomeData {
  home: {
    logoImage?: {
      url: string
    },
    backgroundVideo: {
      url: string;
    },
    title: string;
    subtitle: string;
    buttonLinks: ILinkButton[]
  }
  navbar: INavData
}

type ITablerIcons = TablerIconProps & {
  type: string | undefined;
}

interface ISteamResponse {
  provider: string,
  _json: {
    steamid: string,
    communityvisibilitystate: number,
    profilestate: number,
    personaname: string,
    profileurl: string,
    avatar: string,
    avatarmedium: string,
    avatarfull: string,
    avatarhash: string,
    lastlogoff: number,
    personastate: number,
    primaryclanid: string,
    timecreated: number,
    personastateflags: number,
    loccountrycode: string
  },
  id: string,
  displayName: string,
  photos: any[],
  hex_id: string | undefined,
  hex_id_format: string | undefined,
  fivemLicense: string | undefined,
  fivemLicenseFormat: string | undefined,
  staff?: {
    allowed: boolean,
    role: 'ROOT' | 'ADMIN' | 'MOD'
  }
}

interface ISteamProps {
  steam: {
    user: ISteamResponse
  }
}

interface IGetServerSideProps {
  req: NextApiRequest & {
    user: ISteamResponse
  }
  res: NextApiResponse
}

interface IServerListPlayer {
  endpoint: string,
  id: number,
  identifiers: string[],
  name: string,
  ping: number
}

interface ICharacterResponse {
  id: number,
  citizenid: string,
  cid: number,
  license: string,
  name: string,
  money: string,
  charinfo: string,
  job: string,
  gang: string,
  position: string,
  metadata: string,
  inventory: string,
  last_updated: string,
  phone_number: number | null,
  iban: number | null,
  pincode: number | null,
  crafting_level: number,
  credits: number,
  tasks: string,
  tasks_completed: string,
  winnings: string
}

export type {
  IPageMeta,
  ILayoutProps,
  ILinkButton,
  INavData,
  ITablerIcons,
  IHomeData,
  ISteamResponse,
  IGetServerSideProps,
  ISteamProps,
  IServerListPlayer,
  ICharacterResponse
}