import { useEffect, useState } from "react";

// A temporary URL to preview a chosen photo file (null when there is none).
// The URL's memory is freed when the file changes or the form closes.
export function usePhotoPreview(file) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return url;
}
