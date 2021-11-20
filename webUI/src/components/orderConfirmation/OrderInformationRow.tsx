type InformationRow = {
  label: string;
  value: string;
};

export const OrderInformationRow = ({ label, value }: InformationRow) => {
  return (
    <div className="order-type__fields">
      <div className="order-type__fields__label">{label}</div>
      <div className="order-type__fields__value">{value}</div>
    </div>
  );
};
