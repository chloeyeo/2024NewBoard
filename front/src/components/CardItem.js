const CardItem = ({ product }) => {
    return (
        <div className="border py-4 px-2">
            <img
                src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${product.images[0]}`}
                alt="product img"
            />
            <div>{product.title}</div>
        </div>
    );
};

export default CardItem;
