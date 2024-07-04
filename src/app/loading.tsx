import Image from "next/image";
import monsterball from "../../public/monsterball.png";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-5">
      <Image
        src={monsterball}
        alt="monster ball"
        width={150}
        height={150}
        className="spin"
        priority={true}
      />
      <p className="text-center text-xl font-bold">로딩 중...</p>
    </div>
  );
};

export default Loading;
