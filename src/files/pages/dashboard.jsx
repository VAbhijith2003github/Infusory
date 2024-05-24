import React, { useState, useEffect } from "react";
import { imageDB } from "../../firebase-config";
import { ref, listAll, getMetadata } from "firebase/storage";
import Sidebar from "../../components/sidebar";
import { deleteObject } from "firebase/storage";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const listRef = ref(imageDB, "glb-files");
    listAll(listRef)
      .then((res) => {
        const filePromises = res.items.map((itemRef) =>
          getMetadata(itemRef).then((metadata) => ({
            ...metadata,
            ref: itemRef,
          }))
        );
        Promise.all(filePromises).then((files) => setFiles(files));
      })
      .catch((error) => console.error(error));
  }, [fetching]);

  const handleDelete = (file) => {
    deleteObject(file.ref)
      .then(() => console.log("File deleted successfully"))
      .catch((error) => console.error(error));
    setFetching(!fetching);
  };

  const handleView = (file) => {
    const fileName = encodeURIComponent(file.name);
    window.location.href = `/view/${fileName}`;
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <table style={{ width: "80%" }}>
          <thead>
            <tr
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                color: "white",
              }}
            >
              <th style={{ width: "10px" }}>S.no</th>
              <th style={{ width: "140px" }}>File Name</th>
              <th style={{ width: "140px" }}>Date of Upload</th>
              <th style={{ width: "140px" }}>Size (bytes)</th>
              <th style={{ width: "140px" }}>Delete</th>
              <th style={{ width: "140px" }}>View</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr
                key={file.ref.fullPath}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  color: "white",
                }}
              >
                <td style={{ width: "10px" }}>{index + 1}</td>
                <td style={{ width: "140px" }}>{file.name}</td>
                <td style={{ width: "140px" }}>
                  {new Date(file.timeCreated).toLocaleString()}
                </td>
                <td style={{ width: "140px" }}>{file.size}</td>
                <td style={{ width: "140px" }}>
                  <button onClick={() => handleDelete(file)}>Delete</button>
                </td>
                <td style={{ width: "140px" }}>
                  <button onClick={() => handleView(file)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
