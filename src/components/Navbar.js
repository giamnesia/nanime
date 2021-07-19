import { React, useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
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
    response
      .json()
      .then((data) => {
        if (response.ok) {
          setDisplay(data.results.slice(0, 20));
          setResults("Results for " + `"${search}"`);
        }
        if (!response.ok) {
          throw Error("Error");
        }
      })
      .catch(error);
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
    setSearch("");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  //SCROLL
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <div className="navbar">
      <ToastContainer />
      <Link to="/">
        <p className="title">
          NANI<span style={{ color: "white" }}>me</span>
        </p>
      </Link>
      <p style={{ color: "white", fontSize: "10px" }}>
        Data by
        <a
          href="https://jikan.docs.apiary.io/"
          target="_blank"
          style={{ textDecoration: "none", color: "steelblue" }}
        >
          {" "}
          Jikan API 💖
        </a>
      </p>
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
      <Icon
        name="angle up"
        className="arrow"
        size="big"
        onClick={scrollToTop}
        style={{ display: visible ? "block" : "none", color: "white" }}
      />
    </div>
  );
};

export default Navbar;
