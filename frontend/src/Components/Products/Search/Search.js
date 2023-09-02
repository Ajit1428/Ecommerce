import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./Search.css";
import Metadata from "../../MetaData/Metadata";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };
    return (
        <>
            <Metadata title={"Search a product -- ECOMMERCE"} />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a product..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="submitButton">
                    Submit
                </button>
            </form>
        </>
    );
};

export default Search;
