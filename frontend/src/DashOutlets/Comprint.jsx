import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, pdf } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import axios from 'axios';
import './dashout.css';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  view: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
  },
  OutLine: {
    border: '1px solid black',
    // paddingBottom: 50,
    height: '100%',

  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  table: {
    display: 'flex',
    flexDirection: 'row',
  },
  rightAlignedContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  table1: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  table2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  table3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    width: '75%',
  },
  view1: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  table4: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  tableCell: {
    border: '1px solid black',
    padding: 5,
    flex: 1,
    textAlign: 'center',
  },
  tableCellTitle: {
    border: '1px solid black',
    padding: 5,
    flex: 1,
    fontWeight: 'bold',
  },
  tableCellTitle2:{
    border: '1px solid black',
    padding: 5,
    flex: 1,
    width: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section1: {
    padding: 5,
  },
  textarea: {
    border: '1px solid black',
    padding: 20,
    height: 100,
  },
  tableCellTitleNo: {
    width: '10%',  // Example width for "No"
  },
  tableCellTitleCost: {
    width: '20%',  // Example width for "COST"
  },
  tableCellTitleQty: {
    width: '15%',  // Example width for "Qty"
  },
  tableCellTitleTotal: {
    width: '25%',  // Example width for "TOTAL"
  },
  tableCellTitleSign: {
    width: '30%',  // Example width for "Sign"
  },
});

const PrintDocument = ({ values, valuesImp, Summary, Material , Out}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.OutLine}>
        <View style={styles.section1}>
        <Text style={styles.header}>Road Development Authority</Text>
        <Text>Mechanical workshop Anuradhapura</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableCellTitle}><Text>Job No:</Text></View>
          <View style={styles.tableCell}><Text>{values.id}</Text></View>
          <View style={styles.tableCellTitle}><Text>Vehicle/ Machine Number:</Text></View>
          <View style={styles.tableCell}><Text>{values.Vehicle_num}</Text></View>
          <View style={styles.tableCellTitle}><Text>Type of Vehicle/ Machine:</Text></View>
          <View style={styles.tableCell}><Text>{values.Vehicle_type}</Text></View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableCellTitle}><Text>Division:</Text></View>
          <View style={styles.tableCell}><Text>{values.Location}</Text></View>
          <View style={styles.tableCellTitle}><Text>Request Ref:</Text></View>
          <View style={styles.tableCell}><Text>{values.Reference}</Text></View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableCellTitle}><Text>Date Inspected:</Text></View>
          <View style={styles.tableCell}><Text>12/07/2024</Text></View>
          <View style={styles.tableCellTitle}><Text>TR/ Check List:</Text></View>
          <View style={styles.tableCell}><Text>{values.Response}</Text></View>
        </View>
         <View style={styles.rightAlignedContainer}>
          <View style={styles.table1}>
            <View style={styles.table2}>
              <View style={styles.tableCellTitle}><Text>Job Assigned:</Text></View>
              <View style={styles.tableCell}><Text>{valuesImp.Job_Assigned}</Text></View>
            </View>
            <View style={styles.table2}>
              <View style={styles.tableCellTitle}><Text>Inspected By:</Text></View>
              <View style={styles.tableCell}><Text>{values.Inspected}</Text></View>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableCellTitle2}><Text>Initial Repairs to be carried out:</Text></View>
          <View style={styles.view}>
            <View style={styles.tableCellTitle}><Text>Job Started Date:</Text></View>
            <View style={styles.tableCell}><Text>{valuesImp.Start_Date}</Text></View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.textarea}>{values.Fault}</Text>
        </View>
        <View style={styles.table}>
          <Text style={styles.tableCellTitle2}>Additional Repairs to be carried out:</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textarea}>{valuesImp.aditional_fault}</Text>
        </View>
        <View style={styles.table3}>
          <View style={styles.tableCellTitle}><Text>ITEMS</Text></View>
          <View style={styles.tableCellTitle}><Text>COST</Text></View>
          <View style={styles.tableCellTitle}><Text>Quantity</Text></View>
          <View style={styles.tableCellTitle}><Text>TOTAL</Text></View>
        </View>
        <View style={styles.table3}>
          <View style={styles.tableCellTitle}><Text>MATERIAL</Text></View>
          <View style={styles.tableCellTitle}><Text>{Summary.totalMatCost}</Text></View>
          <View style={styles.tableCellTitle}><Text>{Summary.totalMatQ}</Text></View>
          <View style={styles.tableCellTitle}><Text>{Summary.totalMatP}</Text></View>
        </View>
        <View style={styles.table3}>
          <View style={styles.tableCellTitle}><Text>LABOUR</Text></View>
          <View style={styles.tableCellTitle}><Text>{Summary.totalLabCost}</Text></View>
          <View style={styles.tableCellTitle}><Text>-</Text></View>
          <View style={styles.tableCellTitle}><Text>{Summary.totalLabCost}</Text></View>
        </View>
        <View style={styles.table3}>
          <View style={styles.tableCellTitle}><Text>OTHER</Text></View>
          <View style={styles.tableCellTitle}><Text>
          {Summary.totalWelCost + Summary.totalMacCost + Summary.totalSunCost + Summary.totalStockCost + Summary.totalTransCost + Summary.totalOtherCost}
          </Text></View>
          <View style={styles.tableCellTitle}><Text>{Summary.totalStockQ}</Text></View>
          <View style={styles.tableCellTitle}><Text>
            {Summary.totalWelCost + Summary.totalMacCost + Summary.totalSunCost + (Summary.totalStockCost * Summary.totalStockQ) + Summary.totalTransCost + Summary.totalOtherCost}
          </Text></View>
        </View>
        <View style={styles.table3}>
          <View style={styles.tableCellTitle}><Text>TOTAL</Text></View>
          <View style={styles.tableCellTitle}><Text>
                {Summary.totalWelCost + Summary.totalMacCost + Summary.totalSunCost + Summary.totalStockCost + Summary.totalTransCost + Summary.totalOtherCost + Summary.totalLabCost + Summary.totalMatCost}
          </Text></View>
          <View style={styles.tableCellTitle}><Text>{Summary.totalStockQ + Summary.totalMatQ}</Text></View>
          <View style={styles.tableCellTitle}><Text>
                {Summary.totalStockP + Summary.totalMatP +Summary.totalWelCost + Summary.totalMacCost + Summary.totalSunCost  + Summary.totalTransCost + Summary.totalOtherCost + Summary.totalLabCost } {/* Adjust based on available data */}
          </Text></View>
        </View>
        <View style={styles.table4}>
          <View style={styles.tableCellTitle}><Text>Job entered to log book By:</Text></View>
          <View style={styles.tableCell}><Text>{valuesImp.initiated}</Text></View>
        </View>
        <View style={styles.table4}>
          <View style={styles.tableCellTitle}><Text>Repair suppervised By:</Text></View>
          <View style={styles.tableCell}><Text>{valuesImp.supervised}</Text></View>
          <View style={styles.tableCellTitle}><Text>Job initiated By:</Text></View>
          <View style={styles.tableCell}><Text>{valuesImp.initiated}</Text></View>
        </View>
        <View style={styles.table4}>
          <View style={styles.tableCellTitle}><Text>Repair approved By:</Text></View>
          <View style={styles.tableCell}><Text>{valuesImp.approved}</Text></View>
          <View style={styles.tableCellTitle}><Text>Job closed By:</Text></View>
          <View style={styles.tableCell}><Text>{valuesImp.closed}</Text></View>
        </View>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.OutLine}>
        <View style={styles.table}>
          <View style={styles.tableCellTitle2}><Text>REQUEST AND ISSUE OF SPAREPARTS</Text></View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableCellTitle2}><Text>ISSUE AND PARTS</Text></View>
        </View>
        <View style={styles.table}>
          <View style={styles.view1}>
            <View style={[styles.tableCellTitle, styles.tableCellTitleNo]}><Text>No</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleCost]}><Text>COST</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleQty]}><Text>Qty</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleTotal]}><Text>TOTAL</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleSign]}><Text>issued</Text></View>
          </View>
        </View>
        {Array.isArray(Material) && Material.map((item, index) => (
          <View style={styles.table} key={index}>
            <View style={styles.view1}>
              <View style={[styles.tableCell, styles.tableCellTitleNo]}><Text>{index + 1}</Text></View>
              <View style={[styles.tableCell, styles.tableCellTitleCost]}><Text>{item.Mat_cost}</Text></View>
              <View style={[styles.tableCell, styles.tableCellTitleQty]}><Text>{item.MatQ}</Text></View>
              {/* <View style={[styles.tableCellTitle, styles.tableCellTitleSign]}><Text>{item.Mat_cost* item.MatQ}</Text></View> */}
              <View style={[styles.tableCell, styles.tableCellTitleTotal]}><Text>{item.Mat_cost * item.MatQ}</Text></View>
              <View style={[styles.tableCell, styles.tableCellTitleSign]}><Text>{item.issued}</Text></View>
            </View>
          </View>
        ))}
        <View style={styles.table}>
          <View style={styles.tableCellTitle2}><Text>REQUEST</Text></View>
        </View>
        <View style={styles.table}>
          <View style={styles.view1}>
            <View style={[styles.tableCellTitle, styles.tableCellTitleQty]}><Text>Voucher</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleCost]}><Text>Supplier</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleTotal]}><Text>Req Date</Text></View>
            {/* <View style={[styles.tableCellTitle, styles.tableCellTitleSign]}><Text>price</Text></View> */}
            <View style={[styles.tableCellTitle, styles.tableCellTitleQty]}><Text>Sign</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleCost]}><Text>Auth</Text></View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.view1}>
            <View style={[styles.tableCellTitle, styles.tableCellTitleQty]}><Text>{valuesImp.Vaucher}</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleCost]}><Text>{valuesImp.supplier}</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleTotal]}><Text>{valuesImp.Req_date}</Text></View>
            {/* <View style={[styles.tableCellTitle, styles.tableCellTitleSign]}><Text></Text></View> */}
            <View style={[styles.tableCellTitle, styles.tableCellTitleQty]}><Text></Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleCost]}><Text>{valuesImp.Req_off}</Text></View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableCellTitle2}><Text>Outsource</Text></View>
        </View>
        <View style={styles.table}>
          <View style={styles.view1}>
            <View style={[styles.tableCellTitle, styles.tableCellTitleNo]}><Text>No</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleCost]}><Text>Date</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleQty]}><Text>Description</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleTotal]}><Text>Job_NO</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleSign]}><Text>Supplier</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleSign]}><Text>cost</Text></View>
            <View style={[styles.tableCellTitle, styles.tableCellTitleSign]}><Text>Authority</Text></View>
          </View>
        </View>
        {Array.isArray(Out) && Out.map((item, index) => (
          <View style={styles.table} key={index}>
            <View style={styles.view1}>
              <View style={[styles.tableCell, styles.tableCellTitleNo]}><Text>{index + 1}</Text></View>
              <View style={[styles.tableCell, styles.tableCellTitleCost]}><Text>{item.Date}</Text></View>
              <View style={[styles.tableCell, styles.tableCellTitleQty]}><Text>{item.Description}</Text></View>
              {/* <View style={[styles.tableCellTitle, styles.tableCellTitleSign]}><Text>{item.Mat_cost* item.MatQ}</Text></View> */}
              <View style={[styles.tableCell, styles.tableCellTitleTotal]}><Text>{item.Job_NO}</Text></View>
              <View style={[styles.tableCell, styles.tableCellTitleSign]}><Text>{item.Supplier}</Text></View>
              <View style={[styles.tableCell, styles.tableCellTitleSign]}><Text>{item.cost}</Text></View>
              <View style={[styles.tableCell, styles.tableCellTitleSign]}><Text>{item.Authority}</Text></View>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const PrintButton = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState([]); // Initialize as an array
  const [out, setOut] = useState([]);
  const [values, setValues] = useState({
    id,
    Vehicle_num: '',
    Year: '',
    Vehicle_type: '',
    Fault: '',
    Inspected: '',
    Meter: '',
    Location: '',
    Reference: '',
    Response: '',
    CrossCheck: ''
  });
  const [valuesImp, setValuesImp] = useState({
    Start_Date: '',
    Job_Assigned: '',
    Req_date: '',
    Req_off: '',
    Vaucher: '',
    Auth: '',
    supplier: '',
    supervised: '',
    initiated: '',
    closed: '',
    approved: '',
    aditional_fault: '',
  });
  const [error, setError] = useState(null);
  const [summaryData, setSummaryData] = useState({
    totalMatCost: 0,
    totalMatQ: 0,
    totalMatP: 0,
    totalLabCost: 0,
    totalLabQ: 0,
    totalLabP: 0,
    totalTransCost: 0,
    totalTransQ: 0,
    totalTransP: 0,
    totalStockCost: 0,
    totalStockQ: 0,
    totalStockP: 0,
    totalSunCost: 0,
    totalSunQ: 0,
    totalSunP: 0,
    totalWelCost: 0,
    totalWelQ: 0,
    totalWelP: 0,
    totalMacCost: 0,
    totalMacQ: 0,
    totalMacP: 0,
    totalOtherCost: 0,
    totalOtherQ: 0,
    totalOtherP: 0
  });
useEffect(() => {
        axios
            .get(`http://localhost:8081/api/logbook/log/${id}`, { withCredentials: true })
            .then((response) => {
              if (response.data && response.data.length > 0) {
                const values = response.data[0]
                setValues({
                  id: values.id,
                  Vehicle_num: values.Vehicle_num,
                  Year: values.Year,
                  Vehicle_type: values.Vehicle_type,
                  Fault: values.Fault,
                  Inspected: values.Inspected,
                  Meter: values.Meter,
                  Location: values.Location,
                  Reference: values.Reference,
                  Response: values.Response,
                  CrossCheck: values.CrossCheck
                }
                );}
            })
            .catch((err) => {
                setError('An error occurred. Please try again.');
                console.error('Error fetching data:', err);
            });
    }, [id]);
// useEffect(() => {
//     axios.get(`http://localhost:8081/api/reg/Regist/${id}`, { withCredentials: true })
//       .then(response => {
        ; // Assuming the response is an array with one object
//           setValues({
//             id: data.id,
//             Vehicle_num: data.Vehicle_num,
//             Year: data.Year,
//             Vehicle_type: data.Vehicle_type,
//             Fault: data.Fault,
//             Inspected: data.Inspected,
//             Meter: data.Meter,
//             Location: data.Location,
//             Reference: data.Reference,
//             Response: data.Response,
//             CrossCheck: data.CrossCheck
//           });
//         } else {
//           console.error('No data found');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, [id]);

// useEffect(() => {
//   const fetchDetailsImp = async () => {
//     try {
//       const res2 = await axios.get(`http://localhost:8081/api/imp/Imview/${id}`);
//       const res3 = await axios.get(`http://localhost:8081/api/comp/comp/${id}`);
//       setValuesImp(
//         res2.data[0] || {
//           Start_Date: '',
//           Job_Assigned: '',
//           Req_date: '',
//           Req_off: '',
//           Vaucher: '',
//           Auth: '',
//           supplier: ''
//         }
//       );
//       setValuesImp(prevValues => ({
//         ...prevValues,
//         ...res3.data[0] || { 
//           supervised: '',
//           initiated: '',
//           closed: '',
//           approved: '',
//           aditional_fault: '',
//         }
//       }));
//     } catch (err) {
//       console.error("Error fetching details:", err);
//       alert("Failed to fetch details. Please try again later.");
//     }
//   };

//   fetchDetailsImp();
// }
// , [id]);

// useEffect(() => {
//   const fetchDetailsImp = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8081/api/Sum/SumAll/${id}`)
//       console.log('Summary Data:', res.data);
//       const data = res.data;
//       setSummaryData({
//           totalMatCost: data.results1[0]?.totalMatCost || 0,
//           totalMatQ: data.results1[0]?.totalMatQ || 0,
//           totalMatP: data.results1[0]?.totalMatP || 0,
//           totalLabCost: data.results2[0]?.totalLabCost || 0,
//           totalLabQ: data.results2[0]?.totalLabQ || 0,
//           totalLabP: data.results2[0]?.totalLabP || 0,
//           totalTransCost: data.results3[0]?.totalTransCost || 0,
//           totalTransQ: data.results3[0]?.totalTransQ || 0,
//           totalTransP: data.results3[0]?.totalTransP || 0,
//           totalStockCost: data.results3[0]?.totalStockCost || 0,
//           totalStockQ: data.results3[0]?.totalStockQ || 0,
//           totalStockP: data.results3[0]?.totalStockP || 0,
//           totalSunCost: data.results3[0]?.totalSunCost || 0,
//           totalSunQ: data.results3[0]?.totalSunQ || 0,
//           totalSunP: data.results3[0]?.totalSunP || 0,
//           totalWelCost: data.results3[0]?.totalWelCost || 0,
//           totalWelQ: data.results3[0]?.totalWelQ || 0,
//           totalWelP: data.results3[0]?.totalWelP || 0,
//           totalMacCost: data.results3[0]?.totalMacCost || 0,
//           totalMacQ: data.results3[0]?.totalMacQ || 0,
//           totalMacP: data.results3[0]?.totalMacP || 0,
//           totalOtherCost: data.results3[0]?.totalOtherCost || 0,
//           totalOtherQ: data.results3[0]?.totalOtherQ || 0,
//           totalOtherP: data.results3[0]?.totalOtherP || 0
//         });
//     }
//     catch (err) {
//       console.error('Error fetching summary data:', err);
//       alert('Failed to fetch summary data. Please try again later.');
//     }
//   };
//   fetchDetailsImp();
// }, [id]);

  // useEffect(() => {
  //   const fetchMaterial = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8081/api/imp/ImviewMat/${id}`);
  //       setMaterial(response.data || []); // Ensure data is set as an array
  //     } catch (error) {
  //       console.error("Error fetching material data:", error);
  //       setError("Failed to fetch material data. Please try again later.");
  //     }
  //   };

  //   fetchMaterial();
  // }, [id]);

  // useEffect(() => {
  //   const fetOut = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8081/api/out/Outview/${id}`);
  //       setOut(response.data || []);
  //     } catch (error) {
  //       console.error("Error fetching out data:", error);
  //       setError("Failed to fetch out data. Please try again later.");
  //     }
  //   }
  //   fetOut();
  // }
  // , [id]);

  const handleSave = async () => {
    const blob = await pdf(<PrintDocument values={values} valuesImp={valuesImp} Summary={summaryData} Material={material} />).toBlob();
    const fileName = `Job_card${id}.pdf`;
    saveAs(blob, fileName);

    const formData = new FormData();
    formData.append('file', blob, fileName);
    formData.append('customName', fileName);

    try {
      const response = await axios.post(`http://localhost:8081/api/resource/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("File uploaded successfully");
      console.log(response.data);  // Log the server response for debugging
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };
  return (
  <div>
    <PDFViewer width="100%" height="600">
      <PrintDocument values={values} valuesImp={valuesImp} Summary={summaryData} Material={material} Out={out}/>
    </PDFViewer>
    <div className='form-Imp-btn'>
      <button onClick={handleSave}>Save</button>
    </div>
  </div>
  );
};

export default PrintButton;