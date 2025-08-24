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
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=250x250&color=333&bgcolor=fff&format=png`;

    qrcodeImg.src = url;

    qrcodeImg.onload = function() {
        qrcodeContainer.classList.add("show");
        downloadBtn.classList.add("visible");
    }
}

/**
 * ## THE FIX IS HERE ##
 * This function now creates a link that points directly to the QR code server's
 * download endpoint. This avoids browser security issues.
 */
function downloadQRCode() {
    const qrcodeImg = document.getElementById("qrcode");
    const downloadLink = document.createElement("a");

    // Get the image source URL and add the 'download=1' parameter to it
    // This tells the qrserver API to send the file as a download
    const downloadUrl = `${qrcodeImg.src}&download=1`;

    downloadLink.href = downloadUrl;
    downloadLink.download = "wifi-qrcode.png"; // This sets the filename for the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
