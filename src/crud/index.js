import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createName, deleteName, getNames } from "./api";
import { Link } from "react-router-dom";
import FormElement from "./Form";
import Loading from "./Loading";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Crud = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState([]);

  useEffect(() => {
    loadNames();
  }, []);

  const loadNames = () => getNames().then((names) => setNames(names.data));

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createName({ name })
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadNames();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
      });
  };

  const handleRemove = (id, name) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      setLoading(true);
      deleteName(id)
        .then((res) => {
          setLoading(false);
          toast.error(`${name} is deleted`);
          loadNames();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h4 className="text-center">CRUD with JSON Server</h4>
              <FormElement
                handlesubmit={handlesubmit}
                name={name}
                setName={setName}
              />
              {names &&
                names.map((name) => (
                  <div
                    className="border row mx-2 align-items-center "
                    key={name.id}
                  >
                    <ul className="list-group">
                      <li className="list-group-item">{name.name}</li>
                    </ul>
                    <span
                      onClick={() => handleRemove(name.id, name.name)}
                      className="btn btn-sm float-right"
                    >
                      <DeleteOutlined className="text-danger" />
                    </span>
                    <Link to={`update/${name.id}`}>
                      <span className="btn btn-sm float-right">
                        <EditOutlined className="text-warning" />
                      </span>
                    </Link>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Crud;
