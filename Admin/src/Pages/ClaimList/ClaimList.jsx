import './ClaimList.css';
import { Link } from 'react-router-dom';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import {useDispatch,useSelector} from 'react-redux'
import { useState,useEffect } from 'react';
import { getClaims , deleteClaims} from '../../redux/apiCall';
import { format } from 'timeago.js';
const ClaimList = () => {
  const dispatch = useDispatch();
  console.log(useSelector(state=>state));
  const claims = useSelector((state)=>state.claim.claims);
  console.log(claims);
  const [data, setData] = useState(claims);
useEffect(() => {
  getClaims(dispatch)
}, [dispatch])
console.log(claims);
  const handleDelete = (id) => {
   deleteClaims(id,dispatch)
  };
  const columns = [
    { field: "_id", headerName: "Claim ID", width: 220 },
    {
      field: "carOwner",
      headerName: "Car Owner",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.carOwner}
          </div>
        );
      },
    },
    { field: "insuranceCover", headerName: "Insurance Cover", width: 200 },
    { field: "phoneNumber", headerName: "Phone No", width: 200 },
    { field: "registrationNo", headerName: "Registration", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    { field: "paymentStatus", headerName: "Payment Status", width: 200 },
    { field: "submittedBy", headerName: "Submitted By", width: 200 },
    { field: "dateSubmitted", headerName: "Submited On", width: 200 },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/claim/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
<DataGrid
        rows={claims}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection />
  </div>
  )
}

export default ClaimList