import RegisterSteps from "../UserLogin/Register/RegisterSteps/RegisterSteps.jsx";
import { useState } from "react";
import GeneralDetailsEvent from "../CreateEvent/GeneralDetailsEvent/GeneralDetailsEvent.jsx";
import DescriptionAndRules from "../CreateEvent/DescriptionAndRules/DescriptionAndRules.jsx";
import RegisterNext from "../UserLogin/Register/RegisterNext/RegisterNext.jsx";
import { v4 as uuidv4 } from "uuid";
import GroupSettings from "./GroupSettings/GroupSettings.jsx";
import "./CreateGroup.css";
import { useNavigate } from "react-router-dom";
import { sendToBackend } from "../../Utils/helper.js";

function CreateGroup({ closeCreateGroup, userUuid }) {
  const steps = ["General Details", "Description  and Rules", "Settings"];
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const createGroup = async () => {
    console.log("start");
    if (isSubmitting) return;
    console.log("nie");

    if (generalDetailsEvent.groupName === "" || generalDetailsEvent === "") {
      alert("fill inputs");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    console.log(languages);
    const isPublic = generalDetailsEvent.visibility !== "Private";
    const formattedActivities = activities.map((activity) => ({
      name: activity.label,
    }));

    const formattedLanguages = languages.map((language) => ({
      name: language.value,
    }));

    const scope = groupSettings.scope === "None" ? null : groupSettings.scope;

    const groupUuid = uuidv4();
    const GroupDTO = {
      uuid: groupUuid,
      name: generalDetailsEvent.eventName,
      description: descriptionAndRules.description,
      isPublic: isPublic,
      ...(scope && { locationScope: { name: scope.value, id: 0 } }),
      dateOfCreation: new Date().toISOString(),
      numberOfMembers: 1,
      ...(groupSettings.groupLocation && {
        locationLongitude: groupSettings.groupLocation[0].position[1],
      }),
      ...(groupSettings.groupLocation && {
        locationLatitude: groupSettings.groupLocation[0].position[0],
      }),
      owner: {
        uuid: userUuid,
      },
      activities: formattedActivities,
      languages: formattedLanguages,
    };

    console.log(GroupDTO);
    formData.append(
      "groupDTO",
      new Blob([JSON.stringify(GroupDTO)], { type: "application/json" })
    );

    if (generalDetailsEvent.eventImageFile) {
      formData.append("icon", generalDetailsEvent.eventImageFile);
    }

    const endpoint = "groups";
    console.log(GroupDTO);

    try {
      const data = await sendToBackend(endpoint, "POST", formData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
    closeCreateGroup();
    navigate("/groups");
  };

  const [generalDetailsEvent, setGeneralDetailsEvent] = useState({
    eventName: "",
    visibility: "",
    eventImage: null,
    imageName: null,
    eventImagev2: null,
    eventImageFile: null,
  });

  const [descriptionAndRules, setDescriptionAndRules] = useState({
    description: "",
    rules: "",
  });

  const [groupSettings, setgroupSettings] = useState({
    groupLocation: null,
    scope: "None",
  });

  const [activities, setActivities] = useState([]);
  const [languages, setLanguages] = useState([]);

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <GeneralDetailsEvent
            data={generalDetailsEvent}
            updateData={setGeneralDetailsEvent}
          />
        );
      case 2:
        return (
          <DescriptionAndRules
            data={descriptionAndRules}
            updateData={setDescriptionAndRules}
          />
        );
      case 3:
        return (
          <GroupSettings
            activieties={activities}
            updateActivieties={setActivities}
            languages={languages}
            updateLanguages={setLanguages}
            data={groupSettings}
            updateData={setgroupSettings}
          />
        );

      default:
        return (
          <GeneralDetailsEvent
            data={generalDetailsEvent}
            updateData={setGeneralDetailsEvent}
          />
        );
    }
  };
  return (
    <>
      <div className="overlay"></div>
      <div className="create-post-container create-group">
        <div className="create-post-header">
          <h2 className="create-post-title">Create a Group</h2>
          <img
            className="close-icon-post"
            src={`${process.env.PUBLIC_URL}/close.png`}
            onClick={closeCreateGroup}
            alt="Close"
          />
        </div>
        <RegisterSteps
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <div className="different-profile-info">{renderStepComponent()}</div>
        <RegisterNext
          step={currentStep}
          signIn={true}
          setCurrentStep={setCurrentStep}
          maxStep={3}
          createEvent={createGroup}
        />
      </div>
    </>
  );
}
export default CreateGroup;
