const socket = io();

let nickname = "";


function joinChat() {

    const input =
        document.getElementById("nickname");

    nickname = input.value.trim();


    if (!nickname) {

        document.getElementById(
            "login-error"
        ).textContent =
            "Please enter a nickname.";

        return;
    }


    socket.emit(
        "join",
        {
            nickname: nickname
        }
    );
}


document
    .getElementById("nickname")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                joinChat();

            }

        }
    );


socket.on(
    "join_error",
    function(data) {

        document.getElementById(
            "login-error"
        ).textContent =
            data.message;

    }
);


socket.on(
    "system_message",
    function(data) {

        addSystemMessage(
            data.message
        );

        if (
            data.message ===
            nickname + " joined the chat."
        ) {

            document
                .getElementById(
                    "login-screen"
                )
                .classList.add("hidden");

            document
                .getElementById(
                    "chat-screen"
                )
                .classList.remove("hidden");

            document
                .getElementById(
                    "current-user"
                )
                .textContent =
                "You: " + nickname;
        }

    }
);


socket.on(
    "chat_message",
    function(data) {

        addMessage(
            data.nickname,
            data.message
        );

    }
);


socket.on(
    "user_list",
    function(data) {

        const list =
            document.getElementById(
                "user-list"
            );

        list.innerHTML = "";


        data.users.forEach(
            function(user) {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className = "user";

                div.textContent = user;

                list.appendChild(div);

            }
        );

    }
);


function sendMessage(event) {

    event.preventDefault();


    const input =
        document.getElementById(
            "message-input"
        );

    const message =
        input.value.trim();


    if (!message) {
        return;
    }


    socket.emit(
        "message",
        {
            message: message
        }
    );


    input.value = "";

    input.focus();
}


function addMessage(
    user,
    message
) {

    const container =
        document.getElementById(
            "messages"
        );


    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "message";


    const name =
        document.createElement(
            "div"
        );

    name.className = "name";

    name.textContent = user;


    const bubble =
        document.createElement(
            "div"
        );

    bubble.className = "bubble";

    bubble.textContent =
        message;


    wrapper.appendChild(name);

    wrapper.appendChild(bubble);

    container.appendChild(wrapper);


    container.scrollTop =
        container.scrollHeight;
}


function addSystemMessage(message) {

    const container =
        document.getElementById(
            "messages"
        );


    const div =
        document.createElement(
            "div"
        );

    div.className =
        "system-message";

    div.textContent =
        message;


    container.appendChild(div);

    container.scrollTop =
        container.scrollHeight;
}