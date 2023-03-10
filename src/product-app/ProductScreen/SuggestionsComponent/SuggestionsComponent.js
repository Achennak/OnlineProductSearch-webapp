import React, { useEffect } from "react";
import { findProductsByCategory } from "../../../services/product-screen-thunk";
import { useDispatch, useSelector } from "react-redux";
import SuggestionsItemComponent from "./SuggestionsItemComponent";
import './index.css'
import { Skeleton } from "@mui/material";

const SuggestionsComponent = ({ product }) => {
    const dispatch = useDispatch();
    const category = product.category;
    const { productsByCategory, productsByCategoryLoading } = useSelector((state) => state.productsByCategory);

    useEffect(() => {
        dispatch(findProductsByCategory(category))
    }, [category, dispatch])

    return (
        <>
            {
                productsByCategoryLoading ? <Skeleton animation="wave" width={"100%"} height={600} />
                    : <>
                        <div className="wd-suggestion-header">SIMILAR PRODUCTS</div>
                        <div className="wd-suggestion-main-container">
                            {productsByCategory.filter((p) => p.id !== product.id).splice(0, 4).map(prod =>
                                <SuggestionsItemComponent
                                    key={prod.id} item={prod} />)
                            }
                        </div>
                    </>
            }
        </>
    );
};

export default SuggestionsComponent;