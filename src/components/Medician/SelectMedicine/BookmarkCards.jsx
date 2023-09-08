import React from "react";

function BookmarkCards({ medicine, Func }) {
  return (
    <div
      className="bookmark-card"
      onClick={() => Func(medicine)}
    >
      <img
        className="bookmark-image"
        src={
          medicine.image
            ? new URL(medicine.image).pathname.slice(16)
            : "./images/nophoto.jpg"
        }
      />
      <h4>{medicine.brand_name}</h4>
      <h5>{medicine.generic_name}</h5>
      <h4>{medicine.ml}</h4>
    </div>
  );
}

export default BookmarkCards;
