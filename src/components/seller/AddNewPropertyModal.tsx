"use client";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Actions } from "./Actions";
import { Input } from "./Input";
import { ModalHeader } from "./ModalHeader";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

const PROPERTY_TYPES: string[] = ["Apartment", "House", "Villa"];
const PROPERTY_STATUS: string[] = [
  "pending",
  "approved",
  "rejected",
  "sold",
  "available",
];

interface PropertyFormValues {
  name: string;
  type: string;
  status: string;
  location: string;
  price: string;
  description: string;
}

interface AddNewPropertyModalProps {
  onClose: () => void;
  onSubmit: (data: PropertyFormValues) => void;
  editData?: PropertyFormValues | null;
}

function AddNewPropertyModal({ onClose, onSubmit, editData }: AddNewPropertyModalProps) {
  const isEditMode = !!editData;

  const { register, handleSubmit, reset } = useForm<PropertyFormValues>({
    defaultValues: editData || {
      name: "",
      type: "",
      status: "",
      location: "",
      price: "",
      description: "",
    },
  });

  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

  const submitHandler: SubmitHandler<PropertyFormValues> = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
        <ModalHeader
          title={isEditMode ? "Edit Property" : "Add New Property"}
          subtitle={
            isEditMode
              ? "Update property details below."
              : "Fill in the details below to list a new property."
          }
        />
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <Input
            label="Property Name"
            {...register("name")}
            placeholder="eg. Modern Villa"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Type"
              options={PROPERTY_TYPES}
              {...register("type")}
            />
            <Select
              label="Status"
              options={PROPERTY_STATUS}
              {...register("status")}
            />
            <Input
              label="Location"
              {...register("location")}
              placeholder="eg. Bole, Addis"
            />
            <Input
              label="Price (ETB)"
              {...register("price")}
              placeholder="eg. 15,000,000"
            />
          </div>
          <Textarea
            label="Description"
            {...register("description")}
            placeholder="Property details..."
          />
          <Actions onClose={onClose} isEditMode={isEditMode} />
        </form>
      </div>
    </>
  );
}

export default AddNewPropertyModal;