import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

function Billing() {

    const [data, setData] = useState([]);
    const columns = [

        { title: "Customer Name", field: "customerName" },
        { title: "Email", field: "email" },
        { title: "Contact No", field: "contactNo" },
        { title: "Bill", field: "bill" },
    ];

    useEffect(() => {
        fetch("http://localhost:5000/api/users")
            .then(resp => resp.json())
            .then(resp => setData(resp))
    }, [])

    return (
        <form className="data">
            <div className="App">
                <MaterialTable
                    title="USER"
                    data={data}
                    columns={columns}

                    editable={{

                        onRowAdd: (newRow) =>
                            new Promise((resolve, reject) => {
                                const updatedRows = [
                                    ...data,
                                    { ...newRow }
                                ];
                                fetch("http://localhost:5000/api/users", {

                                    method: 'POST',

                                    body: JSON.stringify({
                                        customerName: newRow.customerName,
                                        email: newRow.email,
                                        contactNo: newRow.contactNo,
                                        bill: newRow.bilcustomerN
                                    }),
                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8',
                                    },
                                })
                                    .then(resp => resp.json())
                                    .then(res => {
                                        console.log(res);
                                        setData([...updatedRows])
                                        resolve();
                                    }).catch(err => {
                                        reject(err);
                                    })
                            }),

                        onRowDelete: (selectedRow) =>
                            new Promise((resolve, reject) => {
                                const index = data.findIndex(x => x._id === selectedRow._id);
                                const updatedRows = [...data];
                                updatedRows.splice(index, 1);
                                fetch("http://localhost:5000/api/users/" + selectedRow._id, {
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

                        onRowUpdate: (updatedRow, oldRow) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {

                                    const index = data.findIndex(x => x._id === oldRow._id);
                                    const updatedRows = [...data];
                                    updatedRows[index] = updatedRow;
                                    fetch('http://localhost:5000/api/users/' + oldRow._id, {
                                        method: 'PUT',
                                        body: JSON.stringify({
                                            customerName: updatedRow.customerName,
                                            email: updatedRow.email,
                                            contactNo: updatedRow.contactNo,
                                            bill: updatedRow.bill
                                        }),
                                        headers: {
                                            'Content-type': 'application/json; charset=UTF-8',
                                        },
                                    })
                                        .then((response) => response.json())
                                        .then((json) => {
                                            console.log({ updatedRows })
                                            console.log({ json })
                                            setData([...updatedRows])
                                            resolve();
                                        }).catch(err => {
                                            console.log({ err });
                                            reject(err);
                                        })
                                }, 100)

                            })
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        addRowPosition: "last"
                    }}
                />
            </div>
        </form>

    );
}

export default Billing;