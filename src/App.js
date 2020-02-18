/**
 * Capture And Send - Server Config
 * https://github.com:umuthan/capture-and-send.git
 *
 * Author: Umuthan Uyan
 *
 */

import React, { useState, useEffect } from 'react';
import './Assets/scss/main.scss';

import { pdf, Page, Image, Document } from '@react-pdf/renderer';

import Camera from './Components/Camera';

function App() {

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();

  const [captureCall, setCaptureCall] = useState(false);

  const [pageDimensions, setPageDimensions] = useState(0);

  useEffect(() => {
    setIsCameraOpen(true)
  }, [isCameraOpen]);

  const sendMail = () => {
    const MyDoc = (
      <Document>
        <Page size={[pageDimensions.width,pageDimensions.height]}>
          <Image src={cardImage && URL.createObjectURL(cardImage)} />
        </Page>
      </Document>
    );

    pdf(MyDoc).toBlob().then(data=>{

      const pdfData = data;

      const formData = new FormData();
      formData.append('pdf', pdfData, 'attachment.pdf');

      fetch('/send',
      {
          method: 'post',
          body: formData
      }).then(response => response.json())
      .then(resData => {
        if(resData.msg==='fail') {
          alert('There was an error. Check the server!')
        } else {
          alert('Your message successfully sent!');
        }
      });

    });

  }

  const cancel = () => {

    setCaptureCall(false);
    setCardImage(undefined);

  }

  return (
    <section id="app">
      <div id="camera">
        {cardImage && (
          <img alt="Captured" src={cardImage && URL.createObjectURL(cardImage)} />
        )}
        {isCameraOpen && (
          <Camera
              onCapture={blob => setCardImage(blob)}
              onClear={() => setCardImage(undefined)}
              setDimensions={(width,height) => setPageDimensions({width,height})}
              isCameraOpen={isCameraOpen}
              captureCall={captureCall}
            />
        )}
      </div>
      <footer>
        <div className="buttonContainer">
          { captureCall && (
            <button onClick={() => cancel()} id="cancel">Cancel</button>
          )}
        </div>
        <div className="buttonContainer">
          { captureCall ? (
            <button disabled id="capture"></button>
          ) : (
            <button onClick={() => setCaptureCall(true)} id="capture"></button>
          ) }
        </div>
        <div className="buttonContainer">
          { captureCall && (
            <button onClick={() => sendMail()} id="ready">Send</button>
          )}
        </div>
      </footer>
    </section>
  );
}

export default App;
