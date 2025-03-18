function generateImage() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const imageUpload = document.getElementById("imageUpload").files[0];
    const nameInput = document.getElementById("nameInput").value;

    if (!imageUpload || !nameInput) {
        alert("Please upload an image and enter your name.");
        return;
    }

    const template = new Image();
    template.src = "template.png"; // Replace with your actual template file

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(event) {
        img.src = event.target.result;
    };

    img.onload = function() {
        template.onload = function() {
            canvas.width = template.width;
            canvas.height = template.height;

            // Draw the template background
            ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

            // Define placeholder positions (adjust these values)
            const photoX = 200, photoY = 250, photoWidth = 200, photoHeight = 200;
            const textX = 400, textY = 300;

            // Draw uploaded photo inside the placeholder
            ctx.drawImage(img, photoX, photoY, photoWidth, photoHeight);

            // Add the user's name to the template
            ctx.fillStyle = "black";
            ctx.font = "bold 30px Arial";
            ctx.fillText(nameInput, textX, textY);

            // Show preview
            const dataURL = canvas.toDataURL("image/png");
            document.getElementById("preview").src = dataURL;
            document.getElementById("downloadLink").href = dataURL;
            document.getElementById("downloadLink").style.display = "block";
        };
    };

    reader.readAsDataURL(imageUpload);
}