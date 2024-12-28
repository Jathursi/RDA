import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EstPrint() {
    const { id: book_id } = useParams();
    const [data, setData] = useState([]);
    const [supplierData, setSupplierData] = useState([]);
    const [clickedRows, setClickedRows] = useState(new Set());

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

            const addItem = (itemName, itemCost, itemQuantity, isLabor = false) => {
                if (itemName && itemCost) {
                    const subtotal = isLabor ? itemCost : itemCost * itemQuantity;
                    grouped[Suppliers].items.push({
                        Item: itemName, Cost: itemCost, Quantity: itemQuantity, subtotal, isImplemented,
                    });
                    grouped[Suppliers].total += subtotal;
                }
            };

            addItem(MatItem, MatCost, MatQuantity);
            addItem(LabItem, LabCost, LabQuantity, true); // Handle labor items differently
            addItem(MacItem, MacCost, MacQuantity);
            addItem(TransItem, TransCost, TransQuantity);
            addItem(WelItem, WelCost, WelQuantity);
            addItem(SunItem, SunCost, SunQuantity);
        });

        return Object.values(grouped);
    };

    const fetchData = async (url, setDataCallback, groupDataCallback) => {
        try {
            const response = await axios.get(url);
            const groupedData = groupDataCallback(response.data);
            setDataCallback(groupedData);

            // Extract and set initially implemented rows
            const implementedRows = new Set(
                response.data
                    .filter((item) => item.isImplemented)
                    .map((item) => `${item.Suppliers}-${item.MatItem || item.LabItem || item.MacItem || item.TransItem || item.WelItem || item.SunItem}`)
            );
            setClickedRows(implementedRows);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(
            `http://localhost:8081/api/est/fetchAllCategories/${book_id}`,
            setData,
            groupDataBySupplier
        );
    }, [book_id]);

    const handleRowClick = async (supplier, item, category, cost, quantity) => {
    console.log('Payload:', { supplier, category, item, cost, quantity, logbookID: book_id });

    try {
        // Check if the item has already been implemented
        const response = await axios.post(`http://localhost:8081/api/est/implementmat/${book_id}`, {
            supplier,
            category,
            item,
            cost,
            quantity,
            logbookID: book_id,
        });

        // Mark the item as implemented and add it to the Set for a permanent tick mark
        setClickedRows((prev) => {
            const updated = new Set(prev);
            updated.add(`${supplier}-${item}`);
            return updated;
        });
    } catch (error) {
        console.error('Error adding item to implementmat:', error);
    }
};


    const renderTable = (tableData, isSupplierTable) => (
        <table className='table'>
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
                                    {clickedRows.has(`${supplierData.supplierName}-${item.Item}`) && (
                                        <span style={{ color: 'green' }}> ✔️</span>
                                    )}
                                </td>
                            )}
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
                renderTable(data, false)
            )}
            <h2>Supplier Details</h2>
            {supplierData.length === 0 ? (
                <p>Loading or no data available...</p>
            ) : (
                renderTable(supplierData, true)
            )}
        </div>
    );
}

export default EstPrint;
