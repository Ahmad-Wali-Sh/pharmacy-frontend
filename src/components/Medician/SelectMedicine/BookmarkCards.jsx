import React, { memo } from "react";

const BookmarkCards = memo(({ medicine, Func }) => {
  return (
    <div
      className="bookmark-card"
      onClick={() => Func(medicine)}
    >
      <img
        className="bookmark-image"
        src={
          medicine.image
            ? medicine.image
            : "./images/nophoto.jpg"
        }
      />
      <h4>{medicine.brand_name}</h4>
      <h5>{medicine.generic_name}</h5>
      <h4>{medicine.ml}</h4>
    </div>
  );
})

export default BookmarkCards;
