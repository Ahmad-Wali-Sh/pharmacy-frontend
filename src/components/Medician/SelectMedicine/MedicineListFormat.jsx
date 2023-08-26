export const MedicineListFormat = (item) => {
    return (
      <div className="medician-format">
        <div className="medician-image">
          <img
            className="medician-image"
            src={
              item.image
                ? new URL(item.image).pathname.slice(16)
                : "./images/nophoto.jpg"
            }
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={
              item?.pharm_group_image
                ? new URL(item.pharm_group_image).pathname.slice(16)
                : "./images/nophoto.jpg"
            }
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={
              item.kind_image
                ? new URL(item.kind_image).pathname.slice(16)
                : "./images/nophoto.jpg"
            }
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={
              item.country_image
                ? new URL(item.country_image).pathname.slice(16)
                : "./images/nophoto.jpg"
            }
          />
        </div>
        <div className="medician-text-field">
          <div>
            <div className="medician-select-information">
              <h4>{item.medicine_full}</h4>
            </div>
            <h4>ترکیب: {item.generic_name.toString()}</h4>
            <div className="medician-text-field-numbers">
              <h4>مکان: {item.location}</h4>
              <h4>قیمت: {`${item.price}AF`}</h4>
              <h4>تعداد در پاکت: {item.no_pocket}</h4>
              <h4>تعداد در قطی: {item.no_box}</h4>
              <h4>موجودیت: {item.existence}</h4>
            </div>
          </div>
          <div className="medician-big-text-fields">
            <div className="medician-bix-text-field">
              {item.description && (
                <div className="paragraph-big-text">
                  توضیحات:
                  {item.description}
                </div>
              )}
              {item.cautions && (
                <div className="paragraph-big-text">
                  اخطار:
                  {item.cautions}
                </div>
              )}
              {item.usages && (
                <div className="paragraph-big-text">
                  استفاده:
                  {item.usages}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };