import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateName, getName } from "./api";
import Loading from "./Loading";
import FormElement from "./Form";

const Update = ({ history, match }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNames();
  }, []);

  const loadNames = () =>
    getName(match.params.id).then((d) => setName(d.data.name));

  // console.log("hello");

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateName(match.params.id, { name })
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status == 400) {
          toast.error(err.response.data);
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? <Loading /> : <h4> Update Name</h4>}
          <FormElement
            handlesubmit={handlesubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default Update;
