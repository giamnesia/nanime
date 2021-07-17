import { React, useState, useEffect } from "react";
import Top from "../components/Top";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const [search, setSearch] = useState();
  const [display, setDisplay] = useState([]);
  const [results, setResults] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleform = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://api.jikan.moe/v3/search/anime?q=" +
        search +
        "&order_by=title&sort=asc"
    );
    const searchlength = search.length;
    response
      .json()
      .then((data) => {
        console.log(data.results);
        if (response.ok) {
          setDisplay(data.results.slice(0, 20));
          setResults("Results for " + `"${search}"`);
          setError("");
        }
        if (!response.ok) {
          throw Error("Error");
        }
        if (searchlength < 3) {
          setError("Input 3 characters or above");
          setResults("");
        }
      })
      .catch(error);
    setError("Anime not found");
  };
  const test = () =>
    toast.dark("Welcome to Nanime - Made with ❤ by Gia", {
      pauseOnHover: false,
      position: "bottom-right",
      autoClose: 5000,
    });
  useEffect(() => {
    test();
  }, [error]);

  const handleLoadingClick = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="navbar">
      <ToastContainer />
      <Link path="/">
        <p className="title">
          N<span style={{ color: "violet" }}>Anime</span>
        </p>
      </Link>
          <p style={{ color: "white", fontSize: '10px' }}>Data by
         <a href="https://jikan.docs.apiary.io/" style={{ textDecoration: "none", color:'steelblue' }} > Jikan API 💖</a></p>
      <form action="" onSubmit={handleform}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          required
        />
        <Link to={search ? `/main/${search}` : "/"}>
          <button type="submit" primary onClick={handleLoadingClick}>
            Search
          </button>
        </Link>
      </form>
      <Top />
    </div>
  );
};

export default Navbar;
