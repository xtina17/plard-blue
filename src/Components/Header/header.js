import React from 'react';
import style from "./header.module.css"
import Search from "./Search/search";

const Header = ({searchedAllProducts, setSearchedAllProducts}) => {
    return (
        <div className={style.header}>
            <Search searchedAllProducts={searchedAllProducts} setSearchedAllProducts={setSearchedAllProducts}/>
        </div>
    );
};

export default Header;