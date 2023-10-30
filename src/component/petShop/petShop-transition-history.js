import React from "react";
import cart from "../../assets/images/icon/cart.png";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import { Col, Container, Row } from "react-bootstrap";
import Pro from "../../assets/images/icon/pro.png";
import Arrow from "../../assets/images/icon/arrow.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";

const PetshopTransitionHistory = () => {
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://canine.hirectjob.in/api/v1/auth/phistory_customer/${storedWholesellerId}`
        );
        const data = response.data.data; // Assuming the API response is an array

        setTransactionData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Calculate the index of the first and last item to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactionData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(transactionData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      <PetShopHeader />

      {/* --------------section-------------------- */}

      <section className="section-padding">
        <Container>
          {transactionData.length === 0 ? (
            <p>Loading data...</p>
          ) : (
            <>
              {/* Transaction list */}
              <Row>
                <Col lg={12}>
                  <div className="tran-list">
                    {currentItems.map((transaction) => (
                      <Row key={transaction.id}>
                        <Col lg={2}>
                          <img src={Pro} alt={transaction.name} />
                        </Col>
                        <Col lg={8} className="align-self-center">
                          <h5>{transaction.name}</h5>
                          <h5>Paid to</h5>
                          {/* <p>{transaction.date}</p>
                           */}
                          <p>
                            {moment(transaction.date).isSame(moment(), "day")
                              ? moment(transaction.date).fromNow()
                              : moment(transaction.date).format("MMM Do YYYY")}
                          </p>
                        </Col>
                        <Col lg={2}>
                          {/* <img
                            src={Arrow}
                            alt={`Arrow for ${transaction.name}`}
                          /> */}
                          <p style={{ color: "red" }}>₹{transaction.amount}</p>
                          {transaction.type === "debit" && (
                            <p style={{ color: "red" }}>Debited From Wallet</p>
                          )}
                        </Col>
                        {console.log("transaction: ", transaction)}
                      </Row>
                    ))}
                  </div>
                </Col>
              </Row>

              {/* Pagination */}
              <div className="pagination pagi-list">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <ul>
                  {Array(Math.ceil(transactionData.length / itemsPerPage))
                    .fill()
                    .map((_, index) => (
                      <li
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                      >
                        {index + 1}
                      </li>
                    ))}
                </ul>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </Container>
      </section>
      {/* --------------footer-------------------- */}
      <Petshopfooter />
    </>
  );
};
export default PetshopTransitionHistory;
