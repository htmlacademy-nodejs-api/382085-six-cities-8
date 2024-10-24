export type JsonServerData = {
  offerTypes: string[];
  comforts: string[];
  titles: string[];
  descriptions: string[];
  offerImages: string[];
  cities:
    {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    }
  }[];
  locations:
    {
    latitude: number;
    longitude: number;
    zoom: number;
  }[];
  users: string[];
  emails: string[];
  avatarImages: string[];
  offer: Record<string, unknown>;
  offers: Record<string, unknown>;
}
