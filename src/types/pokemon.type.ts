export type Pokemon = {
  id: string;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

export type Name = {
  language: { name: string; url: string };
  name: string;
};

export type Type = {
  slot: number;
  type: { name: string; url: string };
};

export type Ability = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
};

export type Move = {
  move: { name: string; url: string };
  version_group_details: [[]];
};
