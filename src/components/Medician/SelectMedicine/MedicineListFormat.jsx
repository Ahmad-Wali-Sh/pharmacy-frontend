import { useEffect, useState } from "react";

async function loadEnvVariables(key) {
  try {
      const response = await fetch('/env.json');
      const data = await response.json();
      return data[key] || null; // Return the value corresponding to the provided key, or null if not found
  } catch (error) {
      console.error('Error loading environment variables:', error);
      return null; // Return null if there's an error
  }
}

export const MedicineListFormat = (item, { context }) => {
  // const [API_URL, setAUTH_URL] = useState('');
  // useEffect(() => {
  //   loadEnvVariables('VITE_API')
  //     .then(apiValue => {
  //       setAUTH_URL(apiValue);
  //     })
  //     .catch(error => {
  //       console.error('Error loading VITE_API:', error);
  //     });
  //   }, []);
  //   const IMAGE_URL = API_URL.slice(0,-4)

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
              ?  item.kind_image
              : "./images/nophoto.jpg"
          }
        />
      </div>
      <div className="medician-image">
        <img
          className="medician-image"
          src={
            item.country_image
              ?  item.country_image
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
