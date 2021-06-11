import React, { useRef } from "react";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { FileDrop } from 'react-file-drop'
const ImageDragAndDrop = (props) => {
  const handleUplpoad = (files => {
    props.handleUpload(files[0], props.fieldName)
  });

  const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };

  const fileInputRef = useRef(null);
  const onFileInputChange = (event) => {
    event.preventDefault();
    const { files } = event.target;
    props.handleUpload(files[0], props.fieldName)
  }

  return (
    <Row  >
      <Col style={styles} className=" " md={12} sm={12} lg={12}>

        <FileDrop

          // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
          // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
          // onFrameDrop={(event) => console.log('onFrameDrop', event)}
          // onDragOver={(event) => console.log('onDragOver', event)}
          // onDragLeave={(event) => console.log("image uploaded successfully")} 
          onDrop={(files, event) => handleUplpoad(files)}
        >
          Drop your Stamp here!
        </FileDrop>
        <hr />
        <input
          onChange={onFileInputChange}
          ref={fileInputRef}
          type="file"
          className="hidden mt-3"
        />
      </Col>
    </Row>
  );
};
export default ImageDragAndDrop;

