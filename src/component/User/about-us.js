import React, { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import Newheader from "../../directives/newheader";
import AboutUs from "../../assets/images/banner/about.png";
import { Container, Row, Col } from "react-bootstrap";
import icon1 from "../../assets/images/icon/icon1.png";
import icon2 from "../../assets/images/icon/icon2.png";
import icon3 from "../../assets/images/icon/icon3.png";
import aboutpage from "../../assets/images/img/aboutpage.png";
import Footer from "../../directives/footer";
import video1 from "../../assets/images/video/video1.mp4";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";

function Aboutus() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [about, setabout] = useState([]);
  const [volume, setVolume] = useState(0.5);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event) => {
    const volume = parseFloat(event.target.value);
    setVolume(volume);
    videoRef.current.volume = volume;
  };

  useEffect(() => {
    allabout();
  }, []);
  const allabout = async () => {
    axios
      .get(`${BASE_URL}/auth/about`)
      .then((response) => {
        console.log(response);
        setabout(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Newheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={AboutUs} />
        </div>
      </Container>
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="aboutpage-img">
                <img src={aboutpage} />
              </div>
            </Col>
            <Col lg={6} className="align-self-center">
              <div className="aboutPage-content">
                <h1 className="main-head">About Canine Product</h1>

                {about.map((policy, index) => (
                  <div key={index}>
                    <p dangerouslySetInnerHTML={{ __html: policy.value }} />
                  </div>
                ))}
                {/* <ul>
                                    <li>Adipiscing elit pellentesque</li>
                                    <li>Posuere ac ut consequat</li>
                                    <li>Ornare aenean euismod elementum</li>
                                    <li>Sed turpis tincidunt id aliquet risus</li>
                                </ul> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-padding">
        <Container fluid className="p-0">
          <div className="video-player">
            <video ref={videoRef}>
              <source src={video1} type="video/mp4" />
            </video>
            <div className="controls">
              <button onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              {/* <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                        /> */}
            </div>
          </div>
        </Container>
        <Container>
          <div className="text-left needplace">
            <h1 className="main-head">Pet care, up close and personal.</h1>
            <p>
              But this isn’t just about our fresh new look. As you’ll see below,
              we’ve hired more qualified advisors, expanded our range, built a
              pet-first navigation, and launched new services like on-demand
              healthcare and insurance. There’s much more to come, but we hope
              you think we’re headed in the right direction. But this isn’t just
              about our fresh new look. As you’ll see below, we’ve hired more
              qualified advisors, expanded our range, built a pet-first
              navigation, and launched new services like on-demand healthcare
              and insurance. There’s much more to come, but we hope you think
              we’re headed in the right direction. But this isn’t just about our
              fresh new look. As you’ll see below, we’ve hired more qualified
              advisors, expanded our range, built a pet-first navigation, and
              launched new services like on-demand healthcare and insurance.
              There’s much more to come, but we hope you think we’re headed in
              the right direction.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="text-center">
            <h1 className="main-head">All you need, all in one place.</h1>
          </div>
          <div className="needplace">
            <Row>
              <Col lg={4} sm={6} xs={6} className="mb-3">
                <div className="needplace-card">
                  <img src={icon1} />
                  <h4>Tailor-made insurance</h4>
                  <p>
                    Pet insurance policies often come with additional benefits
                    such as coverage for emergency boarding, advertising and
                    reward for lost pets, liability protection, and more. These
                    additional benefits provide further support and protection
                    for you and your pet.
                  </p>
                </div>
              </Col>
              <Col lg={4} sm={6} xs={6} className="mb-3">
                <div className="needplace-card">
                  <img src={icon2} />
                  <h4>On-demand healthcare</h4>
                  <p>
                    On-demand vet apps allow pet owners to communicate with
                    veterinary doctors about their pet's health. These apps can
                    also provide information and services related to pet health.
                  </p>
                </div>
              </Col>
              <Col lg={4} sm={6} xs={6} className="mb-3">
                <div className="needplace-card">
                  <img src={icon3} />
                  <h4>Tailor-made insurance</h4>
                  <p>
                    Pet insurance policies often come with additional benefits
                    such as coverage for emergency boarding, advertising and
                    reward for lost pets, liability protection, and more. These
                    additional benefits provide further support and protection
                    for you and your pet.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="text-left">
            <h1 className="main-head">Why Choose Us?</h1>
            {/* <p>Tristique nulla aliquet enim tortor at auctor urna nunc.</p> */}
          </div>
          <div className="needplace">
            <Row>
              <Col lg={3} sm={3} className="mb-3">
                <div className="about-choose">
                  <h5>Best In Industry</h5>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur.</p> */}
                </div>
              </Col>
              <Col lg={3} sm={3} className="mb-3">
                <div className="about-choose">
                  <h5>Customer Support</h5>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur.</p> */}
                </div>
              </Col>
              <Col lg={3} sm={3} className="mb-3">
                <div className="about-choose">
                  <h5>Emergency Services</h5>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur.</p> */}
                </div>
              </Col>
              <Col lg={3} sm={3} className="mb-3">
                <div className="about-choose">
                  <h5>Veterinary Help</h5>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur.</p> */}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Aboutus;
