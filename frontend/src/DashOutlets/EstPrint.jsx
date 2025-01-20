// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function EstPrint() {
//     const { id: book_id } = useParams();
//     const [data, setData] = useState([]);
//     const [supplierData, setSupplierData] = useState([]);
//     // const [clickedRows, setClickedRows] = useState(new Set());
//     // const [clickedRows, setClickedRows] = useState(new Set());
//     const [storedRows, setStoredRows] = useState(new Set());

//     useEffect(() => {
//         const fetchImplementedItems = async () => {
//     try {
//         const response = await axios.get(`http://localhost:8081/api/imp/implementedItems/${book_id}`);
//         setStoredRows(response.data)
//         // setClickedRows(implementedRows);
//     } catch (error) {
//         console.error('Error fetching implemented items:', error);
//     }
// };


//         fetchData(
//             `http://localhost:8081/api/est/fetchAllCategories/${book_id}`,
//             setData,
//             groupDataBySupplier
//         );
//         fetchImplementedItems();
//     }, [book_id]);

//     const groupDataBySupplier = (categories) => {
//     const grouped = {};

//     categories.forEach((item) => {
//         const {
//             Suppliers, MatItem, MatCost, MatQuantity,
//             LabItem, LabCost, LabQuantity, MacItem,
//             MacCost, MacQuantity, TransItem, TransCost,
//             TransQuantity, WelItem, WelCost, WelQuantity,
//             SunItem, SunCost, SunQuantity, isImplemented,
//         } = item;

//         if (!grouped[Suppliers]) {
//             grouped[Suppliers] = {
//                 supplierName: Suppliers,
//                 items: [],
//                 total: 0,
//             };
//         }

//         const addItem = (itemName, itemCost, itemQuantity, isLabor = false) => {
//             if (itemName && itemCost) {
//                 const cost = parseFloat(itemCost);
//                 const quantity = parseFloat(itemQuantity);
//                 const subtotal = isLabor ? cost : cost * quantity;
//                 grouped[Suppliers].items.push({
//                     Item: itemName, Cost: cost, Quantity: quantity, subtotal, isImplemented,
//                 });
//                 grouped[Suppliers].total += subtotal;
//             }
//         };

//         addItem(MatItem, MatCost, MatQuantity);
//         addItem(LabItem, LabCost, LabQuantity, true); // Handle labor items differently
//         addItem(MacItem, MacCost, MacQuantity);
//         addItem(TransItem, TransCost, TransQuantity);
//         addItem(WelItem, WelCost, WelQuantity);
//         addItem(SunItem, SunCost, SunQuantity);
//     });

//     return Object.values(grouped);
// };

//     const fetchData = async (url, setDataCallback, groupDataCallback) => {
//         try {
//             const response = await axios.get(url);
//             const groupedData = groupDataCallback(response.data);
//             setDataCallback(groupedData);


//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData(
//             `http://localhost:8081/api/est/fetchAllCategories/${book_id}`,
//             setData,
//             groupDataBySupplier
//         );
//     }, [book_id]);
//     useEffect(() => {
//         fetchData(
//             `http://localhost:8081/api/sup/fetchAllCategories/${book_id}`,
//             setSupplierData,
//             groupDataBySupplier
//         );
//     }, [book_id]);

//    const handleRowClick = async (supplier, item, category, cost, quantity) => {
//     try {
//         const response = await axios.post(`http://localhost:8081/api/est/implementmat/${book_id}`, {
//             supplier,
//             category,
//             item,
//             cost,
//             quantity,
//             logbookID: book_id,
//         });

//         const { id } = response.data;

//         // Mark the item as stored in the backend
//         // await axios.patch(`http://localhost:8081/api/imp/implementmat/${id}`, { stored: true });

//         // // Update the state to show the tick
//         // setClickedRows((prev) => {
//         //     const updated = new Set(prev);
//         //     updated.add(`${supplier}-${item}`);
//         //     return updated;
//         // });
//     } catch (error) {
//         if (error.response && error.response.status === 400) {
//             alert(error.response.data.error);
//         } else {
//             console.error('Error adding item to implementmat:', error);
//         }
//     }
// };

//     const renderTable = (tableData) => (
//     <table className='table'>
//         <thead>
//             <tr>
//                 <th>Supplier</th>
//                 <th>Item</th>
//                 <th>Cost</th>
//                 <th>Quantity</th>
//                 <th>Subtotal</th>
//                 <th>Total</th>
//                 <th>Implemented</th>
//             </tr>
//         </thead>
//         <tbody>
//             {tableData.map((supplierData, index) =>
//                 supplierData.items.map((item, idx) => (
//                     <tr
//                         key={`${index}-${idx}`}
//                         onClick={() =>
//                             handleRowClick(
//                                 supplierData.supplierName,
//                                 item.Item,
//                                 'EstimateCategory',
//                                 item.Cost,
//                                 item.Quantity
//                             )
//                         }
//                     >
//                         {idx === 0 && (
//                             <td rowSpan={supplierData.items.length} style={{ textAlign: 'left' }}>
//                                 {supplierData.supplierName}
//                             </td>
//                         )}
//                         <td>{item.Item}</td>
//                         <td>{item.Cost}</td>
//                         <td>{item.Quantity}</td>
//                         <td>{item.subtotal.toFixed(2)}</td>
//                         {idx === 0 && (
//                             <td rowSpan={supplierData.items.length}>
//                                 {supplierData.total.toFixed(2)}
//                             </td>
//                         )}
//                         <td>
//                             {Array.isArray(storedRows) && storedRows.map((storedRow) => (
//                                 storedRow.supplier === supplierData.supplierName &&
//                                 storedRow.item === item.Item && (
//                                     <span key={`${supplierData.supplierName}-${item.Item}`}>
//                                         {/* tick */}
//                                         &#10003;
//                                     </span>
//                                 )
//                             ))}
//                         </td>
//                     </tr>
//                 ))
//             )}
//         </tbody>
//     </table>
// );

//     return (
//         <div className='m-4'>
//             <h2>Estimation Details</h2>
//             {data.length === 0 ? (
//                 <p>Loading or no data available...</p>
//             ) : (
//                 renderTable(data)
//             )}
//             {/* <h2>Supplier Details</h2>
//             {supplierData.length === 0 ? (
//                 <p>Loading or no data available...</p>
//             ) : (
//                 renderTable(supplierData)
//             )} */}
//         </div>
//     );
// }

// export default EstPrint;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EstPrint() {
    const { id: book_id } = useParams();
    const [data, setData] = useState([]);
    const [storedRows, setStoredRows] = useState(new Set());

    useEffect(() => {
        const fetchImplementedItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/imp/implementedItems/${book_id}`);
                setStoredRows(new Set(response.data.map(item => `${item.supplier}-${item.item}`)));
            } catch (error) {
                console.error('Error fetching implemented items:', error);
            }
        };

        fetchData(
            `http://localhost:8081/api/est/fetchAllCategories/${book_id}`,
            setData,
            groupDataBySupplier
        );
        fetchImplementedItems();
    }, [book_id]);

    const groupDataBySupplier = (categories) => {
        const grouped = {};

        categories.forEach((item) => {
            const {
                Suppliers, MatItem, MatCost, MatQuantity,
                LabItem, LabCost, LabQuantity, MacItem,
                MacCost, MacQuantity, TransItem, TransCost,
                TransQuantity, WelItem, WelCost, WelQuantity,
                SunItem, SunCost, SunQuantity, isImplemented,
            } = item;

            if (!grouped[Suppliers]) {
                grouped[Suppliers] = {
                    supplierName: Suppliers,
                    items: [],
                    total: 0,
                };
            }

            const addItem = (itemName, itemCost, itemQuantity, category) => {
                if (itemName && itemCost) {
                    const cost = parseFloat(itemCost);
                    const quantity = parseFloat(itemQuantity);
                    const subtotal = cost * quantity;
                    grouped[Suppliers].items.push({
                        Item: itemName, Cost: cost, Quantity: quantity, subtotal, isImplemented, category,
                    });
                    grouped[Suppliers].total += subtotal;
                }
            };

            addItem(MatItem, MatCost, MatQuantity, 'Material');
            addItem(LabItem, LabCost, LabQuantity, 'Labour');
            addItem(MacItem, MacCost, MacQuantity, 'Machinery');
            addItem(TransItem, TransCost, TransQuantity, 'Transport');
            addItem(WelItem, WelCost, WelQuantity, 'Welding');
            addItem(SunItem, SunCost, SunQuantity, 'Sundries');
        });

        return Object.values(grouped);
    };

    const fetchData = async (url, setDataCallback, groupDataCallback) => {
        try {
            const response = await axios.get(url);
            const groupedData = groupDataCallback(response.data);
            setDataCallback(groupedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // const handleRowClick = async (supplier, item, category, cost, quantity) => {
    //     try {
    //         const response = await axios.post(`http://localhost:8081/api/imp/implementmat/${book_id}`, {
    //             supplier,
    //             category,
    //             item,
    //             cost,
    //             quantity,
    //             logbookID: book_id,
    //         });

    //         const { id } = response.data;

    //         // Mark the item as stored in the backend
    //         await axios.patch(`http://localhost:8081/api/imp/implementmat/${id}`, { stored: true });

    //         // Update the state to show the tick
    //         setStoredRows((prev) => {
    //             const updated = new Set(prev);
    //             updated.add(`${supplier}-${item}`);
    //             return updated;
    //         });
    //     } catch (error) {
    //         if (error.response && error.response.status === 400) {
    //             alert(error.response.data.error);
    //         } else {
    //             console.error('Error adding item to implementmat:', error);
    //         }
    //     }
    // };

    const handleRowClick = async (supplier, item, category, cost, quantity) => {
    try {
        const response = await axios.post(`http://localhost:8081/api/imp/implementmat/${book_id}`, {
            supplier,
            category,
            item,
            cost,
            quantity,
            logbookID: book_id,
        });

        const { id } = response.data;

        // Mark the item as stored in the backend
        await axios.patch(`http://localhost:8081/api/imp/implementmat/${id}`, { stored: true });

        // Update the state to show the tick for the specific supplier-item-category combination
        setStoredRows((prev) => {
            const updated = new Set(prev);
            updated.add(`${id}-${supplier}-${item}-${category}`);
            return updated;
        });
    } catch (error) {
        if (error.response && error.response.status === 400) {
            alert(error.response.data.error);
        } else {
            console.error('Error adding item to implementmat:', error);
        }
    }
};

// const fetchImplementedItems = async () => {
//     try {
//         const response = await axios.get(`http://localhost:8081/api/imp/implementedItems/${book_id}`);
//         setStoredRows(new Set(response.data.map(item => `${item.supplier}-${item.item}`)));
//     } catch (error) {
//         console.error('Error fetching implemented items:', error);
//     }
// };


    const renderTable = (tableData) => (
        <table className='table'>
            <thead>
                <tr>
                    <th>Supplier</th>
                    <th>Item</th>
                    <th>Cost</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Total</th>
                    <th>Implemented</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((supplierData, index) =>
                    supplierData.items.map((item, idx) => (
                        <tr
                            key={`${index}-${idx}`}
                            onClick={() =>
                                handleRowClick(
                                    supplierData.supplierName,
                                    item.Item,
                                    item.category,
                                    item.Cost,
                                    item.Quantity,
                                )
                            }
                        >
                            {idx === 0 && (
                                <td rowSpan={supplierData.items.length} style={{ textAlign: 'left' }}>
                                    {supplierData.supplierName}
                                </td>
                            )}
                            <td>{item.Item}</td>
                            <td>{item.Cost}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.subtotal.toFixed(2)}</td>
                            {idx === 0 && (
                                <td rowSpan={supplierData.items.length}>
                                    {supplierData.total.toFixed(2)}
                                </td>
                            )}
                            <td>
                                {storedRows.has(`${supplierData.supplierName}-${item.Item}`) && (
                                    <span>&#10003;</span>
                                )}
                            </td>

                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );

    return (
        <div className='m-4'>
            <h2>Estimation Details</h2>
            {data.length === 0 ? (
                <p>Loading or no data available...</p>
            ) : (
                renderTable(data)
            )}
        </div>
    );
}

export default EstPrint;