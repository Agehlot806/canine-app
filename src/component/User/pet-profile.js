import React, { useState, useEffect } from "react";
import Newheader from "../../directives/newheader";
import { Container, Row, Col, Button } from "react-bootstrap";
import banner from "../../assets/images/banner/banner.png";
import Avatar1 from "../../assets/images/icon/Avatar1.svg";
import Avatar2 from "../../assets/images/icon/Avatar2.png";
import Avatar3 from "../../assets/images/icon/Avatar3.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../directives/footer";
import { BASE_URL } from "../../Constant/Index";
import { Toaster, toast } from "react-hot-toast";
import moment from "moment/moment";
import axios from "axios";
import { stringes } from "../../utils";
import strings from "../language";
import loadinggif from "../../assets/images/video/loading.gif";

function Petprofile() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectbreed, setselectbreed] = useState([]);
  const [pets_type, setpets_type] = useState("");
  const [gender, setGender] = useState("");
  const [breeds, setbreeds] = useState("");
  const [dob, setdob] = useState("");
  const [age, setage] = useState("");
  const [pet_name, setpet_name] = useState("");
  const [image, setimage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([categoriesProduct(), AllselectBreed()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const categoriesProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const jsonData = await response.json();
      setCategories(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const AllselectBreed = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/breed/1`);
      const jsonData = await response.json();
      setselectbreed(jsonData.data);
      console.log("breed", jsonData.state);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // storedUserId
  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  // =----------------------------

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };
  const handlePetsadd = (event) => {
    event.preventDefault();
    const petData = new FormData();
    petData.append("user_id", storedUserId);
    petData.append(
      "pets_type",
      selectedCategory?.name ? selectedCategory?.name : ""
    );
    petData.append("gender", gender);
    petData.append("breeds", breeds);
    petData.append("dob", moment(dob).format("DD-MM-YYYY"));
    petData.append("age", `${years} years ${months} months`);
    petData.append("pet_name", pet_name);
    petData.append("image", image);
    axios
      .post(`${BASE_URL}/auth/pets_add`, petData)
      .then((response) => {
        setResponseMessage(response.data.message);
        toast.success("Your Pet Successfully Add");
      })
      .catch((error) => {
        toast.error("Field is required");
      });
  };

  const calculateAge = (selectedDate) => {
    setdob(selectedDate);
    const now = new Date();
    let years = now.getFullYear() - selectedDate.getFullYear();
    let months = now.getMonth() - selectedDate.getMonth();
    if (now.getDate() < selectedDate.getDate()) {
      months--; // Subtract a month if the current day is before the selected day
    }
    if (months < 0) {
      years--; // Subtract a year if the current month is before the selected month
      months += 12;
    }
    setYears(years);
    setMonths(months);
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setSelectedDate(selectedDate);
    calculateAge(selectedDate);
  };

  const [imagedata, setImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };
  return (
    <>
      <Toaster />
      <Newheader />
      {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>
      ) : (
        <>
          <Container fluid className="p-0">
            <div className="all-bg">
              <img src={banner} />
            </div>
          </Container>
          <section className="section-padding">
            <Container>
              <div className="add-upload-area">
                <form>
                  {/* <div className="form-group add-upload">
                <label htmlFor="exampleFormControlFile1">
                  {strings.uploadImage}
                  <i class="fa fa-upload" />
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  onChange={(e) => setimage(e.target.files[0])}
                />
              </div> */}
                  <div className="form-group add-upload">
                    <label htmlFor="exampleFormControlFile1">
                      {imagedata ? imagedata.name : 'Choose File'}
                      <i className="fa fa-upload" />
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      onChange={handleFileChange}
                      onInput={(e) => setimage(e.target.files[0])}
                    />
                  </div>
                  <div className="needplace">
                    <Row>
                      {selectedCategory && (
                        <div className="selectedCategory">
                          <h2>Avatar</h2>
                          <img
                            src={
                              "https://canine.hirectjob.in//storage/app/public/category/" +
                              selectedCategory.image
                            }
                            alt={selectedCategory.name}
                          />
                        </div>
                      )}
                    </Row>
                    <Row>
                      <Col lg={10}>
                        <div className="form-group">
                          <label>{strings.petType}</label>
                          <ul className="nav nav-pills mb-3" role="tablist">
                            {categories &&
                              categories.map((item) => (
                                <li className="nav-item" key={item.id}>
                                  <a
                                    className="nav-link"
                                    data-toggle="pill"
                                    role="tab"
                                    aria-selected="true"
                                    onClick={() => setSelectedCategory(item)}
                                    onInput={(e) => setpets_type(e.target.value)}
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="form-group">
                          <label>{strings.gender}</label>
                          <ul className="nav nav-pills mb-3" role="tablist">
                            <li className="nav-item">
                              <a
                                className={`nav-link ${gender === "Male" ? "active" : "inactive"
                                  }`}
                                onClick={() => handleGenderChange("Male")}
                              >
                                {strings.male}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className={`nav-link ${gender === "Female" ? "active" : "inactive  "
                                  }`}
                                onClick={() => handleGenderChange("Female")}
                              >
                                {strings.female}
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="form-group">
                          <label>{strings.breed}</label>
                          <select
                            className="form-control"
                            value={breeds}
                            onChange={(e) => setbreeds(e.target.value)}
                          >
                            {/* <option>{strings.choose}</option> */}
                            <option value="" disabled selected>{strings.choose}</option>
                            {selectbreed &&
                              selectbreed.map((item) => (
                                <option key={item.id}>{item.name}</option>
                              ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>{strings.dob}</label>
                          <input
                            className="form-control"
                            placeholder="DOB"
                            type="date"
                            onChange={handleDateChange}
                            value={selectedDate.toISOString().slice(0, 10)}
                          />
                        </div>
                        <div className="form-group">
                          <label>{strings.age}</label>
                          <ul className="nav nav-pills mb-3" role="tablist">
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                data-toggle="pill"
                                role="tab"
                                aria-selected="true"
                              >
                                {strings.year} {years} {strings.month} {months}
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="form-group">
                          <label>{strings.petName}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Pet Name"
                            value={pet_name}
                            onChange={(e) => setpet_name(e.target.value)}
                            onKeyPress={(e) => {
                              // Check if the pressed key is a character (letter)
                              if (!/^[a-zA-Z ]+$/.test(e.key)) {
                                e.preventDefault(); // Prevent input of non-character values
                              }
                            }}
                          />
                        </div>
                        <div className="add-petbtn">
                          <Button onClick={handlePetsadd}>{stringes.addPet}</Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </form>
              </div>
            </Container>
          </section>
        </>
      )}
      <Footer />
    </>
  );
}

export default Petprofile;
