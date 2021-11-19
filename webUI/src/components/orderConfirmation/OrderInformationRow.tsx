type InformationRow = {
  label: string;
  value: string;
};

export const OrderInformationRow = ({ label, value }: InformationRow) => {
  return (
    <div>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};
