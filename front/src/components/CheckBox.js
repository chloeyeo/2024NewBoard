const CheckBox = ({ continents, checkedContinents, onFilters }) => {
    // same as continents?.map
    return (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 mb-3">
            {continents &&
                continents.map((continent) => {
                    return (
                        <div
                            className="w-[100%] bg-slate-200 flex px-4"
                            key={`continent-${continent._id}`}
                        >
                            <input
                                type="checkbox"
                                id={`checkbox-${continent._id}`}
                                className="mr-3"
                            />
                            <label
                                htmlFor={`checkbox-${continent._id}`}
                                className="m-auto"
                            >
                                {continent.name}
                            </label>
                        </div>
                    );
                })}
        </div>
    );
};

export default CheckBox;
