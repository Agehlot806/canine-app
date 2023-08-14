// import React from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { AiOutlineStar } from "react-icons/ai";
// import styled from "styled-components";
// const star = ({ stars, reviews }) => {
//   const ratingStar = Array.from({ length: 5 }, (item, index) => {
//     let number = index + 0.5;
//     return (
//       <span key={index}>
//         {stars > index + 1 ? (
//           <FaStar className="icon" />
//         ) : stars > number ? (
//           <FaStarHalfAlt className="icon" />
//         ) : (
//           <AiOutlineStar className="icon" />
//         )}
//       </span>
//     );
//   });
//   return (
//     <Wrapper>
//       <div className="icon-style">
//         {ratingStar}
//         <p>({reviews} customer reviews)</p>
//       </div>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`
//   justify-content: flex-start;

//   icon {
//     font-size: 2rem;
//     color: orange;
//   }
//   .emty-icon {
//     font-size: 2.6rem;
//   }
//   p {
//     margin: 0;
//     padding-left: 1.2rem;
//   }
// `;

// export default star;
