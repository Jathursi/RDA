import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SupPrint() {
    const { id: book_id } = useParams();
    const [data, setData] = useState([]);
    const [supsupplierData, setSupplierData] = useState([]);
    const [clickedRows, setClickedRows] = useState(new Set());

    // const groupDataBySupplier = (categories) => {
    //     const grouped = {};

    //     categories.forEach((item) => {
    //         const {
    //             Suppliers, MatItem, MatCost, MatQuantity,
    //             LabItem, LabCost, LabQuantity, MacItem,
    //             MacCost, MacQuantity, TransItem, TransCost,
    //             TransQuantity, WelItem, WelCost, WelQuantity,
    //             SunItem, SunCost, SunQuantity,
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
    //                 const subtotal = isLabor ? itemCost : itemCost * itemQuantity;
    //                 grouped[Suppliers].items.push({
    //                     Item: itemName, Cost: itemCost, Quantity: itemQuantity, subtotal,
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
    // const fetchData = async (url, setDataCallback, groupDataCallback) => {
    //     try {
    //         const response = await axios.get(url);
    //         const groupedData = groupDataCallback(response.data);
    //         setDataCallback(groupedData);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    
    const groupDataBySupplimentAndSupplier = (categories) => {
    const grouped = {};

    categories.forEach((item) => {
        const {
            no: supplimentNo,
            Suppliers,
            MatItem,
            MatCost,
            MatQuantity,
            LabItem,
            LabCost,
            LabQuantity,
            MacItem,
            MacCost,
            MacQuantity,
            TransItem,
            TransCost,
            TransQuantity,
            WelItem,
            WelCost,
            WelQuantity,
            SunItem,
            SunCost,
            SunQuantity,
        } = item;

        // Create a new suppliment group if it doesn't exist
        if (!grouped[supplimentNo]) {
            grouped[supplimentNo] = {
                supplimentNo,
                suppliers: {},
            };
        }

        const supplimentGroup = grouped[supplimentNo];

        // Create a new supplier group if it doesn't exist under the current suppliment
        if (!supplimentGroup.suppliers[Suppliers]) {
            supplimentGroup.suppliers[Suppliers] = {
                supplierName: Suppliers,
                items: [],
                total: 0,
            };
        }

        const supplierGroup = supplimentGroup.suppliers[Suppliers];

        // Add items to the supplier group
        const addItem = (itemName, itemCost, itemQuantity, isLabor = false) => {
            if (itemName && itemCost) {
                const subtotal = isLabor ? itemCost : itemCost * itemQuantity;
                supplierGroup.items.push({
                    Item: itemName,
                    Cost: itemCost,
                    Quantity: itemQuantity,
                    subtotal,
                });
                supplierGroup.total += subtotal;
            }
        };

        addItem(MatItem, MatCost, MatQuantity);
        addItem(LabItem, LabCost, LabQuantity, true); // Handle labor items differently
        addItem(MacItem, MacCost, MacQuantity);
        addItem(TransItem, TransCost, TransQuantity);
        addItem(WelItem, WelCost, WelQuantity);
        addItem(SunItem, SunCost, SunQuantity);
    });

    // Convert the grouped object into an array for easier processing in the UI
    return Object.values(grouped).map((supplimentGroup) => ({
        supplimentNo: supplimentGroup.supplimentNo,
        suppliers: Object.values(supplimentGroup.suppliers),
    }));
};

    
    useEffect(() => {
        fetchData(
            `http://localhost:8081/api/sup/fetchAllCategories/${book_id}`,
            setData,
            groupDataBySupplier
        );
    }, [book_id]);

    const handleRowClick = async (supplier, item, category, cost, quantity) => {
    console.log('Payload:', { supplier, category, item, cost, quantity, logbookID: book_id }); // Log the payload

    try {
        const response = await axios.post(`http://localhost:8081/api/est/implementmat/${book_id}`, {
            supplier,
            category,
            item,
            cost,
            quantity,
            logbookID: book_id,
        });
        console.log('Item added to implementmat:', response.data);

        // Add a tick mark by storing the clicked row
        setClickedRows((prev) => new Set(prev).add(`${supplier}-${item}`));
    } catch (error) {
        console.error('Error adding item to implementmat:', error);
    }
};


    const renderTable = (tableData, isSupplierTable) => (
        <table border="1" style={{ marginBottom: '20px', width: '70%' }}>
            <thead>
                <tr>
                    <th>Supplier</th>
                    <th>Item</th>
                    <th>Cost</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Total</th>
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
                                    isSupplierTable ? 'SupplierCategory' : 'EstimateCategory',
                                    item.Cost,
                                    item.Quantity
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
                            <td>{item.subtotal}</td>
                            {idx === 0 && (
                                <td rowSpan={supplierData.items.length}>
                                    {supplierData.total}
                                    {clickedRows.has(`${supplierData.supplierName}-${item.Item}`) && ' ✔️'}
                                </td>
                            )}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );

    return (
        <div>
            <h1>Estimation Details</h1>
            {data.length === 0 ? (
                <p>Loading or no data available...</p>
            ) : (
                renderTable(data, false)
            )}
            <h1>Supplier Details</h1>
            {supsupplierData.length === 0 ? (
                <p>Loading or no data available...</p>
            ) : (
                renderTable(supsupplierData, true)
            )}
        </div>
    );
}

export default SupPrint;
