import { IconType } from "react-icons";

const PaymenWay = ({
  method,
  setMethod,
  way,
  des,
  icon: Icon,
  title
}: {
  method: string | null;
  setMethod: (str: "vodafone" | "card" | null) => void;
  way: "vodafone" | "card";
  des: string;
  icon: IconType;
  title: string
}) => {
  // Check if THIS specific button is the active one
  const isActive = method === way;

  return (
    <button
      onClick={() => setMethod(way)}
      type="button"
      className={`w-full flex items-center justify-between p-5 rounded-[2rem] border-2 transition-all duration-300 ${
        isActive 
          ? "border-[#0066FF] bg-blue-50/40 shadow-sm" 
          : "border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50/50"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Icon Container */}
        <div
          className={`p-3 rounded-2xl transition-colors duration-300 ${
            isActive ? "bg-[#0066FF] text-white" : "bg-slate-100 text-slate-400"
          }`}
        >
          <Icon size={22} />
        </div>

        {/* Text Section */}
        <div className="text-right">
          <p className={`font-black text-sm transition-colors ${isActive ? "text-[#0066FF]" : "text-slate-800"}`}>
            {title}
          </p>
          <p className="text-[11px] font-bold text-slate-400 mt-0.5">
            {des}
          </p>
        </div>
      </div>

      {/* Custom Radio Indicator */}
      <div
        className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${
          isActive ? "border-[#0066FF] bg-white" : "border-slate-200 bg-white"
        }`}
      >
        <div className={`size-3 rounded-full transition-transform duration-300 ${
          isActive ? "bg-[#0066FF] scale-100" : "bg-transparent scale-0"
        }`} />
      </div>
    </button>
  );
};

export default PaymenWay;