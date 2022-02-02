import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const API = process.env.REACT_APP_API_KEY

function Booking() {
    const tableIcons = [
        { Add: <AddBox /> },
        { Check: <Check /> },
        { Clear: <Clear /> },
        { Delete: <DeleteOutline /> },
        { DetailPanel: <ChevronRight /> },
        { Edit: <Edit /> },
        { Export: <SaveAlt /> },
        { Filter: <FilterList /> },
        { FirstPage: <FirstPage /> },
        { LastPage: <LastPage /> },
        { NextPage: <ChevronRight /> },
        { PreviousPage: <ChevronLeft /> },
        { ResetSearch: <Clear /> },
        { Search: <Search /> },
        { SortArrow: <ArrowDownward /> },
        { ThirdStateCheck: <Remove /> },
        { ViewColumn: <ViewColumn /> }
    ];

    const [data, setData] = useState([]);
    data.forEach((count, index) => { count.serial = index + 1 })
    const columns = [
        { title: '#', field: 'serial', cellStyle: { textAlign: 'center' } },
        { title: "Customer Name", field: "User_Name", cellStyle: { minWidth: 230, textAlign: "center" } },
        { title: "Contact No", field: "User_Number", cellStyle: { minWidth: 185, textAlign: "center" } },
        { title: "Email", field: "User_Email", cellStyle: { minWidth: 240, textAlign: "center" } },
        { title: "Company", field: "Car_Company", cellStyle: { textAlign: "center" } },
        { title: "Model", field: "Model", cellStyle: { textAlign: "center" } },
        { title: "Mechanic Name", field: "Mechanic_Name", cellStyle: { minWidth: 230, textAlign: "center" } },
        { title: "Mechanic Number", field: "Mechanic_Number", cellStyle: { minWidth: 245, textAlign: "center" } },
        { title: "Speciality", field: "Mechanic_Speciality", cellStyle: { textAlign: "center" } },
        { title: "Booking Date", field: "Booking_Date", cellStyle: { minWidth: 205, textAlign: "center" } },
        { title: "Request Date", field: "Requested_Date", cellStyle: { minWidth: 205, textAlign: "center" } },
        { title: "Status", field: "Status", cellStyle: { textAlign: "center" } },
    ];

    let url = `${API}booking`

    useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then(resp => setData(resp))
    }, [])

    return (
        <form className="data">
            <div className="Appp">
                <MaterialTable
                    title="Bookings"
                    icons={tableIcons}
                    data={data}
                    columns={columns}

                    editable={{
                        onRowDelete: (selectedRow) =>
                            new Promise((resolve, reject) => {
                                const index = data.findIndex(x => x._id === selectedRow._id);
                                const updatedRows = [...data];
                                updatedRows.splice(index, 1);

                                let deleteURL = `${API}booking`

                                fetch(deleteURL + selectedRow._id, {
                                    method: 'DELETE',
                                })
                                    .then(resp => resp.json())
                                    .then(res => {
                                        console.log({ res });
                                        console.log(updatedRows)
                                        setData(updatedRows)
                                        resolve();
                                    }).catch(err => {
                                        console.log({ err });
                                        reject(err);
                                    })
                            }),


                    }}
                    options={{
                        actionsColumnIndex: -1,
                        addRowPosition: "last",
                        headerStyle: {
                            backgroundColor: '#ff0000',
                            color: '#FFF',
                            textAlign: 'center',
                            fontSize: 18,
                            paddingLeft: 50
                        },
                        cellStyle: {

                            textAlign: 'center',
                        },

                    }}
                />
            </div>
        </form>

    );
}

export default Booking;