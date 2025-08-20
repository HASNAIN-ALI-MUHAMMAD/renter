import { propertyMI,LandI,HouseI,AgriculturalI } from "@/app/(pages)/(utils)/utils/forms_utils";

interface ReviewFormProps {
  formData:propertyMI | LandI | HouseI |AgriculturalI;
  onBack: () => void;
}

export default function ReviewStep({
  baseForm,
  houseForm,
  landForm,
  agriForm,
  prevStep,
  handleSubmit,
}: {
  baseForm: propertyMI;
  houseForm: HouseI;
  landForm: LandI;
  agriForm: AgriculturalI;
  prevStep: () => void;
  handleSubmit: () => void;
}) {
  const categoryData =
    baseForm.propertyType === "house"
      ? houseForm
      : baseForm.propertyType === "land"
      ? landForm
      : agriForm;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Review Your Listing</h3>
      <pre className="bg-gray-600 p-4 rounded text-gray-200 text-sm overflow-auto">
        {JSON.stringify({ ...baseForm, ...categoryData }, null, 2)}
      </pre>
      <div className="flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 bg-gray-400 rounded">Back</button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600">Submit</button>
      </div>
    </div>
  );
}

