import { HouseI } from "@/app/(pages)/(utils)/utils/forms_utils";


export default function HouseStep({
  houseForm,
  setHouseForm,
  prevStep,
  nextStep,
}: {
  houseForm: HouseI;
  setHouseForm: React.Dispatch<React.SetStateAction<HouseI>>;
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
          value={houseForm.area.value}
          onChange={(e) =>
            setHouseForm({ ...houseForm, area: { ...houseForm.area, value: e.target.value } })
          }
        />
        <input
          className="w-1/2 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Area Unit (sq ft, sq m)"
          value={houseForm.area.unit}
          onChange={(e) =>
            setHouseForm({ ...houseForm, area: { ...houseForm.area, unit: e.target.value } })
          }
        />
      </div>

      {/* Dimensions */}
      <div className="flex gap-2">
        <input
          className="w-1/3 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Length"
          value={houseForm.dimensions.length}
          onChange={(e) =>
            setHouseForm({ ...houseForm, dimensions: { ...houseForm.dimensions, length: e.target.value } })
          }
        />
        <input
          className="w-1/3 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Width"
          value={houseForm.dimensions.width}
          onChange={(e) =>
            setHouseForm({ ...houseForm, dimensions: { ...houseForm.dimensions, width: e.target.value } })
          }
        />
        <input
          className="w-1/3 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Unit (ft, m)"
          value={houseForm.dimensions.unit}
          onChange={(e) =>
            setHouseForm({ ...houseForm, dimensions: { ...houseForm.dimensions, unit: e.target.value } })
          }
        />
      </div>

      {/* Numeric Inputs */}
      {[
        ["Bedrooms", "bedrooms"],
        ["Bathrooms", "bathrooms"],
        ["Kitchen", "kitchen"],
        ["Floors", "floors"],
      ].map(([label, key]) => (
        <input
          key={key}
          type="number"
          className="w-full p-2 rounded bg-gray-600 text-gray-900"
          placeholder={label}
          value={houseForm[key as keyof HouseI] as number}
          onChange={(e) =>
            setHouseForm({ ...houseForm, [key]: Number(e.target.value) } as HouseI)
          }
        />
      ))}

      {/* Boolean Checkboxes */}
      {[
        ["Parking", "parking"],
        ["Servant Room", "servantRoom"],
        ["Lawn", "lawn"],
        ["Furnished", "furnished"],
      ].map(([label, key]) => (
        <label key={key} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={houseForm[key as keyof HouseI] as boolean}
            onChange={(e) =>
              setHouseForm({ ...houseForm, [key]: e.target.checked } as HouseI)
            }
          />
          {label}
        </label>
      ))}

      {/* Year Built */}
      <input
        className="w-full p-2 rounded bg-gray-600 text-gray-900"
        placeholder="Year Built"
        value={houseForm.yearBuilt}
        onChange={(e) => setHouseForm({ ...houseForm, yearBuilt: e.target.value })}
      />

      <div className="flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 bg-gray-400 rounded">Back</button>
        <button onClick={nextStep} className="px-4 py-2 bg-gray-900 text-gray-200 rounded hover:bg-gray-800">Next</button>
      </div>
    </div>
  );
}
