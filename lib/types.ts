export interface iPerson {
  name: string;
  email?: string;
  role?: string;
  imageUrl?: StaticImageData;
  bio?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

export interface iNavLink {
  name: string;
  href: string;
  current?: boolean;
}
