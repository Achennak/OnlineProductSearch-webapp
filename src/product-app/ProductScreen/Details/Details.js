import React from "react";
import { Rating } from "@mui/material";

const DetailsComponent = ({ product }) => {
    return (
        <div className="card-body">
            <h2 className="card-title">
                <h2 className="start mr-2">{product.title}</h2>
                <div>
                    <Rating
                        name="simple-controlled"
                        value={product.rating}
                        readOnly
                        precision={0.5}
                        onChange={(event, newValue) => {
                            // TODO persist rating update
                            console.log("newValue", newValue)
                        }}
                    />
                </div>
            </h2>
            <p className="card-text">
                <b>Rating</b> : {product.rating}
                <br />
                <b>Discount Percentage</b>:{product.discountPercentage}
                <br>
                </br>
                <b>Available Quantity</b> : {product.stock}
                <br />
                <b>Brand</b> : {product.brand}
                <br />
                <b>Category</b> : {product.category}
            </p>
            <div className="d-none d-xl-block d-xxl-block">
                {
                    <button type="button"
                        className="rounded-pill btn btn-secondary float-end mt-2 fw-bold"
                    >
                        Buy
                    </button>
                }
            </div>
        </div>
    );

};

export default DetailsComponent;