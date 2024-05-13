import styled from "styled-components";

const CardItem = ({ product }) => {
    const ImageWrap = styled.div`
        width: 100%;
        // height: 200px;
        overflow: hidden;
        &:hover img {
            transform: scale(1.2);
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.3s;
        }
    `; // component
    return (
        <div className="border py-4 px-2">
            {product.images.length > 0 && (
                <ImageWrap>
                    <img
                        src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${product.images[0]}`}
                        alt="product img"
                    />
                </ImageWrap>
            )}
            <div>{product.title}</div>
        </div>
    );
};

export default CardItem;
