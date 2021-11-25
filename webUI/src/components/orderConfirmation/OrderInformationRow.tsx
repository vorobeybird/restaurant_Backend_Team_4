type InformationRow = {
  label: JSX.IntrinsicElements[keyof JSX.IntrinsicElements] | string;
  value: string;
};

export const OrderInformationRow = ({ label, value }: InformationRow) => {
  return (
    <div className="order-info__fields">
      <div className="order-info__fields__label">{label}</div>
      <div className="order-info__fields__value">{value}</div>
    </div>
  );
};
