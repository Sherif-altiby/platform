import { usePaymentStore } from "@/store/PaymentStore";

const PaymentHeader = ({title, price}: {title: string, price: string}) => {

  const course = usePaymentStore(s => s.courseToPay)

  return (
    <div className="bg-slate-900 p-4 text-white">
      <p className="text-blue-400 text-xs font-bold mb-1 uppercase tracking-widest">
        ملخص الطلب
      </p>
      <h1 className="text-lg font-semibold ">{title}</h1>
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/10">
        <span className="text-slate-400  font-medium">إجمالي المبلغ:</span>
        <span className="text-xl font-black text-white">
          {price} <span className="text-sm font-medium">ج.م</span>
        </span>
      </div>
    </div>
  );
};

export default PaymentHeader;
