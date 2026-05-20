function SellerCard({ title, icon, amount, description }) {
  return (
    <div className="flex flex-col gap-3 p-5 w-full bg-white border border-amber-100 rounded-xl shadow-md ">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {title}
        </h4>
        {icon}
      </div>

      <div className="text-3xl font-bold text-gray-900 leading-none">
        {amount}
      </div>
      <div className={`text-xs font-medium ${description.color}`}>
        {description.text}
      </div>
    </div>
  );
}

export default SellerCard;
