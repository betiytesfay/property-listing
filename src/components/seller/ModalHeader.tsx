type ModalHeaderProps = {
  title: string;
  subtitle?: string;
};

export function ModalHeader({ title, subtitle }: ModalHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
