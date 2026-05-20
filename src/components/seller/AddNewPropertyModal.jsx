import { Actions } from "./Actions";
import { Input } from "./Input";
import { ModalHeader } from "./ModalHeader";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
const PROPERTY_TYPES = ["Apartment", "House", "Villa"];
const PROPERTY_STATUS = [
  "pending",
  "approved",
  "rejected",
  "sold",
  "available",
];

function AddNewPropertyModal({ onClose }) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
        <ModalHeader />
        <form className="space-y-4">
          <Input label="Property Name" placeholder="eg...." />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Type" options={PROPERTY_TYPES} />
            <Select label="Status" options={PROPERTY_STATUS} />
            <Input label="Location" placeholder="eg...." />
            <Input label="Price (ETB)" placeholder="eg...." />
          </div>
          <Textarea label="Description" placeholder="eg...." />
          <Actions onClose={onClose} />
        </form>
      </div>
    </>
  );
}
export default AddNewPropertyModal;
