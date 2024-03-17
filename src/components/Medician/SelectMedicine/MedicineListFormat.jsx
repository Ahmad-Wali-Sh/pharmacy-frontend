import axios from "axios";

let api = null;
function fetchServerIP() {
  return axios.get('http://127.0.0.1:4000/api/endpoints')
    .then(response => {
      api = response.data.server_ip;
      return api;
    })
    .catch(error => {
      console.log(error);
      // Handle the error if necessary
      return null; // Return null or handle the error accordingly
    });
}

fetchServerIP()

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
          src={
            item.kind_image
              ?  api + item.kind_image
              : "./images/nophoto.jpg"
          }
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
