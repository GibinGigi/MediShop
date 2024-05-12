import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import PostListItem from "./deleteItem";
import { useSelector } from "react-redux";

function ListItem() {
  const [allItem, setAllItem] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const user = useSelector((store) => store.auth.user);
  const token = user?.token || "";

  function fetchItem() {
    axios
      .get("https://medicalstore.mashupstack.com/api/medicine", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setAllItem(response.data);
        if (searchTerm.trim() !== "") {
          const filteredItems = response.data.filter((item) =>
            item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
          setFilteredItem(filteredItems);
        } else {
          setFilteredItem(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Item:", error);
      });
  }

  useEffect(() => {
    if (user && user.token) {
      fetchItem();
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchItem();
  }, [searchTerm]);

  return (
    <div className="bodyimg">
      <Navbar />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-md-8">
            <form className="d-flex align-items-center justify-content-end">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="form-control bg-muted mr-2"
                placeholder="Search Medicine:"
              />
              <button
                className="btn btn-small btn-info ml-2"
                type="button"
                onClick={fetchItem}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    <br />
    <br />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Find Your Medicines Here:</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/medicines/create" className="btn btn-success mb-2 ">
              Add New Medicine
            </Link>
            {filteredItem.length === 0 ? (
              <p>No matching medicines found.</p>
            ) : (
              filteredItem.map((medicine) => (
                <PostListItem key={medicine.id} medicine={medicine} refresh={fetchItem} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
