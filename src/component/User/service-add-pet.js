import React, { useState, useEffect } from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Button } from 'react-bootstrap'
import banner from '../../assets/images/banner/banner.png'
import Avatar1 from '../../assets/images/icon/Avatar1.svg'
import Avatar2 from '../../assets/images/icon/Avatar2.png'
import Avatar3 from '../../assets/images/icon/Avatar3.png'
import { Link } from 'react-router-dom'
import Footer from '../../directives/footer'
import { BASE_URL } from '../../Constant/Index'

function Serviceaddpet() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    console.log('selectedCategory', selectedCategory);
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

    useEffect(() => {
        categoriesProduct();
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

    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
    };


    const handlePetsadd = (event) => {
        event.preventDefault();
        const pet_data = {
            pets_type: pets_type,
            gender: gender,
            breeds: breeds,
            dob: dob,
            age: age,
            pet_name: pet_name,
            image: image,
        };
        axios.post(`${BASE_URL}/auth/pets_add`, pet_data)
            .then((response) => {
                setResponseMessage(response.pet_data.message);
                toast.success("Subscription Successfully");
                console.log("veterinary", pet_data);
            })
            .catch((error) => {
                console.error("field is required", error);
            });
    };


    const calculateAge = (selectedDate) => {
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
            <Header />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={banner} />
                </div>
            </Container>
            <section className='section-padding'>
                <Container>
                    <div className='add-upload-area'>
                        <form>
                            <div className="form-group add-upload">
                                <label htmlFor="exampleFormControlFile1">Upload image
                                    <i class="fa fa-upload" /></label>
                                <input type="file" className="form-control-file" id="exampleFormControlFile1"
                                    value={image} onChange={(e) => setimage(e.target.value)} />
                            </div>
                            <div className="needplace">
                                <Row>
                                    {selectedCategory && (
                                        <div className='selectedCategory'>
                                            <h2>Avatar</h2>
                                            <img src={
                                                "https://canine.hirectjob.in/storage/app/public/category/" +
                                                selectedCategory.image
                                            } alt={selectedCategory.name} />
                                        </div>
                                    )}
                                </Row>
                                <Row>
                                    <Col lg={10}>
                                        <div className="form-group">
                                            <label >Pet type</label>
                                            <ul className="nav nav-pills mb-3" role="tablist">
                                                {categories &&
                                                    categories.map((item) => (
                                                        <li className="nav-item" key={item.id}>
                                                            <a className="nav-link" data-toggle="pill" role="tab"
                                                                aria-selected="true" onClick={() => setSelectedCategory(item)}>{item.name}</a>
                                                        </li>
                                                    ))}
                                            </ul>


                                        </div>
                                        <div className="form-group">
                                            <label >Gender</label>
                                            <ul className="nav nav-pills mb-3" role="tablist">
                                                <li className="nav-item">
                                                    <a
                                                        className={`nav-link ${gender === "Male" ? "active" : "inactive"}`}
                                                        onClick={() => handleGenderChange("Male")}
                                                    >
                                                        Male
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className={`nav-link ${gender === "Female" ? "active" : "inactive  "}`}
                                                        onClick={() => handleGenderChange("Female")}
                                                    >
                                                        Female
                                                    </a>

                                                </li>
                                            </ul>
                                        </div>
                                        <div className="form-group">
                                            <label >Breed</label>
                                            <select className="form-control">
                                                <option>Jarman safed</option>
                                                <option>2</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label >DOB</label>
                                            <input className="form-control" placeholder="DOB" type="date" onChange={handleDateChange} value={selectedDate.toISOString().slice(0, 10)} />
                                        </div>
                                        <div className="form-group">
                                            <label >Age</label>
                                            <ul className="nav nav-pills mb-3" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="pill" role="tab" aria-selected="true">Year {years}</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">Month {months}</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="form-group">
                                            <label >Pet Name</label>
                                            <input type="text" className="form-control" placeholder="Pet Name" />
                                        </div>
                                        <div className='add-petbtn'>
                                            <Button><Link to=''>Add Pet</Link></Button>
                                        </div>
                                    </Col>
                                </Row>


                            </div>
                        </form>
                    </div>
                </Container>
            </section>

            <Footer />
        </>
    )
}

export default Serviceaddpet