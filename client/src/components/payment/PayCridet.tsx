import { CiCreditCard1 } from "react-icons/ci";

const PayCridet = () => {
  return (
    <div className="text-center py-10 space-y-6">
      <div className="w-20 h-20 bg-blue-50 text-[#0066FF] rounded-full flex items-center justify-center mx-auto animate-pulse">
        <CiCreditCard1 size={40} />
      </div>
      <p className="text-slate-600 font-bold tracking-wide">
        جاري توجيهك لبوابة الدفع الآمنة...
      </p>
      <div className="h-1.5 w-48 bg-slate-100 rounded-full mx-auto overflow-hidden">
        <div className="h-full bg-[#0066FF] w-1/2 animate-[loading_1.5s_infinite_linear]"></div>
      </div>
    </div>
  );
};

export default PayCridet;
