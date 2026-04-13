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
            <input id="chatInput" type="text" placeholder="Type..." style="flex:1;padding:10px;">
            <button id="sendBtn">Send</button>
        </div>
    `;

    document.body.appendChild(chatBox);

    // Toggle chat
    button.onclick = () => {
        chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
    };

    // ✅ SEND MESSAGE FUNCTION
    async function sendMessage() {
        const input = document.getElementById("chatInput");
        const message = input.value.trim();

        if (!message) return;

        const chatMessages = document.getElementById("chatMessages");

        // Show user message
        chatMessages.innerHTML += `<div><b>You:</b> ${message}</div>`;
        input.value = "";

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: message })
            });

            const data = await res.json();

            // Show bot reply
            chatMessages.innerHTML += `<div><b>Bot:</b> ${data.reply || "No response"}</div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;

        } catch (error) {
            console.error(error);
            chatMessages.innerHTML += `<div style="color:red;">Error connecting ❌</div>`;
        }
    }

    // ✅ BUTTON CLICK EVENT
    document.getElementById("sendBtn").onclick = sendMessage;

    // ✅ ENTER KEY SUPPORT
    document.getElementById("chatInput").addEventListener("keypress", function(e){
        if(e.key === "Enter"){
            sendMessage();
        }
    });

});
