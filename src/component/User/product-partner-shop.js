import React, { useEffect, useState } from 'react'
import Newheader from '../../directives/newheader';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import shop from '../../assets/images/banner/shop.png'
import { Link ,useParams} from 'react-router-dom'
import filter from '../../assets/images/icon/filter.png'
import product1 from "../../assets/images/img/product1.png";
import bag from "../../assets/images/icon/bag.png";
import axios from 'axios'
import { BASE_URL } from '../../Constant/Index'
import Footer from '../../directives/footer'
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
function Productpartnershop() {


  const [brandDropdownVisible, setBrandDropdownVisible] = useState(false);
  const [cateDropdownVisible, setCateDropdownVisible] = useState(false);
  const [productTypeDropdownVisible, setProductTypeDropdownVisible] =
    useState(false);
  const [priceDropdownVisible, setPriceDropdownVisible] = useState(false);
  const [lifestageDropdownVisible, setLifestageDropdownVisible] =
    useState(false);
  const [breedTypeDropdownVisible, setBreedTypeDropdownVisible] =
    useState(false);
  const [healthDropdownVisible, setHealthDropdownVisible] = useState(false);
  const [specialDietDropdownVisible, setSpecialDietDropdownVisible] =
    useState(false);
  const [vegNonvegDropdownVisible, setVegNonvegDropdownVisible] =
    useState(false);
  const [groomingFeatureDropdownVisible, setGroomingFeatureDropdownVisible] =
    useState(false);
  const [groomingToolsDropdownVisible, setGroomingToolsDropdownVisible] =
    useState(false);
  const [accessoryTypeDropdownVisible, setAccessoryTypeDropdownVisible] =
    useState(false);
  const handleParentClick = (dropdownName) => {
    switch (dropdownName) {
      case "brand":
        setBrandDropdownVisible(!brandDropdownVisible);
        break;
      case "productType":
        setProductTypeDropdownVisible(!productTypeDropdownVisible);
        break;
      case "price":
        setPriceDropdownVisible(!priceDropdownVisible);
        break;
      case "lifestage":
        setLifestageDropdownVisible(!lifestageDropdownVisible);
        break;
      case "breedType":
        setBreedTypeDropdownVisible(!breedTypeDropdownVisible);
        break;
      case "health":
        setHealthDropdownVisible(!healthDropdownVisible);
        break;
      case "specialDiet":
        setSpecialDietDropdownVisible(!specialDietDropdownVisible);
        break;
      case "veg-Non-veg":
        setVegNonvegDropdownVisible(!vegNonvegDropdownVisible);
        break;
      case "groomingFeature":
        setGroomingFeatureDropdownVisible(!groomingFeatureDropdownVisible);
        break;
      case "cate":
        setCateDropdownVisible(!cateDropdownVisible);
        break;
        case "groomingTools":
        setGroomingToolsDropdownVisible(!groomingToolsDropdownVisible);
        break;
      case "accessoryType":
        setAccessoryTypeDropdownVisible(!accessoryTypeDropdownVisible);
      default:
        break;
    }
  };
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
  };




    const { id } = useParams();
    console.log("vendorlistid: ", id);
    const [thirdbanner, setthirdbanner] = useState([]);
    const [vendorItemList, setVendorItemList] = useState([]);
    useEffect(() => {
        thirdBanner();
        allProduct();
        allBrandshow()
        allLifesageshow()
        allBreedshow()
        allHealthconditionshow();
        allsubcategary()
    }, []);
    const thirdBanner = () => {
        axios
            .get(`${BASE_URL}/banners`)
            .then((response) => {
                console.log(response.data.data);
                setthirdbanner(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    const gradientColors = [
        "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
        "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
        "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
        "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
        // Add more gradient colors as needed
    ];
    // vendor item
    const [allproduct, setallproduct] = useState([]);
    const allProduct = async () => {
      axios
        .get(`${BASE_URL}/vendor/get-items-list/${id}`)
        .then((response) => {
          console.log(response);
          console.log("Delete Successful");
          setallproduct(response.data.data);
          // Perform any additional actions after successful deletion
        })
        .catch((error) => {
          console.log(error);
        });
    };




    const [allbrand, setAllBrand] = useState("")
    const [alllifesage, setAlllifesage] = useState("")
    const [allbreed, setAllBreed] = useState("")
    const [allsubcate, setAllSubcate] = useState("")
    const [allhealth, setAllHealth] = useState("")
  
    const allBrandshow = async () => {
      axios
        .get(`https://canine.hirectjob.in/api/v1/auth/brand`)
        .then((response) => {
          // console.log("responseresponse?????",response);
          setAllBrand(response.data.data);
          // Perform any additional actions after successful deletion
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const allLifesageshow = async () => {
      axios
        .get(`https://canine.hirectjob.in/api/v1/auth/all_life_stage/`)
        .then((response) => {
          console.log("responseresponse?????", response);
          setAlllifesage(response.data.data);
          // Perform any additional actions after successful deletion
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const allBreedshow = async () => {
      axios
        .get(`https://canine.hirectjob.in/api/v1/auth/all_pets_breed/`)
        .then((response) => {
          console.log("responseresponse?????", response);
          setAllBreed(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
  
    const allsubcategary = async () => {
      axios
        .get(`https://canine.hirectjob.in/api/v1/categories`)
        .then((response) => {
          console.log("responseresponse?????", response);
          setAllSubcate(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const allHealthconditionshow = async () => {
      axios
        .get(`https://canine.hirectjob.in/api/v1/auth/health_condition/`)
        .then((response) => {
          console.log("responseresponse?????", response);
          setAllHealth(response.data.data);
          // Perform any additional actions after successful deletion
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const [selectedBrandIds, setSelectedBrandIds] = useState([]);
    const [selectedlifeIds, setSelectedLifeIds] = useState([]);
    const [selectedbreedIds, setSelectedbreedIds] = useState([]);
    const [selectedcateIds, setSelectedcateIds] = useState([]);
    const [selectedhealthIds, setSelectedhealthIds] = useState([]);
    const [selectedvegIds, setSelectedvegIds] = useState([]);
   
    const [minpricevalue, setMinpricevalue] = useState([])
    const [maxpricevalue, setMaxpricevalue] = useState([])
    const minprice = (e) => {
      setMinpricevalue(e.target.value)
    }
    const maxprice = (e) => {
      setMaxpricevalue(e.target.value)
    }
  
    const handleDataListBrand = (brand_id) => {
      setSelectedBrandIds((prevSelectedBrandIds) => {
        const updatedBrandIds = prevSelectedBrandIds.includes(brand_id)
          ? prevSelectedBrandIds.filter((id) => id !== brand_id)
          : [...prevSelectedBrandIds, brand_id];
        filterProducts(updatedBrandIds); // Pass the updated brand IDs to filter function
        return updatedBrandIds;
      });
    };
    // console.log("/////",selectedBrandIds);
  
    const Lifesatedataselect = (name) => {
      setSelectedLifeIds((prevSelectedLifeIds) => {
        const updatedLifeIds = prevSelectedLifeIds.includes(name)
          ? prevSelectedLifeIds.filter((id) => id !== name)
          : [...prevSelectedLifeIds, name];
        filterProducts(undefined, updatedLifeIds);
        return updatedLifeIds;
      });
    };
  
    const allbreedselect = (name) => {
      setSelectedbreedIds((prevSelectedBreedIds) => {
        const updatedBreedIds = prevSelectedBreedIds.includes(name)
          ? prevSelectedBreedIds.filter((id) => id !== name)
          : [...prevSelectedBreedIds, name];
        filterProducts(undefined, undefined, updatedBreedIds);
        return updatedBreedIds;
      });
    };
    const allcateselect = (name) => {
      setSelectedcateIds((prevSelectedBreedIds) => {
        const updatedcateIds = prevSelectedBreedIds.includes(name)
          ? prevSelectedBreedIds.filter((id) => id !== name)
          : [...prevSelectedBreedIds, name];
        filterProducts(undefined, undefined, undefined, updatedcateIds);
        return updatedcateIds;
      });
    };
  
    const allhealthselect = (name) => {
      setSelectedhealthIds((prevSelectedhealthIds) => {
        const updatedhealthIds = prevSelectedhealthIds.includes(name)
          ? prevSelectedhealthIds.filter((id) => id !== name)
          : [...prevSelectedhealthIds, name];
        filterProducts(undefined, undefined, undefined, undefined, updatedhealthIds);
        return updatedhealthIds;
      });
    };
  
    const vegnonveghandler = (value) => {
      setSelectedvegIds((prevSelectedvegIds) => {
        const updatedvegIds = prevSelectedvegIds.includes(value)
          ? prevSelectedvegIds.filter((id) => id !== value)
          : [...prevSelectedvegIds, value];
        filterProducts(undefined, undefined, undefined, undefined, undefined, updatedvegIds);
        return updatedvegIds;
      });
    };
    const applyprice = ()=>{
      filterProducts();
    }
  
    const filterProducts = async (updatedBrandIds, updatedLifeIds, updatedBreedIds, updatedcateIds, updatedhealthIds,updatedvegIds) => {
      try {
        const response = await axios.get(`https://canine.hirectjob.in/api/v1/vendor/get-items-list/${id}`);
        const products = response.data.data;
        const filteredProducts = applyFilters({
          selectedBrands: updatedBrandIds || selectedBrandIds,
          selectLifeStageFilterList: updatedLifeIds || selectedlifeIds,
          selectBreedFilterList: updatedBreedIds || selectedbreedIds,
          selectcate: updatedcateIds || selectedcateIds,
          selecthealth: updatedhealthIds || selectedhealthIds,
          selectedVegOptions:updatedvegIds|| selectedvegIds,
          minPrice: minpricevalue !== "" ? parseFloat(minpricevalue) : null,
          maxPrice: maxpricevalue !== "" ? parseFloat(maxpricevalue) : null,
          // selectedVegOptions: updatedvegIds.map((e) => (e === 0 ? "veg" : "non-veg")),
          // minPrice:  minpricevalue !== [] ? minpricevalue : null, 
          // maxPrice: maxpricevalue !== [] ? maxpricevalue : null,
          products: products,
        });
        console.log("/////", filteredProducts);
        console.log("======", products);
        setallproduct(filteredProducts)
      } catch (error) {
        console.error('Error:', error);
      }
  
    };
  
    const applyFilters = ({
      selectedBrands,
      selectLifeStageFilterList,
      selectBreedFilterList,
      selectcate,
      selecthealth,
      selectedVegOptions,
      minPrice,
      maxPrice,
      products,
    }) => {
      const selectedBrandSet = new Set(selectedBrands);
      const selectedLifeStageSet = new Set(selectLifeStageFilterList);
      const selectedBreedSet = new Set(selectBreedFilterList);
      const selectedcateSet = new Set(selectcate);
      const selectedhealthSet = new Set(selecthealth);
      const selectedvegSet = new Set(selectedVegOptions);
  
      return products.filter(product => {
        const brandFilter = selectedBrands.length === 0 || selectedBrandSet.has(product.brand_id.toString());
        const lifeStageFilter = selectLifeStageFilterList.length === 0 || selectedLifeStageSet.has(product.lifeStage_id.toString());
        const breedFilter = selectBreedFilterList.length === 0 || selectedBreedSet.has(product.Petsbreeds_id.toString());
        const cateFilter = selectcate.length === 0 || selectedcateSet.has(product.category_ids.toString());
        const healthFilter = selecthealth.length === 0 || selectedhealthSet.has(product.helthCondition_id.toString());
        const Filterveg = selectedVegOptions.length === 0 || selectedvegSet.has(product.veg === 0 ? "0" : "1");
        const price = parseFloat(product.price);  // Parse the price to a number
        const minPriceFilter = isNaN(minPrice) || price >= minPrice;  // Check if price is NaN or greater than minPrice
        const maxPriceFilter = isNaN(maxPrice) || price <= maxPrice;
        // const price = parseFloat(product.price);  // Parse the price to a number
        // const minPriceFilter = isNaN(minPrice) || price >= minPrice;  // Check if price is NaN or greater than minPrice
        // const maxPriceFilter = isNaN(maxPrice) || price <= maxPrice;
        // const Filterveg =selectedVegOptions.length === 0 || selectedvegSet.has(product.veg === 0 ? "veg" : "non-veg");
        return brandFilter && lifeStageFilter && breedFilter && cateFilter && healthFilter&&Filterveg&&minPriceFilter&& maxPriceFilter;
      });
    };

    return (
        <>
            <Newheader />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={shop} />
                </div>
            </Container>
            <Container>
                <Row>
                <Col lg={3}>
            <section className="section-padding">
              <div className="filter-product">
                <h3>Filters</h3>
                
                <hr />
                <div
                  onClick={() => handleParentClick("brand")}
                  className="main-chk"
                >
                  Brand
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {brandDropdownVisible && (
                    <>
                      <div>
                        {allbrand ? (
                          allbrand.map((items) => (
                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                        

                                onClick={(e) => handleDataListBrand(items.title)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {items.title}
                              </label>
                            </div>

                          ))
                        ) : ""}
                      </div>
                    </>
                  )}
                </div>
                <hr />
                <div
                  onClick={() => handleParentClick("cate")}
                  className="main-chk"
                >
                  Category
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {cateDropdownVisible && (
                    <>
                      <div>
                        {allsubcate ? (
                          allsubcate.map((items) => (
                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                        

                                onClick={(e) => allcateselect(items.name)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {items.name}
                              </label>
                            </div>

                          ))
                        ) : ""}
                      </div>
                    </>
                  )}
                </div>
                <hr />

                <div
                  onClick={() => handleParentClick("price")}
                  className="main-chk"
                >
                  Price
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {priceDropdownVisible && (
                    <>
                      <div>

                        <div className="form-range" onClick={handleCheckboxClick}>
                          <span>₹</span>
                          <input type="number" 
                          placeholder="From"  onChange={minprice} />
                        </div>
                        <div className="form-range" onClick={handleCheckboxClick}>
                          <span>₹</span>
                          <input type="number"
                             placeholder="From"  onChange={maxprice} />
                        </div>
                        <div className="form-range" >
                          {/* <span>₹</span> */}
                       <button onClick={applyprice}>Apply</button>
                        </div>
                      </div>

                    </>
                  )}
                </div>
                <hr />
                <div
                  onClick={() => handleParentClick("lifestage")}
                  className="main-chk"
                >
                  Lifestage
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {lifestageDropdownVisible && (
                    <>
                      <div>
                        {alllifesage ? (
                          alllifesage.map((items) => (


                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                onChange={(e) => Lifesatedataselect(items.name)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {items.name}
                              </label>
                            </div>
                          ))
                        ) : ""}
                      </div>
                    </>
                  )}
                </div>
                <hr />
                <div
                  onClick={() => handleParentClick("breedType")}
                  className="main-chk"
                >
                  Breed Type
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {breedTypeDropdownVisible && (
                    <>
                      <div>
                        {allbreed ? (
                          allbreed.map((items) => (


                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                onChange={(e) => allbreedselect(items.name)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {items.name}
                              </label>
                            </div>
                          ))
                        ) : ""}
                      </div>
                    </>
                  )}
                </div>
                <hr />
                <div
                  onClick={() => handleParentClick("health")}
                  className="main-chk"
                >
                  Health Condition
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {healthDropdownVisible && (
                    <>
                      <div>
                        {allhealth ? (
                          allhealth.map((items) => (

                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                onClick={(e) => allhealthselect(items.title)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {items.title}
                              </label>
                            </div>
                          ))
                        ) : ""}

                      </div>
                    </>
                  )}
                </div>
                <hr />

                <div
                  onClick={() => handleParentClick("veg-Non-veg")}
                  className="main-chk"
                >
                  Veg/Nonveg
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {vegNonvegDropdownVisible && (
                    <>
                      <div>
                        <div
                          className="form-check"
                          onClick={handleCheckboxClick}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="defaultCheck1"
                            onClick={(e)=>vegnonveghandler("1")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Non-Veg (219)
                          </label>
                        </div>
                        <div
                          className="form-check"
                          onClick={handleCheckboxClick}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="defaultCheck1"
                            onClick={(e)=>vegnonveghandler("0")}

                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Veg (73)
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <hr />



              </div>
            </section>
          </Col>
                    <Col lg={9}>
                        <section className='section-padding'>
                            <div className="needplace">
                                <Container>
                                    <Row>
                                        {allproduct && allproduct.length > 0 ? (
                                            allproduct.map((item, index) => (
                                                <Col lg={4} sm={6} xs={6} className="mb-4">
                                                    <div className="food-product"
                                                        style={{ background: gradientColors[index % gradientColors.length], }}>
                                                        <i class="fa fa-heart-o" />
                                                        <Link to="/product-details">
                                                            <div className="text-center">
                                                                <img
                                                                    src={
                                                                        "https://canine.hirectjob.in//storage/app/public/product/" +
                                                                        item.image
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <h6>{item.name}</h6>
                                                                <p>{item.description}</p>
                                                            </div>
                                                            <div className="product-bag">
                                                                <Row>
                                                                    <Col>
                                                                        <p>₹{item.price}</p>
                                                                    </Col>
                                                                    <Col>
                                                                        <h5>{item.discount}</h5>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className="align-self-center">
                                                                        <h6>{`₹${item.price -
                                                                            (item.price * item.discount) / 100
                                                                            }`}</h6>
                                                                    </Col>
                                                                    <Col>
                                                                        <Link to="">
                                                                            <img src={bag} />
                                                                        </Link>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </Col>
                                            ))
                                        ) : (
                                            <p className="emptyMSG">No Product By Partner Data.</p>
                                        )}
                                    </Row>
                                </Container>
                            </div>
                        </section>
                        <section className="section-padding">
                            <Container>
                                {thirdbanner
                                    ? thirdbanner.map(
                                        (item, index) =>
                                            item.title === "new" && (
                                                <div className="banner-bgmain" key={item.id}>
                                                    <img
                                                        src={
                                                            "https://canine.hirectjob.in/storage/app/public/banner/" +
                                                            item.image
                                                        }
                                                    />
                                                </div>
                                            )
                                    )
                                    : null}
                            </Container>
                        </section>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}
export default Productpartnershop