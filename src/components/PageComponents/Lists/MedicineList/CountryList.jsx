import { useRef, useState, useEffect } from "react";
import { InfoButton, DeleteButton } from "../../Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import {
  postDataFn,
  successFn,
  putDataFn,
  deleteDataFn,
} from "../../../services/API";
import { toast } from "react-toastify";
import {
  Form,
  ListFooter,
  ListHeader,
  ListMap,
  FilterModal,
  FilterInput,
} from "../../ListingComponents";
import axios from "axios";

export default function CountryList() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [imagePreview, setImage] = useState("");
  const [filter, setFilter] = useState({
    name: "",
  });

  const user = useAuthUser();

  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const { mutateAsync: newCountry } = useMutation({
    mutationFn: (data) => postDataFn(data, "country/"),
    onSuccess: () =>
      successFn([countryQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditCountry } = useMutation({
    mutationFn: (data) => putDataFn(data, `country/${editItem.id}/`),
    onSuccess: () =>
      successFn([countryQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteCountry } = useMutation({
    mutationFn: (id) => deleteDataFn(`country/${id}/`),
    onSuccess: () =>
      successFn([countryQuery], () => {
        setActive("list");
      }),
    onError: (e) => {
      console.log(e.response);
      toast.error(`نسخه های قبلی را حذف نموده دوباره سعی کنید`);
    },
  });

  const FormResetToItem = (item) => {
    reset({
      name: item.name ? item.name : "",
    });

    item.image &&
      axios(item.image)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File(
            [blob],
            item.name_english ? item.name_english + ".jpeg" : "no_name.jpeg",
            { type: blob.type }
          );
          reset({
            image: file ? file : "",
          });
        });

    setEditItem(item);
    setImage(item.image ? item.image : "");
  };

  const ResetForm = () => {
    reset({
      name: "",
      image: "",
    });
    setEditItem("");
    setImage("");
  };

  let countryQuery = `country/?name=${filter.name}&ordering=id`;
  const { data: countries } = useQuery([countryQuery]);

  const listRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    listRef.current.scrollTo({ behavior: "smooth", top: scrollPosition });
  };

  useEffect(() => {
    active == "list" && handleScroll();
  }, [active]);

  useEffect(() => {
    const handleKeyDowns = (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "e":
          case "E":
          case "ث":
            e.preventDefault();
            setActive("new");
            ResetForm();
            break;
          case "f":
          case "F":
          case "ب":
            e.preventDefault();
            ListFilterRef.current.Opener();
            break;
          case "l":
          case "L":
          case "م":
            e.preventDefault();
            setActive("list");
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDowns);
    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, []);

  switch (active) {
    case "list":
      return (
        <>
          <FilterModal
            current={ListFilterRef.current}
            ListFilterRef={ListFilterRef}
          >
            <FilterInput
              label="نام"
              value={filter.name}
              autoFocus={true}
              handleChange={(e) =>
                setFilter({ ...filter, name: e.target.value })
              }
            />
          </FilterModal>
          <ListHeader>
            <h4>No</h4>
            <h4>نام</h4>
            <h4>عکس</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <div className="patient-list-box" ref={listRef}>
            {countries?.map((country, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{country.name}</h4>
                <img
                  src={
                    country.image
                      ? country.image
                      : ""
                  }
                  className="image-preview-list"
                />
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setScrollPosition(listRef.current?.scrollTop);
                      setActive("edit");
                      FormResetToItem(country);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deleteCountry(country.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <ListFooter setActive={setActive} reset={reset} user={user} />
        </>
      );
    case "new":
      () => setEditItem("");
      return (
        <>
          <Form>
            <label>نام:</label>
            <input type="text" {...register("name")} />
            <label>عکس:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setValue("image", e.target.files[0]);
                setImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <label>نمایش:</label>
            {imagePreview && (
              <div className="flex">
                <div
                  className="modal-close-btn"
                  onClick={() => {
                    reset({
                      image: "",
                    });
                    setImage("");
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <img src={imagePreview} className="image-preview-kind" />
              </div>
            )}
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newCountry}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
          <Form>
            <label>نام:</label>
            <input type="text" {...register("name")} />
            <label>عکس:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setValue("image", e.target.files[0]);
                setImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <label>نمایش:</label>
            {imagePreview && (
              <div className="flex">
                <div
                  className="modal-close-btn"
                  onClick={() => {
                    reset({
                      image: "",
                    });
                    setImage("");
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <img src={imagePreview} className="image-preview-kind" />
              </div>
            )}
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditCountry}
            reset={reset}
          />
        </>
      );
  }
}
