"use client";
import React, { useState } from "react";
import { propertyMI,HouseI,LandI,AgriculturalI } from "@/app/utils/forms_utils";
import BaseForm from "./steps/BasicForm";
import HouseStep from "./steps/HouseForm";
import LandStep from "./steps/LandForm";
import AgriStep from "./steps/AgriculturalForm";
import ReviewStep from "./steps/ReviewForm";

type Step = 1 | 2 | 3;

export default function PropertyForm() {
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [baseForm, setBaseForm] = useState<propertyMI>({
    title: "",
    description: "",
    price: 0,
    images: null,
    videos: null,
    propertyType: "",
    purpose: "",
    location: {
      country: "",
      province: "",
      district: "",
      town: "",
      colony: "",
      address: "",
    },
  });

  // Step 2 - House
  const [houseForm, setHouseForm] = useState<HouseI>({
    area: { unit: "", value: "" },
    dimensions: { unit: "", width: "", length: "" },
    bedrooms: 0,
    bathrooms: 0,
    kitchen: 0,
    floors: 0,
    parking: false,
    servantRoom: false,
    lawn: false,
    furnished: false,
    yearBuilt: "",
  });

  // Step 2 - Land
  const [landForm, setLandForm] = useState<LandI>({
    area: { unit: "", value: "" },
    dimensions: { unit: "", width: "", length: "" },
    isDeveloped: false,
    accessRoad: false,
    zoning: "",
  });

  // Step 2 - Agricultural
  const [agriForm, setAgriForm] = useState<AgriculturalI>({
    area: { unit: "", value: "" },
    dimensions: { unit: "", width: "", length: "" },
    soilType: "",
    topography: "",
    tenure: "",
    cropHistory: "",
    irrigation: "",
  });

  // Step Navigation
  const nextStep = () => setStep((s) => (s < 3 ? (s + 1) as Step : s));
  const prevStep = () => setStep((s) => (s > 1 ? (s - 1) as Step : s));

  const handleSubmit = () => {
    let finalData;
    if (baseForm.propertyType === "house") {
      finalData = { ...baseForm, ...houseForm };
    } else if (baseForm.propertyType === "land") {
      finalData = { ...baseForm, ...landForm };
    } else if (baseForm.propertyType === "agricultural") {
      finalData = { ...baseForm, ...agriForm };
    }
    console.log("Final Payload:", finalData);
    handleSubmit()

    // TODO: send finalData to backend API
  };

  return (
    <div className="w-3/4 min-h-120 h-max bg-gray-500 rounded-2xl p-6 shadow-lg text-gray-900">
      <h2 className="text-2xl font-semibold mb-4">Property Listing</h2>
      <p className="mb-6">Step {step} of 3</p>

      {step === 1 && (
        <BaseForm baseForm={baseForm} setBaseForm={setBaseForm} nextStep={nextStep} />
      )}

      {step === 2 && baseForm.propertyType === "house" && (
        <HouseStep houseForm={houseForm} setHouseForm={setHouseForm} prevStep={prevStep} nextStep={nextStep} />
      )}

      {step === 2 && baseForm.propertyType === "land" && (
        <LandStep landForm={landForm} setLandForm={setLandForm} prevStep={prevStep} nextStep={nextStep} />
      )}

      {step === 2 && baseForm.propertyType === "agricultural" && (
        <AgriStep agriForm={agriForm} setAgriForm={setAgriForm} prevStep={prevStep} nextStep={nextStep} />
      )}

      {step === 3 && (
        <ReviewStep
          baseForm={baseForm}
          houseForm={houseForm}
          landForm={landForm}
          agriForm={agriForm}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
