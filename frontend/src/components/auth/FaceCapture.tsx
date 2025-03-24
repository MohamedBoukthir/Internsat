import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw } from "lucide-react";

const FaceCapture = ({ onCapture, isVerifying }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Capture a photo from the webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    onCapture(imageSrc);  // Pass the captured image to the parent component
  };

  // Retry camera access
  const retryCamera = () => {
    setImage(null);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col items-center">
      {errorMessage ? (
        <div className="text-red-500 mb-4 text-center">
          {errorMessage}
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 w-full"
            onClick={retryCamera}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black mb-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
              height={480}
              videoConstraints={{ facingMode: "user" }}
              onUserMediaError={() => {
                setErrorMessage("Camera access denied or not available. Please check your browser permissions.");
              }}
              className="w-full h-full object-cover"
            />
          </div>

          {isVerifying ? (
            <div className="text-center text-white/80">
              <div className="animate-pulse">Verifying your identity...</div>
            </div>
          ) : (
            <Button 
              onClick={capture} 
              className="w-full bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
            >
              <Camera className="mr-2 h-4 w-4" />
              {image ? "Recapture" : "Capture"}
            </Button>
          )}

          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Captured face"
                className="w-32 h-32 object-cover rounded-full border-2 border-white/20"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FaceCapture;