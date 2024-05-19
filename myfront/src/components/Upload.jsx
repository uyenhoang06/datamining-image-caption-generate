import { useState } from 'react';
import axios from 'axios';

const ImageCaptionGenerator = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [captions, setCaptions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [FILES, setFILES] = useState({});
  const [myUrls, setMyUrls] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const isImageFile = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };

  const addFile = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert("Please upload an image file.");
      return;
    }

    const objectURL = URL.createObjectURL(file);
    setSelectedFiles((prevFiles) => [...prevFiles, file]);
    setPreviewUrls((prevUrls) => [...prevUrls, objectURL]);
    setFILES((prevFiles) => ({ ...prevFiles, [objectURL]: file }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      if (!isImageFile(file)) {
        alert("Please upload an image file.");
        return;
      }

      const objectURL = URL.createObjectURL(file);
      setSelectedFiles((prevFiles) => [...prevFiles, file]);
      setPreviewUrls((prevUrls) => [...prevUrls, objectURL]);
    });

    setShowResult(false);
  };

  const handleDelete = (objectURL) => {
    const fileIndex = previewUrls.indexOf(objectURL);

    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== fileIndex)
    );
    setPreviewUrls((prevUrls) => prevUrls.filter((_, index) => index !== fileIndex));
    setFILES((prevFiles) => {
      const newFiles = { ...prevFiles };
      delete newFiles[objectURL];
      return newFiles;
    });

    setCaptions((prevCaptions) => prevCaptions.filter((_, index) => index !== fileIndex));
    setMyUrls((prevUrls) => prevUrls.filter((_, index) => index !== fileIndex));
    setShowResult(false);
  };

  const handleGenerateCaption = async () => {
    if (!selectedFiles.length) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('file', file));

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setUploadStatus('Upload successful');
        setCaptions(response.data.captions);
        setShowResult(true);
        setMyUrls(previewUrls);
        setPreviewUrls([]);
        setSelectedFiles([]);
      } else {
        setUploadStatus('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload failed');
    }
  };

  const handleCancel = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
    setCaptions([]);
    setUploadStatus("");
    setFILES({});
    setShowResult(false);
  };

  const dropHandler = (ev) => {
    ev.preventDefault();
    const files = Array.from(ev.dataTransfer.files);
    files.forEach((file) => addFile(file));
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    setCounter((prev) => prev + 1);
    document.getElementById("overlay").classList.add("draggedover");
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setCounter((prev) => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        document.getElementById("overlay").classList.remove("draggedover");
      }
      return newCounter;
    });
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const getFileSize = (size) => {
    if (size > 1048576) {
      return Math.round(size / 1048576) + "mb";
    } else if (size > 1024) {
      return Math.round(size / 1024) + "kb";
    } else {
      return size + "b";
    }
  };

  return (
    <div className="my-10 md:px-14 px-4 max-w-screen-2xl mx-auto sm:px-8 md:px-16 sm:py-8">
      <div className='relative w-full max-w lg'>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob "></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>

        <main className="container mx-auto max-w-screen-lg h-full gap-10 bg-white rounded-lg">
        <article
          aria-label="File Upload Modal"
          className="relative h-full flex flex-col bg-white shadow-3xl rounded-md"
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDragEnter={dragEnterHandler}
        >
          <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
            <div className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
              </p>
              <input
                id="hidden-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                type="button"
                className="button mt-6"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                onClick={() => document.getElementById('hidden-input').click()}
              >
                Choose files
              </button>
            </div>

            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
            </h1>

            <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
              {previewUrls.length === 0 ? (
                <li
                  id="empty"
                  className="h-full w-full text-center flex flex-col items-center justify-center"
                >
                  <img
                    className="mx-auto w-32"
                    src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  />
                  <span className="text-small text-gray-500">No files selected</span>
                </li>
              ) : (
                previewUrls.map((url, index) => (
                  <li
                    key={index}
                    className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
                  >
                    <article
                      tabIndex="0"
                      className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm"
                    >
                      <img
                        src={url}
                        alt="upload preview"
                        className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                      />

                      <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                        <h1 className="flex-1">{FILES[url]?.name}</h1>
                        <div className="flex">
                          <span className="p-1">
                            <i>
                              <svg
                                className="fill-current w-4 h-4 ml-auto pt-1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                              </svg>
                            </i>
                          </span>
                          
                          <button
                            className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md"
                            onClick={() => handleDelete(url)}
                          >
                            <svg
                              className="pointer-events-none fill-current w-4 h-4 ml-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className="pointer-events-none"
                                d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                              />
                            </svg>
                          </button>
                        </div>
                      </section>
                    </article>
                  </li>
                ))
              )}
            </ul>
          </section>

          <footer className="flex justify-end px-8 pb-8 pt-4">
            <button
              id="submit"
              className="button"
              onClick={handleGenerateCaption}
            >
              Upload
            </button>
            <button
              id="cancel"
              className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </footer>
        </article>
      </main>
      </div>
      

      {showResult && (
        <section className="my-20 flex flex-col w-fit mx-auto my-10 md:px-14 px-4 max-w-screen-2xl sm:px-8 md:px-16 sm:py-8">
          <h2 className="text-lg font-semibold">Your captions here!</h2>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 py-12 lg:pb-8 lg:pt-10 ">
            {captions.map((caption, index) => (
              <li key={index} className="list-none">
                <div className="max-w-sm rounded overflow-hidden shadow-lg px-4 py-6 border border-transparent hover:border-secondary hover:shadow-lg transition duration-300 ease-in-out">
                  <img className="w-full h-[220px] object-cover rounded-md rounded-lg" src={myUrls[index]} />
                  <div className=" py-4 h-[150px]">
                    <div className="font-bold text-xl mb-2">The Caption</div>
                    <p className="text-gray-700 text-base break-words">
                      {caption}
                    </p>
                  </div>

                  <div className="py-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 hover:text-secondary transition-colors duration-300">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 hover:text-secondary transition-colors duration-300">#sport</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 hover:text-secondary transition-colors duration-300">#caption</span>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </section>

      )}
    </div>
  );
};

export default ImageCaptionGenerator;
