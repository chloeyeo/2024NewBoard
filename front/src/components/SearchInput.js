const SearchInput = ({ searchForm, onSearch }) => {
    return (
        <input
            type="text"
            placeholder="search"
            onChange={onSearch}
            value={searchForm}
            className="border rounded-md px-3 bg-slate-200"
        />
    );
};

export default SearchInput;
