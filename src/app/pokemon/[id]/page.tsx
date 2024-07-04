// 서버 컴포넌트
import { pokemonDetailData } from "@/server/api/api.deatail";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface ParamsProps {
  params: { id: string };
}

// Metadata
export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const id = params.id;

  // fetch data
  const product = await pokemonDetailData(id);

  return {
    title: `${product.korean_name || product.name} | 상세페이지`,
  };
}

const PokemonDetail = async ({ params }: ParamsProps) => {
  const { id } = params;
  const data = await pokemonDetailData(id);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Link href="/" className="flex font-bold text-black">
        ◀ 뒤로가기
      </Link>
      <div className="flex flex-col mx-auto max-w-[700px] items-center justify-center bg-white border-2 border-gray-500 rounded-lg p-10">
        <h1 className="text-2xl font-bold">{data.korean_name || data.name}</h1>
        <Image
          src={data.sprites.front_default}
          alt={data.name}
          width={150}
          height={150}
        />
        <div className="flex flex-row gap-5">
          <p className="text-lg font-bold">키: </p>
          {data.height} m<p className="text-lg font-bold">몸무게: </p>
          {data.weight} kg
        </div>
        <div className="flex flex-row gap-3 items-center">
          <h2 className="text-lg font-bold">타입:</h2>
          <ul className="flex flex-row gap-1">
            {data.types.map((type: any) => (
              <li key={type.type.name}>
                <p className="bg-orange-400 px-1 py-0.5 rounded-md">
                  {type.type.korean_name || type.type.name}
                </p>
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-bold">특성:</h2>
          <ul className="flex flex-row gap-1">
            {data.abilities.map((ability: any) => (
              <li key={ability.ability.name}>
                <p className="bg-green-400 px-1 py-0.5 rounded-md">
                  {ability.ability.korean_name || ability.ability.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-lg font-bold mt-1">스킬: </h2>
        <ul className="flex flex-row gap-2 flex-wrap">
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
