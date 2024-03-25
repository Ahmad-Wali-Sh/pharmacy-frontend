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
  queryClient,
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

export default function PaymentsLists() {

  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [filter, setFilter] = useState({
    name: "",
  });

  const user = useAuthUser();

  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const { mutateAsync: newPayment } = useMutation({
    mutationFn: (data) => postDataFn(data, "payment-method/"),
    onSuccess: () =>
      successFn('payment-method', () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditPayment } = useMutation({
    mutationFn: (data) => putDataFn(data, `payment-method/${editItem.id}/`),
    onSuccess: () =>
      successFn('payment-method', () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deletePayment } = useMutation({
    mutationFn: (id) => deleteDataFn(`payment-method/${id}/`),
    onSuccess: () =>
      successFn('payment-method', () => {
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
   setEditItem(item);
  };

  const ResetForm = () => {
    reset({
      name: "",
    });
    setEditItem("");
  };

  let paymentQuery = `payment-method/?name=${filter.name}`;
  const { data: payments } = useQuery([paymentQuery]);

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
            <h4>بیشتر</h4>
          </ListHeader>
          <ListMap>
            {payments?.map((payment, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{payment.name}</h4>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setActive("edit");
                      FormResetToItem(payment);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deletePayment(payment.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </ListMap>
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
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newPayment}
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
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditPayment}
            reset={reset}
          />
        </>
      );
  }
}
