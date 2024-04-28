import { cn } from "@/lib/utils";

type Props = {
  passStrength: number;
};

const PassworStrength = ({ passStrength }: Props) => {
  return (
    <div className="flex col-span-2 gap-2 ">
      {Array.from({
        length: passStrength + 1,
      }).map((i, index) => (
        <div
          key={index}
          className={cn("h-2 w-20 rounded-md", {
            "bg-red-500": passStrength === 0,
            "bg-orange-500": passStrength === 1,
            "bg-yellow-500": passStrength === 2,
            "bg-green-500": passStrength === 3,
          })}
        ></div>
      ))}
    </div>
  );
};

export default PassworStrength;
