import React, { useState, useEffect } from "react";
import Newheader from '../../directives/newheader';;
import { Container, Row, Col, Button } from "react-bootstrap";
import banner from "../../assets/images/banner/banner.png";
import Avatar1 from "../../assets/images/icon/Avatar1.svg";
import Avatar2 from "../../assets/images/icon/Avatar2.png";
import Avatar3 from "../../assets/images/icon/Avatar3.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../directives/footer";
import { BASE_URL } from "../../Constant/Index";
import { Toaster, toast } from "react-hot-toast";
import moment from "moment/moment";
import axios from "axios";
import loadinggif from "../../assets/images/video/loading.gif";

function Serviceaddpet() {
  const { id } = useParams();
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
  console.log("storedUserId: ", storedUserId);
  console.log("customer_id: ", customer_id);
  // ----------------------------------------
  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };
  console.log("image", image);
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
    console.log("petData", petData);
    axios
      .post(`${BASE_URL}/auth/pets_add`, petData)
      .then((response) => {
        setResponseMessage(response.data.message);
        console.log("pet add....", petData);
        navigate(`/service-date/${id}`);
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
  return (
    <>
      <Toaster />
      <Newheader />
      {loading ? (
        <div className="text-center text-black mb-4">
        <img src={loadinggif} alt=""/>
        <h5>Please Wait.......</h5>
      </div>
      ) : (
        <>
        <Container fluid className="p-0">
        <div className="all-bg">
          <img src={banner} />
        </div>
      </Container>
      <section className="section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="add-upload-area">
                <form>
                  <div className="form-group add-upload">
                    <label htmlFor="exampleFormControlFile1">
                      Upload image
                      <i class="fa fa-upload" />
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      onChange={(e) => setimage(e.target.files[0])}
                    />
                  </div>
                  <div className="selected-image">
                    {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Selected Image"
                        // style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    )}
                  </div>
                  <div className="needplace">

                    {/* {selectedCategory && (
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
                  )} */}

                    <div className="form-group">
                      <label>Pet type</label>
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
                      <label>Gender</label>
                      <ul className="nav nav-pills mb-3" role="tablist">
                        <li className="nav-item">
                          <a
                            className={`nav-link ${gender === "Male" ? "active" : "inactive"
                              }`}
                            onClick={() => handleGenderChange("Male")}
                          >
                            Male
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${gender === "Female" ? "active" : "inactive  "
                              }`}
                            onClick={() => handleGenderChange("Female")}
                          >
                            Female
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="form-group">
                      <label>Breed</label>
                      <select
                        className="form-control"
                        value={breeds}
                        onChange={(e) => setbreeds(e.target.value)}
                      >
                        <option>Choose....</option>
                        {selectbreed &&
                          selectbreed.map((item) => (
                            <option key={item.id}>{item.name}</option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>DOB</label>
                      <input
                        className="form-control"
                        placeholder="DOB"
                        type="date"
                        onChange={handleDateChange}
                        value={selectedDate.toISOString().slice(0, 10)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <ul className="nav nav-pills mb-3" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="pill"
                            role="tab"
                            aria-selected="true"
                          >
                            Year {years}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="pill"
                            role="tab"
                            aria-selected="true"
                          >
                            Month {months}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="form-group">
                      <label>Pet Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pet Name"
                        value={pet_name}
                        onChange={(e) => setpet_name(e.target.value)}
                      />
                    </div>
                    <div className="add-petbtn">
                      <Button onClick={handlePetsadd}>Add Pet</Button>
                    </div>

                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
        </>
      )}
      

      <Footer />
    </>
  );
}

export default Serviceaddpet;
