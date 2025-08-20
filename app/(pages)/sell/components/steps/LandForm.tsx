import { LandI} from "@/app/(pages)/(utils)/utils/forms_utils";

type Props = {
  data: LandI;
  onChange: (field: keyof LandI, value: unknown) => void;
};

export default function LandStep({
  landForm,
  setLandForm,
  prevStep,
  nextStep,
}: {
  landForm: LandI;
  setLandForm: React.Dispatch<React.SetStateAction<LandI>>;
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
          value={landForm.area?.value ?? ""}
          onChange={(e) =>
            setLandForm({
              ...landForm,
              area: { ...(landForm.area), value: e.target.value },
            })
          }
        />
        <input
          className="w-1/2 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Area Unit"
          value={landForm.area?.unit ?? ""}
          onChange={(e) =>
            setLandForm({
              ...landForm,
              area: { ...(landForm.area), unit: e.target.value },
            })
          }
        />
      </div>

      {/* Dimensions */}
      <div className="flex gap-2">
        <input
          className="w-1/3 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Length"
          value={landForm.dimensions?.length ?? ""}
          onChange={(e) =>
            setLandForm({
              ...landForm,
              dimensions: { ...(landForm.dimensions), length: e.target.value },
            })
          }
        />
        <input
          className="w-1/3 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Width"
          value={landForm.dimensions?.width ?? ""}
          onChange={(e) =>
            setLandForm({
              ...landForm,
              dimensions: { ...(landForm.dimensions), width: e.target.value },
            })
          }
        />
        <input
          className="w-1/3 p-2 rounded bg-gray-600 text-gray-900"
          placeholder="Unit"
          value={landForm.dimensions?.unit ?? ""}
          onChange={(e) =>
            setLandForm({
              ...landForm,
              dimensions: { ...(landForm.dimensions), unit: e.target.value },
            })
          }
        />
      </div>

      {/* Checkboxes */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={landForm.isDeveloped}
          onChange={(e) => setLandForm({ ...landForm, isDeveloped: e.target.checked })}
        />
        Developed Land
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={landForm.accessRoad}
          onChange={(e) => setLandForm({ ...landForm, accessRoad: e.target.checked })}
        />
        Has Access Road
      </label>

      <input
        className="w-full p-2 rounded bg-gray-600 text-gray-900"
        placeholder="Zoning Type"
        value={landForm.zoning}
        onChange={(e) => setLandForm({ ...landForm, zoning: e.target.value })}
      />

      <div className="flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 bg-gray-400 rounded">Back</button>
        <button onClick={nextStep} className="px-4 py-2 bg-gray-900 text-gray-200 rounded hover:bg-gray-800">Next</button>
      </div>
    </div>
  );
}
