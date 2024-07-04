import { ValidType } from "@/components/common/TypeChip/TypeChip";
import { PropsWithChildren } from "react";

type TypeBgColorProps = {
  type: ValidType;
};

const typeGradientClasses: Record<ValidType, string> = {
  노말: "bg-gradient-to-t from-gray-200 via-gray-200 to-gray-500",
  격투: "bg-gradient-to-t from-brown-200 via-brown-200 to-brown-500",
  비행: "bg-gradient-to-t from-sky-200 via-sky-200 to-sky-500",
  독: "bg-gradient-to-t from-purple-200 via-purple-200 to-purple-500",
  땅: "bg-gradient-to-t from-yellow-200 via-yellow-200 to-yellow-500",
  바위: "bg-gradient-to-t from-brown-200 via-brown-200 to-brown-500",
  벌레: "bg-gradient-to-t from-green-200 via-green-200 to-green-500",
  고스트: "bg-gradient-to-t from-purple-200 via-purple-200 to-purple-500",
  강철: "bg-gradient-to-t from-gray-200 via-gray-200 to-gray-500",
  불꽃: "bg-gradient-to-t from-red-200 via-red-200 to-red-500",
  물: "bg-gradient-to-t from-blue-200 via-blue-200 to-blue-500",
  풀: "bg-gradient-to-t from-green-200 via-green-200 to-green-500",
  전기: "bg-gradient-to-t from-yellow-200 via-yellow-200 to-yellow-500",
  에스퍼: "bg-gradient-to-t from-pink-200 via-pink-200 to-pink-500",
  얼음: "bg-gradient-to-t from-cyan-200 via-cyan-200 to-cyan-500",
  드래곤: "bg-gradient-to-t from-indigo-200 via-indigo-200 to-indigo-500",
  악: "bg-gradient-to-t from-gray-200 via-gray-200 to-gray-500",
  페어리: "bg-gradient-to-t from-pink-200 via-pink-200 to-pink-500",
  없음: "bg-gradient-to-t from-gray-200 via-gray-200 to-gray-500",
  스텔라: "bg-gradient-to-t from-gray-200 via-gray-200 to-gray-500",
};

function TypeBgColor({ type, children }: PropsWithChildren<TypeBgColorProps>) {
  const gradientClass = typeGradientClasses[type];
  return (
    <div
      className={`${gradientClass} container mx-auto flex flex-col justify-center p-4 h-2/3 text-black`}
    >
      {children}
    </div>
  );
}

export default TypeBgColor;
