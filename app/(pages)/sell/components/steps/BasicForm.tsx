import { propertyMI } from "@/app/(pages)/(utils)/utils/forms_utils";


export default function BaseForm({
  baseForm,
  setBaseForm,
  nextStep,
}: {
  baseForm: propertyMI;
  setBaseForm: React.Dispatch<React.SetStateAction<propertyMI>>;
  nextStep: () => void;
}) {
  return (
    <div className="space-y-4">
      <label>Title</label>
      <input
        className="w-full p-2 rounded bg-gray-600 text-gray-900"
        placeholder="Property Title"
        value={baseForm.title}
        onChange={(e) => setBaseForm({ ...baseForm, title: e.target.value })}
      />
      <label>Description</label>
      <textarea
        className="w-full p-2 rounded bg-gray-600 text-gray-900"
        placeholder="Description"
        value={baseForm.description}
        onChange={(e) => setBaseForm({ ...baseForm, description: e.target.value })}
      />
      <label>Price</label>
      <input
        type="number"
        className="w-full p-2 rounded bg-gray-600 text-gray-900"
        placeholder="Price"
        value={baseForm.price}
        onChange={(e) => setBaseForm({ ...baseForm, price: Number(e.target.value) })}
      />
      <select
        className="w-full p-2 rounded bg-gray-600 text-gray-900"
        value={baseForm.propertyType}
        onChange={(e) => setBaseForm({ ...baseForm, propertyType: e.target.value})}
      >
        <option value="">Select Property Type</option>
        <option value="house">House</option>
        <option value="land">Land</option>
        <option value="agricultural">Agricultural</option>
      </select>
      <button
        onClick={nextStep}
        className="px-4 py-2 bg-gray-900 text-gray-200 rounded hover:bg-gray-800"
      >
        Next
      </button>
    </div>
  );
}
