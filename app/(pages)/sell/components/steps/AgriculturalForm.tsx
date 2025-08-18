import { AgriculturalI } from "@/app/utils/forms_utils";

type Props = {
  data: AgriculturalI;
  onChange: (field: keyof AgriculturalI, value: unknown) => void;
};

export default function AgriStep({
  agriForm,
  setAgriForm,
  prevStep,
  nextStep,
}: {
  agriForm: AgriculturalI;
  setAgriForm: React.Dispatch<React.SetStateAction<AgriculturalI>>;
  prevStep: () => void;
  nextStep: () => void;
}) {
  return (
    <div className="space-y-4">
      {/* Area */}
      <div className="flex gap-2">
        <input
          className="w-1/2 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Area Value"
          value={(agriForm.area)?.value ?? ""}
          onChange={(e) =>
            setAgriForm({
              ...agriForm,
              area: { ...(agriForm.area), value: e.target.value },
            })
          }
        />
        <input
          className="w-1/2 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Area Unit"
          value={(agriForm.area)?.unit ?? ""}
          onChange={(e) =>
            setAgriForm({
              ...agriForm,
              area: { ...(agriForm.area), unit: e.target.value },
            })
          }
        />
      </div>

      {/* Dimensions */}
      <div className="flex gap-2">
        <input
          className="w-1/3 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Length"
          value={(agriForm.dimensions)?.length ?? ""}
          onChange={(e) =>
            setAgriForm({
              ...agriForm,
              dimensions: { ...(agriForm.dimensions), length: e.target.value },
            })
          }
        />
        <input
          className="w-1/3 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Width"
          value={(agriForm.dimensions)?.width ?? ""}
          onChange={(e) =>
            setAgriForm({
              ...agriForm,
              dimensions: { ...(agriForm.dimensions), width: e.target.value },
            })
          }
        />
        <input
          className="w-1/3 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Unit"
          value={(agriForm.dimensions)?.unit ?? ""}
          onChange={(e) =>
            setAgriForm({
              ...agriForm,
              dimensions: { ...(agriForm.dimensions), unit: e.target.value },
            })
          }
        />
      </div>

      {/* Strings */}
      {[
        ["Soil Type", "soilType"],
        ["Topography", "topography"],
        ["Tenure", "tenure"],
        ["Crop History", "cropHistory"],
        ["Irrigation", "irrigation"],
      ].map(([label, key]) => (
        <input
          key={key}
          className="w-full p-2 rounded bg-gray-600 text-gray-900"
          placeholder={label}
          value={agriForm[key as keyof AgriculturalI] as string}
          onChange={(e) =>
            setAgriForm({ ...agriForm, [key]: e.target.value } as AgriculturalI)
          }
        />
      ))}

      <div className="flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 bg-gray-400 rounded">Back</button>
        <button onClick={nextStep} className="px-4 py-2 bg-gray-900 text-gray-200 rounded hover:bg-gray-800">Next</button>
      </div>
    </div>
  );
}

