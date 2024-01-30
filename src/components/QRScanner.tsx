import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const qrcodeRegionId = "html5qr-code-full-region";

const QRScanner = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const html5QRCodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      true
    );

    html5QRCodeScanner.render(
      (decodedText, result) => {
        console.log(`Code matched = ${decodedText}`, result);
        setData((prev) => [...prev, decodedText]);
      },
      (error) => {
        console.warn(`Code scan error = ${error}`);
      }
    );
    return () => {
      html5QRCodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);
  return (
    <div>
      <div id={qrcodeRegionId}></div>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>
            <a href={item}>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QRScanner;
