function generateQRCode() {
    const ssid = document.getElementById("ssid").value;
    const security = document.getElementById("security").value;
    const password = document.getElementById("password").value;
    const isHidden = document.getElementById("hidden").checked;
    const feedback = document.getElementById("feedback");
    const qrcodeContainer = document.getElementById("qrcode-container");
    const qrcodeImg = document.getElementById("qrcode");

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
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=250x250&color=333&bgcolor=fff`;

    qrcodeImg.src = url;

    qrcodeImg.onload = function() {
        qrcodeContainer.classList.add("show");
    }
}
