import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PropTypes from 'prop-types';

import React, { useState, useEffect, useRef } from 'react';
function App() {
  const wrapperRef = useRef(null);
  const [images, setImages] = useState([]);

  const [fileList, setFileList] = useState([]);
  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');



  const onFileDrop = async (e) => {
    const newFile = e.target.files[0];
    if (newFile)
    {
      //Bu token isteği, bunda da cors hatası veriyor
      Login();

      //Bu şu an çözmeye çalıştığım hata, yani yukarıdaki gibi cors hatası
      // UpdateImage(newFile);
    }


  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={"uploadImg"} alt="" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">
            Ready to upload
          </p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  "ImageConfig[item.type.split('/')[1]]"
                }
                alt=""
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}

App.propTypes = {
  onFileChange: PropTypes.func,
};
export default App

function Login() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "grantType": "email",
    "email": "",
    "password": ""
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://www.letgo.com/api/auth/authenticate/login", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function UpdateImage(image_file_format) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6ImViT21QTmlrIn0.eyJncmFudFR5cGUiOiJlbWFpbCIsImNsaWVudFR5cGUiOiJ3ZWIiLCJ0b2tlblR5cGUiOiJhY2Nlc3NUb2tlbiIsImlzTmV3VXNlciI6ZmFsc2UsImlhdCI6MTcwODU5NTkyOCwiZXhwIjoxNzA4NTk2ODI4LCJhdWQiOiJvbHh0ciIsImlzcyI6Im9seCIsInN1YiI6IjE2MjQ1ODc5MSIsImp0aSI6ImU0ZTk1YTdlMzFlMGY0NDZlODNhZjRkMTYwODllNTVkZGRmMDE1OTEifQ.GCACc_LvChYS9aUOzaHPlqoIWhUveDUPJnqn2Hv-kRQE2kima5uvy5llIF3uJIm0rTJvXbJI63ZgCKy--jumDrSro0cgLg4s1fLkd8FRK_ZaOUiEQxZPdEyauy7t7uVUNK97NpuxK0LZ1p3-dlsVfV_cFSr70cgF1y7Wvni9QJEycMd0nFOFLFRCr9Ze8pvCEfRiQS1cMGyKDifIrn9DC93_IMLRK8APi9uav9WEkGGc3tQPNonJ7fsRi9Jb50gY_EI8LWRMt6xzze2VX-9_92o504fCIvHEnQ9dUAEGcWMfMrXVOcCYF4jx1Z34ooTBLXRC392uhw2rbJkfBBZJRw");

  const formdata = new FormData();
  formdata.append("image", image_file_format);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  };

  fetch("https://www.letgo.com/api/v2/images", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}