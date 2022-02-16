import "./NavBar.css"

export default function SearchBar() {
    return (
        <div className="search_container">
            <form className="searchBar" action="/search">
                <input
                    type="search"
                    name="q"
                    placeholder="Search for a product"
                />
                <button className="search_button" type="submit"><i className="fas fa-search"></i></button>
            </form>
        </div>
    )
}
