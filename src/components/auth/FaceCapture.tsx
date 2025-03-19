
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw } from "lucide-react";

interface FaceCaptureProps {
  onCapture: (imageData: string) => void;
  isVerifying: boolean;
}

const FaceCapture = ({ onCapture, isVerifying }: FaceCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Start camera when component mounts
    startCamera();
    
    // Clean up function to stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setErrorMessage(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsReady(true);
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setErrorMessage("Camera access denied or not available. Please check your browser permissions.");
    }
  };

  const takePhoto = () => {
    if (!canvasRef.current || !videoRef.current || !isReady) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    const context = canvas.getContext("2d");
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to data URL
    const imageData = canvas.toDataURL("image/png");
    
    // Call the onCapture callback with the image data
    onCapture(imageData);
    
    // Stop the camera after capturing
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
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
            onClick={startCamera}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black mb-4">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Face outline guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-3/4 h-3/4 border-2 border-white/50 rounded-full"></div>
            </div>
          </div>
          
          {isVerifying ? (
            <div className="text-center text-white/80">
              <div className="animate-pulse">Verifying your identity...</div>
            </div>
          ) : (
            <Button 
              onClick={takePhoto} 
              disabled={!isReady} 
              className="w-full bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
            >
              <Camera className="mr-2 h-4 w-4" />
              {isReady ? "Capture" : "Initializing Camera..."}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default FaceCapture;
