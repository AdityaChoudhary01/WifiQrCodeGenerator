function generateQRCode() {
    const ssid = document.getElementById("ssid").value;
    const security = document.getElementById("security").value;
    const password = document.getElementById("password").value;
    const isHidden = document.getElementById("hidden").checked;
    const feedback = document.getElementById("feedback");
    const qrcodeContainer = document.getElementById("qrcode-container");
    const qrcodeImg = document.getElementById("qrcode");
    const downloadBtn = document.getElementById("download-btn");

    if (!ssid) {
        feedback.textContent = "Please enter the Network Name (SSID).";
        return;
    }

    if (security !== 'nopass' && !password) {
        feedback.textContent = "Please provide a password for the selected security type.";
        return;
    }

    feedback.textContent = "";

    const data = `WIFI:T:${security};S:${ssid};P:${password};H:${isHidden};`;
    // We add `&format=png` to ensure we get a PNG file for download
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=250x250&color=333&bgcolor=fff&format=png`;

    qrcodeImg.src = url;

    qrcodeImg.onload = function() {
        qrcodeContainer.classList.add("show");
        // Show the download button
        downloadBtn.style.display = "flex";
    }
}

function downloadQRCode() {
    const qrcodeImg = document.getElementById("qrcode");
    const downloadLink = document.createElement("a");

    // The fetch API is used to get the image as a blob
    fetch(qrcodeImg.src)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            downloadLink.href = blobUrl;
            downloadLink.download = "wifi-qrcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(blobUrl); // Clean up the blob URL
        });
}
