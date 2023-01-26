import React, { Fragment, useState } from "react";
import axios from "axios";

import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Button,
} from "@chakra-ui/react";

export const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  // uploadedFile has to be an object because we get an object as a response from the server
  const [uploadedFile, setUploadedFile] = useState({});

  const handleChange = (e) => {
    // single fileupload --> index 0 in array
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  // style input field?
  // type file --> button

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={handleChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <input type="submit" value="Upload" />
      </form>
    </Fragment>
  );
};

// return (
//     <Fragment>
//       <h1>File Upload</h1>
//       <Container>
//         <FormControl marginBottom="15px">
//           <FormLabel>Upload Picture</FormLabel>
//           <Input placeholder={filename} type="file" onChange={handleChange} />
//         </FormControl>

//         <Button colorScheme="cyan" onSubmit={handleSubmit}>
//           Upload
//         </Button>
//       </Container>
//     </Fragment>
//   );
