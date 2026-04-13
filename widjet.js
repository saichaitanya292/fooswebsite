(function () {
    const API_URL = "http://34.230.31.27:8000/api/chat"; // change if needed

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
        <div style="background:#007bff;color:white;padding:10px;border-radius:10px 10px 0 0;">
            Chatbot
        </div>
        <div id="chatMessages" style="flex:1;padding:10px;overflow-y:auto;height:280px;"></div>
        <div style="display:flex;">
            <input id="chatInput" type="text" placeholder="Type a message..." style="flex:1;padding:10px;border:none;border-top:1px solid #ccc;">
            <button id="sendBtn" style="padding:10px;background:#007bff;color:white;border:none;">Send</button>
        </div>
    `;

    document.body.appendChild(chatBox);

    // Toggle chat
    button.onclick = () => {
        chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
    };

    // Send message
    document.addEventListener("click", async function (e) {
        if (e.target && e.target.id === "sendBtn") {
            const input = document.getElementById("chatInput");
            const message = input.value;
            if (!message) return;

            const chatMessages = document.getElementById("chatMessages");

            chatMessages.innerHTML += `<div><b>You:</b> ${message}</div>`;
            input.value = "";

            try {
                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message })
                });

                const data = await res.json();

                chatMessages.innerHTML += `<div><b>Bot:</b> ${data.reply || "No response"}</div>`;
                chatMessages.scrollTop = chatMessages.scrollHeight;

            } catch (err) {
                chatMessages.innerHTML += `<div style="color:red;">Error connecting to server</div>`;
            }
        }
    });
})();
