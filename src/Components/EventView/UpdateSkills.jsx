import React from 'react';
import Skills from "../UserLogin/Register/Skills";
import './UpdateSkill.css';

function UpdateSkill({ activieties, languages, closeUpdateSkills, updateActivities, saveChanges }) {
  
  // Funkcja do aktualizowania ratingu w aktywnościach
  const handleUpdateActivities = (updatedActivities) => {
    // Przekazanie zaktualizowanych danych do rodzica
    updateActivities(updatedActivities);
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="update-skills">
        <div className="change-map-upper">
          <span className='info-container-tittle-edit'>Manage Activities</span>
          <img
            className="chat-options"
            src={`${process.env.PUBLIC_URL}/close.png`}
            alt="Minimize"
            onClick={closeUpdateSkills}
          />
        </div>

        <div>
          {/* Przekazujemy dane do komponentu Skills */}
          <Skills
            activieties={activieties}
            languages={languages}
            updateActivieties={handleUpdateActivities} // Funkcja do zaktualizowania aktywności
            onlyUpdate={true} // Tylko aktualizacja (bez dodawania nowych aktywności)
          />
          
          <div className="button-map-change">
            <button
              className="finish-button"
              onClick={saveChanges} // Zapisz zmiany po kliknięciu "Finish"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateSkill;
