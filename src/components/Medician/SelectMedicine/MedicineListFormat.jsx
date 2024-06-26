import axios from "axios";

let api = null;
function fetchServerIP() {
  return axios
    .get("/endpoint.json")
    .then((response) => {
      api = response.data.endpoint;
      return api;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

fetchServerIP();

export const MedicineListFormat = (resultsLength) => (item) => {

  
  return (
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
          src={item.kind_image ? api + item.kind_image : "./images/nophoto.jpg"}
        />
      </div>
      <div className="medician-image">
        <img
          className="medician-image"
          src={
            item.country_image
              ? api + item.country_image
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
          {item?.generic_name?.[0] && (
            <div className="generics-text">
              {item?.generic_name?.toString()}
            </div>
          )}
        </h4>
        <div className="medicine-info-fields">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4>تعداد در پاکت: {item.no_pocket}</h4>
            <h4 style={{ direction: "rtl" }}>
              قیمت پاکت:{" "}
              {`${(parseFloat(item.no_pocket || 0) * parseFloat(item.price || 0)).toFixed(1)}AF`}
            </h4>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4>تعداد در قطی: {item.no_box}</h4>
            <h4 style={{ direction: "rtl" }}>
              قیمت قطی:{" "}
              {`${(parseFloat(item.no_box || 0) * parseFloat(item.price || 0)).toFixed(1)}AF`}
            </h4>
          </div>
          <h4>مکان: {item.location}</h4>
          <h4>قیمت: {`${item.price}AF`}</h4>
          <h4>موجودیت: {item.existence}</h4>
        </div>
      </div>
    </div>
  );
};
