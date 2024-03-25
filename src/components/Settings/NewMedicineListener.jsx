import React, { useEffect, useState } from "react";
import MedicinesLists from "../PageComponents/Lists/MedicineList/MedicinesLists";

const NewMedicineListener = () => {
  const [medicineTrigger, setMedicineTrigger] = useState("");


  useEffect(() => {
    const handleKeyDown = (event) => {
      // Get the pressed key and modifiers
      const { key, ctrlKey, shiftKey, altKey } = event;
      const modifiers = [];
      if (ctrlKey) modifiers.push("Ctrl");
      if (shiftKey) modifiers.push("Shift");
      if (altKey) modifiers.push("Alt");


      if (shiftKey && (key == "m" || key == "M" || key == "ئ")) {
        setMedicineTrigger(new Date());
      }
    };



    // Add event listener for keyboard events
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div >
        <MedicinesLists
          activeKey="medicines"
          button=""
          trigger={medicineTrigger}
          medicineActive={"new"}
        />
    </div>
  );
};

export default NewMedicineListener;
