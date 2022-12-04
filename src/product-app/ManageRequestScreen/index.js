import NavbarComponent from "../NavbarComponent";
import requests from './admin-requests.json';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import './index.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import SearchComponent from "../../components/SearchComponent";
import { useState } from "react";
import Button from '@mui/material/Button';
import { findAllProductRequestsThunk } from '../../services/product-request-thunks.js';
import { approveProductRequestThunk, rejectProductRequestThunk } from '../../services/product-request-thunks.js';



function ManageRequestScreen() {

    const { productRequests, loading } = useSelector((state) => state.productRequests);


    const dispatch = useDispatch();
    useEffect(() => {
        console.log("GETTING IT")
        dispatch(findAllProductRequestsThunk())
    }, [])


    const renderDetailsButton = (params) => {


        if (params.row.status === "Approved" ||params.row.status === "Rejected" ) {

            return (
                <>


                    <strong>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            disabled
                        >
                            {params.row.status}
                        </Button>
                    </strong>
                </>
            )
        } else {

            return (
                <>
                    <strong>
                        <div className="wd-manage-req_status">

                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            className="wd-manage-req_approve-btn"
                            onClick = {()=>{dispatch(approveProductRequestThunk(params.row.id))}}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className="wd-manage-req_reject-btn"
                            style={{ marginLeft: 16 }}
                            onClick = {()=>{dispatch(rejectProductRequestThunk(params.row.id))}}
                        >
                            Reject
                        </Button>
                        </div>
                    </strong>
                </>
            )

        }

    }

    const columns = [
        { field: 'id', headerName: 'REQUESTID', width: 170 },
        { field: 'productID', headerName: 'PRODUCTID', width: 170 },
        { field: 'seller', headerName: 'SELLER', width: 170 },
        { field: 'productName', headerName: 'PRODUCT NAME', width: 170 },
        { field: 'date', headerName: 'DATE', width: 170 },
        { field: 'status', headerName: 'STATUS', width: 170, renderCell: renderDetailsButton },
    ];



    const rows = productRequests;

    return (
        <>
            {
                loading && <h3>loading...</h3>
            }

            {
                !loading &&
                <>
                    <NavbarComponent />

                    <div className="wd-manage-req-container">
                        <div style={{ width: '100%' }}>
                            <DataGrid rowHeight={95} rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} autoHeight="true" />
                        </div>
                    </div>
                </>

            }

        </>
    );


}

export default ManageRequestScreen