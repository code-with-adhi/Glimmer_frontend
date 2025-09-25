import React, { useState } from "react";
import type { InterestProfileUpdateRequest } from "../../services/apiService";
import MultiSelectChip from "./MultiSelectChip";
import TagInput from "./TagInput";

interface InterestProfileFormProps {
  onSubmit: (data: InterestProfileUpdateRequest) => void;
}

const movieGenresOptions = [
  "Action",
  "Comedy",
  "Romantic",
  "Thriller",
  "Sci-Fi",
  "Drama",
  "Kollywood Masala",
];
const musicGenresOptions = [
  "Kollywood Hits",
  "Carnatic Fusion",
  "Tamil Indie",
  "Gaana",
  "International Pop",
  "Rock",
];
const sportsOptions = ["Cricket", "Football", "Tennis", "Kabaddi"];
const hobbiesOptions = [
  "Travel",
  "Foodie",
  "Hiking",
  "Reading",
  "Gaming",
  "Photography",
  "Socializing",
];

function InterestProfileForm({ onSubmit }: InterestProfileFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<InterestProfileUpdateRequest>({
    movieGenres: [],
    favoriteMovies: [],
    musicGenres: [],
    favoriteArtists: [],
    favoriteSports: [],
    hobbies: [],
    nicheHobby: "",
  });

  const handleMultiSelect = (
    category: keyof InterestProfileUpdateRequest,
    value: string
  ) => {
    setFormData((prev) => {
      const currentValues = (prev[category] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  const handleSportsTeamChange = (sport: string, team: string) => {
    setFormData((prev) => {
      const otherSports =
        prev.favoriteSports?.filter((s) => s.sport !== sport) || [];
      const newTeamEntry = { sport, team };
      return { ...prev, favoriteSports: [...otherSports, newTeamEntry] };
    });
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const renderStep = () => {
    switch (step) {
      case 1: // Movies
        return (
          <div>
            <h3 className="step-title">What kind of movies do you enjoy?</h3>
            <div className="step-section">
              <label className="form-label">Select up to 3 genres:</label>
              <div className="chip-container">
                {movieGenresOptions.map((genre) => (
                  <MultiSelectChip
                    key={genre}
                    label={genre}
                    isSelected={formData.movieGenres?.includes(genre) || false}
                    onSelect={(label) =>
                      handleMultiSelect("movieGenres", label)
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="form-label">Name a few movies you love:</label>
              <TagInput
                tags={formData.favoriteMovies || []}
                setTags={(tags) =>
                  setFormData((prev) => ({ ...prev, favoriteMovies: tags }))
                }
                placeholder="Type a movie and press Enter..."
              />
            </div>
          </div>
        );
      case 2: // Music
        return (
          <div>
            <h3 className="step-title">What's your taste in music?</h3>
            <div className="step-section">
              <label className="form-label">Select up to 3 genres:</label>
              <div className="chip-container">
                {musicGenresOptions.map((genre) => (
                  <MultiSelectChip
                    key={genre}
                    label={genre}
                    isSelected={formData.musicGenres?.includes(genre) || false}
                    onSelect={(label) =>
                      handleMultiSelect("musicGenres", label)
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="form-label">
                Who are some artists on repeat?
              </label>
              <TagInput
                tags={formData.favoriteArtists || []}
                setTags={(tags) =>
                  setFormData((prev) => ({ ...prev, favoriteArtists: tags }))
                }
                placeholder="Type an artist and press Enter..."
              />
            </div>
          </div>
        );
      case 3: // Sports
        return (
          <div>
            <h3 className="step-title">Are you a sports fan?</h3>
            <div className="step-section">
              <label className="form-label">Which sports do you follow?</label>
              <div className="chip-container">
                {sportsOptions.map((sport) => (
                  <MultiSelectChip
                    key={sport}
                    label={sport}
                    isSelected={
                      formData.favoriteSports?.some((s) => s.sport === sport) ||
                      false
                    }
                    onSelect={(label) => {
                      const isSelected = formData.favoriteSports?.some(
                        (s) => s.sport === label
                      );
                      const newSports = isSelected
                        ? formData.favoriteSports?.filter(
                            (s) => s.sport !== label
                          )
                        : [
                            ...(formData.favoriteSports || []),
                            { sport: label, team: "" },
                          ];
                      setFormData((prev) => ({
                        ...prev,
                        favoriteSports: newSports,
                      }));
                    }}
                  />
                ))}
              </div>
            </div>
            {formData.favoriteSports?.map((sportAndTeam) => (
              <div key={sportAndTeam.sport} className="step-section">
                <label className="form-label">
                  Favorite {sportAndTeam.sport} Team?
                </label>
                <input
                  type="text"
                  value={sportAndTeam.team}
                  onChange={(e) =>
                    handleSportsTeamChange(sportAndTeam.sport, e.target.value)
                  }
                  className="text-input"
                />
              </div>
            ))}
          </div>
        );
      case 4: // Hobbies
        return (
          <div>
            <h3 className="step-title">What do you do for fun?</h3>
            <div className="step-section">
              <label className="form-label">Select up to 5 hobbies:</label>
              <div className="chip-container">
                {hobbiesOptions.map((hobby) => (
                  <MultiSelectChip
                    key={hobby}
                    label={hobby}
                    isSelected={formData.hobbies?.includes(hobby) || false}
                    onSelect={(label) => handleMultiSelect("hobbies", label)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="form-label">
                What's a niche hobby of yours?
              </label>
              <input
                type="text"
                value={formData.nicheHobby}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, nicheHobby: e.target.value }))
                }
                className="text-input"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="interest-form-container">
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {renderStep()}
      <div className="navigation-buttons">
        {step > 1 && (
          <button onClick={prevStep} className="nav-button back-button">
            Back
          </button>
        )}
        {step < 4 && (
          <button onClick={nextStep} className="nav-button next-button">
            Next
          </button>
        )}
        {step === 4 && (
          <button
            onClick={() => onSubmit(formData)}
            className="nav-button finish-button"
          >
            Finish & Find Matches
          </button>
        )}
      </div>
    </div>
  );
}
export default InterestProfileForm;
