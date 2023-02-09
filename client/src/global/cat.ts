export interface CatBreed {
  id: number;
  name: string;
  images: Array<string>;
  temperament: Array<string>;
  origin: string;
  life_span: string;
  wikipedia_url: string;
  description: string;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  weight: {
    metric: string;
  };
  country_code: string;
  hypoallergenic: number;
  vocalisation: number;
}
