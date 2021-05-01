import React, { useState, useEffect, useCallback, useMemo } from "react"; 
import Col from 'react-bootstrap/Col'  
import Row from 'react-bootstrap/Row'
import { useDropzone } from 'react-dropzone';
import "./assets/style.css"

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
  cursor: "pointer"
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};
const DragDropImage = (props) => { 
  const [EditType, setEditType] = useState("create");

  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    props.handleUpload(acceptedFiles,props.fieldName)
    // console.log("this is new file ", JSON.stringify(acceptedFiles)); 
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));   
  }, []);


  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg'
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  const thumbs = files.map(file => (
    <div className="preview-image-container" key={file.name}>
      <img
        src={file.preview}
        alt={file.name}
        className="preview-image"
      ></img><span onClick={() => {
        var tempFiles = []
        files.map(singleFile => {
          if (singleFile.name !== file.name) {
            tempFiles.push(singleFile)
          }
        })
        setFiles(tempFiles)
     
      }} className="btn-remove">X</span>
    </div>
  ));
  
  // useEffect(() => () => {
  //   props.handleUpload(files,props.fieldName)
  // }, [files]);
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  return ( 
      <Row  >
        <Col className=" " md={12} sm={12} lg={12}> 
            <section>
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <div>Drag and drop stamp here.</div>
                <div>or</div>
                <div>Click to choose file</div> 
              </div> 
              <aside className={files.length > 4 ? "d-flex scroll" : "d-flex "} >
                {thumbs}
              </aside>
            </section>
       
        </Col>
      </Row>  
  );
};
export default DragDropImage;

