import React from "react";

const RadioBox = ({ prices, checkedPrice, onFilters }) => {
    return (
        <div>
            <h2>Prices:</h2>
            <div className="flex">
                {prices?.map((price) => {
                    return (
                        <div key={`price-${price._id}`} className="py-4 px-4">
                            <input
                                type="radio"
                                className="mr-2"
                                id={`radio-${price._id}`}
                                name="radio"
                            />
                            <label htmlFor={`radio-${price._id}`}>
                                {price.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioBox;
