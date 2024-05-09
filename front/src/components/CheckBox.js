const CheckBox = ({ continents, checkedContinents, onFilters }) => {
    // same as continents?.map
    function handleToggle(continentId) {
        const currentIndex = checkedContinents.indexOf(continentId);
        const newChecked = [...checkedContinents];
        if (currentIndex === -1) {
            newChecked.push(continentId);
        } else {
            newChecked.splice(currentIndex, 1); // removes 1 elemenet at currentIndex
        }
        onFilters(newChecked);
    }
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
                                onChange={() => {
                                    handleToggle(continent._id);
                                }}
                                checked={
                                    checkedContinents?.indexOf(
                                        continent._id
                                    ) === -1
                                        ? false
                                        : true
                                }
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
