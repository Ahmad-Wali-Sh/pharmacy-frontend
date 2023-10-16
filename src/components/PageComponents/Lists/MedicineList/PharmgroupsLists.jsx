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
} from "../SellLists/ListingComponents";
import axios from "axios";

export default function PharmGroupLists() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [imagePreview, setImage] = useState("");
  const [filter, setFilter] = useState({
    english_name: "",
    persian_name: "",
  });

  const user = useAuthUser();

  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const { mutateAsync: newPharmGroup } = useMutation({
    mutationFn: (data) => postDataFn(data, "pharm-groub/"),
    onSuccess: () =>
      successFn([pharmGroupsList], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditPharmGroup } = useMutation({
    mutationFn: (data) => putDataFn(data, `pharm-groub/${editItem.id}/`),
    onSuccess: () =>
      successFn([pharmGroupsList], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deletePharmGroup } = useMutation({
    mutationFn: (id) => deleteDataFn(`pharm-groub/${id}/`),
    onSuccess: () =>
      successFn([pharmGroupsList], () => {
        setActive("list");
      }),
    onError: (e) => {
      console.log(e.response);
      toast.error(`نسخه های قبلی را حذف نموده دوباره سعی کنید`);
    },
  });

  const FormResetToItem = (item) => {
    reset({
      name_english: item.name_english ? item.name_english : "",
      name_persian: item.name_persian ? item.name_persian : "",
      discription: item.discription ? item.discription : "",
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
          console.log(file);
        });

    setEditItem(item);
    setImage(item.image ? new URL(item.image).pathname.slice(16) : "");
  };

  const ResetForm = () => {
    reset({
      name_english: "",
      image: "",
      name_persian: "",
      discription: "",
    });
    setEditItem("");
    setImage("");
  };

  let pharmGroupsList = `pharm-groub/?name_english=${filter.english_name}&name_persian=${filter.persian_name}&ordering=id`;
  const { data: pharmGroups } = useQuery([pharmGroupsList]);

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
              label="نام.فارسی"
              value={filter.persian_name}
              autoFocus={true}
              handleChange={(e) =>
                setFilter({ ...filter, persian_name: e.target.value })
              }
            />
            <FilterInput
              label="نام.انگلیسی"
              value={filter.english_name}
              handleChange={(e) =>
                setFilter({ ...filter, english_name: e.target.value })
              }
            />
          </FilterModal>
          <ListHeader>
            <h4>No</h4>
            <h4>نام انگلیسی</h4>
            <h4>نام فارسی</h4>
            <h4>عکس</h4>
            <h4>بیشتر</h4>
          </ListHeader>
            <div className="patient-list-box" ref={listRef}>
              {pharmGroups?.map((kind, key) => (
                <div className="patient-list-item">
                  <h4>{key + 1}</h4>
                  <h4>{kind.name_english}</h4>
                  <h4>{kind.name_persian}</h4>
                  <img
                    src={
                      kind.image ? new URL(kind.image).pathname.slice(16) : ""
                    }
                    className="image-preview-list"
                  />
                  <div className="flex">
                    <InfoButton
                      Func={() => {
                        setScrollPosition(listRef.current?.scrollTop)
                        setActive("edit");
                        FormResetToItem(kind);
                      }}
                    />
                    <DeleteButton
                      Func={() => {
                        deletePharmGroup(kind.id);
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
            <label>نام.انگلیسی:</label>
            <input type="text" {...register("name_english")} />
            <label>نام.فارسی:</label>
            <input type="text" {...register("name_persian")} />
            <label>عکس:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setValue("image", e.target.files[0]);
                setImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <label>توضیحات:</label>
            <input type="text" {...register("description")} />
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
            mutateAsync={newPharmGroup}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
          <Form>
            <label>نام.انگلیسی:</label>
            <input type="text" {...register("name_english")} />
            <label>نام.فارسی:</label>
            <input type="text" {...register("name_persian")} />
            <label>عکس:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setValue("image", e.target.files[0]);
                setImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <label>توضیحات:</label>
            <input type="text" {...register("description")} />
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
            mutateAsync={handleEditPharmGroup}
            reset={reset}
          />
        </>
      );
  }
}
