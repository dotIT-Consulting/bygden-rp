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
}

interface INavData {
    logoImage: {
        url: string;
    };
    title: string;
    buttonLinks: ILinkButton[]
}

export type {
    IPageMeta,
    ILayoutProps,
    ILinkButton,
    INavData
}