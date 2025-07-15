type Character = {
  id: string;
  image: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  }
  location: {
    name: string;
    url: string;
  }
  episode: Array<{
    id: string;
    name: string;
    air_date: string;
  }>;
}
export type { Character }
