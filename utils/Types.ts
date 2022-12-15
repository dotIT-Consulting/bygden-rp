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
  navData: INavData;
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
  hex_id_format: string | undefined
}

interface IGetServerSideProps {
  req: NextApiRequest & {
    user: ISteamResponse
  }
  res: NextApiResponse
}

export type {
  IPageMeta,
  ILayoutProps,
  ILinkButton,
  INavData,
  ITablerIcons,
  IHomeData,
  IGetServerSideProps
}