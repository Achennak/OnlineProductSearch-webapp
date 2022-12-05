import React, {useEffect} from 'react';
import AmenitiesComponent from "./Amenities/AmenitiesComponent";
import NavbarComponent from "../NavbarComponent";
import ImagesComponent from "./PropertyImagesDisplay/ImagesComponent";
import properties from "../../assets/Properties.json";
import reviews from "../../assets/Reviews.json";
import ReviewList from "./ReviewsComponent/ReviewList.js"
import {useSelector} from "react-redux";
import {useDispatch} from 'react-redux';
import {useLocation} from "react-router-dom";
import {findPropertiesThunk} from "../../services/home-page-thunks";
import {findPropertiesThunkById} from "../../services/property-screen-thunk";

const templateProperty = {
    "host": "Space",
    "state": "1h",
    "status":"InReview",
    "city": "Boston",
    "amenities": "Wifi, Complimentary Breakfast, Pool",
    "cost": "$1000",
    "cleaning_fee": "$70 / stay",
    "service_fee": "$35 / stay",
    "short_description": "This is a remodelled home with beautiful outdoors.",
    "description": "Have fun with the family at this stylish fully remodeled cottage. Plenty of outdoor areas to hang out by a fire pit or dine outdoors.",
    "bedrooms": "3"
}

const PropertyComponent = ({property}) => {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[2];
    console.log(active);
    console.log("property");
    const {properties, loading} = useSelector((state) => state.properties);
    console.log(properties[0]);
    const propertyDetails = properties;//properties.filter(p => p._id === active);
    const reviewDetails = reviews.filter(r => r.property_id === active);
    const profile = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(findPropertiesThunkById(active))
    }, [])

    const propertyClickHandler = () => {
        /*const newProperty = {
            ...templateProperty,
            name: name
        }
        dispatch(createPropertiesThunk(newProperty));*/
    }

    return (
        <>
            {
                loading && <h3>loading...</h3>
            }
            {
                !loading &&
                <div className="container-fluid wd-container">
                    <div>
                        <NavbarComponent/>
                    </div>
                    <div className="row ms-1 mt-3 ">
                        <div className="col-6">
                            <ImagesComponent property={propertyDetails[0]}/>
                        </div>
                        <div className="col-4 d-none d-xl-block d-xxl-block">
                            <AmenitiesComponent property={propertyDetails[0]}/>
                        </div>

                        <div className="col-2 d-none d-xl-block d-xxl-block">

                            {
                                profile.role === 'owner' && <button
                                                 className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                                                 onClick={propertyClickHandler}>
                                                 ADD
                                             </button>
                            }

                            {
                                profile.role === 'user' && <button
                                                 className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                                                 onClick={propertyClickHandler}>
                                                 Book
                                             </button>
                            }

                            {
                                profile.role === 'Admin' && <button
                                                 className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                                                 onClick={propertyClickHandler}>
                                                 Approve
                                             </button> && <button
                                    className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                                    onClick={propertyClickHandler}>
                                    Reject
                                </button>

                            }

                        </div>

                    </div>

                    <div>
                        <ReviewList review={reviewDetails}/>
                    </div>

                </div>
            }
        </>
    );
};
export default PropertyComponent;

