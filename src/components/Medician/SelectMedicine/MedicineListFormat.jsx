import { Popover } from "react-tiny-popover";

export const MedicineListFormat = (item, { context }) => {
  const API_URL = import.meta.env.VITE_API;
  const IMAGE_URL = API_URL.slice(0,-4)

  return context === "value" ? (
    item.medicine_full
  ) : (
    <div className="medician-format">
      <div className="medician-image">
        <img
          className="medician-image"
          src={item.image ? item.image : "./images/nophoto.jpg"}
        />
      </div>
      <div className="medician-image">
        <img
          className="medician-image"
          src={
            item.kind_image
              ? IMAGE_URL + item.kind_image
              : "./images/nophoto.jpg"
          }
        />
      </div>
      <div className="medician-image">
        <img
          className="medician-image"
          src={
            item.country_image
              ? IMAGE_URL + item.country_image
              : "./images/nophoto.jpg"
          }
        />
      </div>
      <div className="medician-text-field">
        <h4>{item.medicine_full}</h4>
        <h4 className="generics-selecting">
          <h4 className="generics-text-header">
            {item?.generic_name?.toString()}
          </h4>
          {item?.generic_name[0] && (
            <div className="generics-text">
              {item?.generic_name?.toString()}
            </div>
          )}
        </h4>
        <div className="medicine-info-fields">
          <h4>تعداد در پاکت: {item.no_pocket}</h4>
          <h4>تعداد در قطی: {item.no_box}</h4>
          <h4>مکان: {item.location}</h4>
          <h4>قیمت: {`${item.price}AF`}</h4>
          <h4>موجودیت: {item.existence}</h4>
        </div>
      </div>
    </div>
  );
};
