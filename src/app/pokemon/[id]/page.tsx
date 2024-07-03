import { Pokemon } from "@/app/_types/pokemon.type";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface ParamsProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const id = params.id;

  // fetch data
  const product = await fetch(`http://localhost:3000/api/pokemons/${id}`).then(
    (res) => res.json()
  );

  return {
    title: product.korean_name || product.name,
  };
}

const PokemonDetail = async ({ params }: ParamsProps) => {
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/pokemons/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: Pokemon = await res.json();

  return (
    <div>
      <Link href="/">Back to List</Link>
      <div>
        <h1>{data.korean_name || data.name}</h1>
        <Image
          src={data.sprites.front_default}
          alt={data.name}
          width={96}
          height={96}
        />
        <p>Height: {data.height}</p>
        <p>Weight: {data.weight}</p>
        <h2>Types</h2>
        <ul>
          {data.types.map((type: any) => (
            <li key={type.type.name}>
              {type.type.korean_name || type.type.name}
            </li>
          ))}
        </ul>
        <h2>Abilities</h2>
        <ul>
          {data.abilities.map((ability: any) => (
            <li key={ability.ability.name}>
              {ability.ability.korean_name || ability.ability.name}
            </li>
          ))}
        </ul>
        <h2>Moves</h2>
        <ul>
          {data.moves.map((move: any) => (
            <li key={move.move.name}>
              {move.move.korean_name || move.move.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
