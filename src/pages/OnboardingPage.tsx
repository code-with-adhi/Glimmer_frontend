import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateInterestProfile,
  updateQuestionnaire,
} from "../services/apiService";
import type {
  InterestProfileUpdateRequest,
  QuestionnaireUpdateRequest,
} from "../services/apiService";
import InterestProfileForm from "../components/onboarding/InterestProfileForm";
import Questionnaire from "../components/onboarding/Questionnaire";

function OnboardingPage() {
  const [step, setStep] = useState(1); // 1 for Interests, 2 for Questionnaire
  const navigate = useNavigate();

  const handleInterestSubmit = async (data: InterestProfileUpdateRequest) => {
    try {
      await updateInterestProfile(data);
      alert("Your interests have been saved! Now for the fun part.");
      setStep(2); // Move to the questionnaire
    } catch (error) {
      console.error("Failed to save interests:", error);
      alert("There was an error saving your interests. Please try again.");
    }
  };

  const handleQuestionnaireComplete = async (
    data: QuestionnaireUpdateRequest
  ) => {
    try {
      await updateQuestionnaire(data);
      alert("All done! Your profile is complete. Let's find some matches.");
      navigate("/"); // Go to the discovery feed
    } catch (error) {
      console.error("Failed to save questionnaire answers:", error);
      alert("There was an error saving your answers. Please try again.");
    }
  };

  const handleSkipQuestionnaire = () => {
    alert("No problem! You can complete this later from your profile.");
    navigate("/"); // Go to the discovery feed
  };

  return (
    <div className="onboarding-page-container">
      <h1 className="onboarding-title">Welcome to Glimmer!</h1>
      {step === 1 && (
        <>
          <p className="onboarding-subtitle">Part 1: Tell us what you love.</p>
          <InterestProfileForm onSubmit={handleInterestSubmit} />
        </>
      )}
      {step === 2 && (
        <>
          <p className="onboarding-subtitle">
            Part 2: Answer a few questions for the best matches.
          </p>
          <Questionnaire
            onComplete={handleQuestionnaireComplete}
            onSkip={handleSkipQuestionnaire}
          />
        </>
      )}
    </div>
  );
}
export default OnboardingPage;
