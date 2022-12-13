import { TablerIcon, TablerIconProps } from "@tabler/icons";
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

export type {
  IPageMeta,
  ILayoutProps,
  ILinkButton,
  INavData,
  ITablerIcons,
  IHomeData
}