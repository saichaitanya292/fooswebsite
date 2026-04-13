document.addEventListener("DOMContentLoaded", function () {

    const API_URL = "http://34.230.31.27:8000/api/chat";

    // Create chat button
    const button = document.createElement("div");
    button.innerHTML = "💬";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.background = "#007bff";
    button.style.color = "white";
    button.style.padding = "15px";
    button.style.borderRadius = "50%";
    button.style.cursor = "pointer";
    button.style.zIndex = "9999";
    document.body.appendChild(button);

    // Create chat box
    const chatBox = document.createElement("div");
    chatBox.style.position = "fixed";
    chatBox.style.bottom = "80px";
    chatBox.style.right = "20px";
    chatBox.style.width = "300px";
    chatBox.style.height = "400px";
    chatBox.style.background = "white";
    chatBox.style.border = "1px solid #ccc";
    chatBox.style.borderRadius = "10px";
    chatBox.style.display = "none";
    chatBox.style.flexDirection = "column";
    chatBox.style.zIndex = "9999";

    chatBox.innerHTML = `
        <div style="background:#007bff;color:white;padding:10px;">Chatbot</div>
        <div id="chatMessages" style="flex:1;padding:10px;overflow-y:auto;"></div>
        <div style="display:flex;">
            <input id="chatInput" type="text" style="flex:1;padding:10px;">
            <button id="sendBtn">Send</button>
        </div>
    `;

    document.body.appendChild(chatBox);

    // Toggle chat
    button.onclick = () => {
        chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
    };

});
