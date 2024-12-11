import React, { useState, useEffect } from "react";
import "./ProfileInfoSettings.css";
import PhoneInput from "../../../UserLogin/Register/PhoneInput/PhoneInput";

function ProfileInfoSettings({ user, onSave }) {
  console.log(user.phone);
  const [data, setData] = useState({
    name: "",
    surname: "",
    nickname: "",
    gender: "",
    dateOfBirth: "",
    telephone: "",
    coutryCode: "",
    countryCode: "",
    country: "",
    description: "",
    weight: "",
    height: "",
  });

  const [profileImage, setProfileImage] = useState(
    user.profilePictureUrl || ""
  );
  const [file, setFile] = useState(null);
  const [profileImageName, setProfileImageName] = useState(
    user.profilePictureUrl || ""
  );

  useEffect(() => {
    const [countryCode, telephone] = user.phone.split(" ");
    setData({
      name: user.user.name || "",
      surname: user.user.surname || "",
      nickname: user.nickname || "",
      gender: user.user.gender || "",
      dateOfBirth: user.user.dateOfBirth || "",
      telephone: telephone,
      countryCode: countryCode,
      country: user.user.country.name || "",
      description: user.description || "",
      height: user.user.height * 100,
      weight: user.user.weight,
    });
    setProfileImage(user.profilePictureUrl || "");
  }, [user]);

  const updateData = (newData) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        setProfileImage(reader.result);
        setFile(file);
        setProfileImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const errors = {};

    if (data.name.length < 0) {
      alert("Fill name input");
      return;
    }

    if (data.surname.length < 0) {
      alert("Fill surname input");
      return;
    }

    if (!data.countryCode || !data.telephone || !/^\d+$/.test(data.telephone)) {
      alert("Fill your telephoneNumber");
      return;
    }
    if (data.weight === "" || data.height === "") {
      alert("height  or weight cannot be empty");
      return;
    }

    const fullPhoneNumber = `${data.countryCode} ${data.telephone}`;
    const updatedProfile = {
      name: data.name,
      surname: data.surname,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      weight: data.weight,
      height: data.height / 100,
    };

    const account = {
      description: data.description,
      nickname: data.nickname,
      phone: fullPhoneNumber,
    };

    onSave(updatedProfile, account, file, profileImageName);
  };

  console.log(data);

  return (
    <div className="settings-menu stats-box profile-information-settings">
      <div className="tittle-container">
        <span className="info-container-tittle">Profile Information</span>
      </div>
      <div className="elevation"></div>
      <div className="profile-info-edit">
        <div className="change-photo-container">
          <img
            className="profile-img-change"
            src={profileImage}
            alt={data.nickname}
          />
          <div className="change-photo-buttons">
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="upload-photo" className="uplod-button">
              Upload new
            </label>
          </div>
        </div>
        <form className="general-details-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={data.name}
                onChange={(e) => updateData({ name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Surname</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={data.surname}
                onChange={(e) => updateData({ surname: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nickName">Nickname</label>
              <input
                type="text"
                id="nickName"
                name="nickName"
                placeholder="Nickname"
                value={data.nickname}
                onChange={(e) => updateData({ nickname: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Date of Birth</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={data.dateOfBirth}
                onChange={(e) => updateData({ dateOfBirth: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <div className="form-gender">
                <div className="gender-option">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="M"
                    checked={data.gender === "M"}
                    onChange={(e) => updateData({ gender: e.target.value })}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="gender-option">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="F"
                    checked={data.gender === "F"}
                    onChange={(e) => updateData({ gender: e.target.value })}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-weight-height">
                <div className="form-weight">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    step={0.1}
                    value={data.weight || ""}
                    onChange={(e) =>
                      updateData({ ...data, weight: e.target.value })
                    }
                    placeholder="Enter your weight"
                  />
                </div>
                <div className="form-weight">
                  <label htmlFor="height">Height (cm)</label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={data.height || ""}
                    onChange={(e) =>
                      updateData({ ...data, height: e.target.value })
                    }
                    placeholder="Enter your height"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Telephone</label>
              <PhoneInput data={data} updateData={updateData} />
            </div>
          </div>

          <div className="form-group-last">
            <label htmlFor="description">Profile Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              className="profile-description"
              value={data.description}
              onChange={(e) => updateData({ description: e.target.value })}
            />
          </div>
        </form>
        <div className="save-settings-container">
          <button className="trip-button save-settings" onClick={handleSave}>
            <img
              src={`${process.env.PUBLIC_URL}/create-trip.png`}
              alt="Ikona"
              className="icon"
            />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfoSettings;
