from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "simple-chat-secret"

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode="threading"
)

users = {}


@app.route("/")
def home():
    return render_template("index.html")


@socketio.on("join")
def handle_join(data):

    nickname = data.get("nickname", "").strip()

    if not nickname:
        emit("join_error", {
            "message": "Nickname cannot be empty."
        })
        return

    # Check duplicate nickname
    if nickname.lower() in [name.lower() for name in users.values()]:

        emit("join_error", {
            "message": "That nickname is already in use."
        })

        return

    users[request.sid] = nickname

    emit(
        "system_message",
        {
            "message": f"{nickname} joined the chat."
        },
        broadcast=True
    )

    emit(
        "user_list",
        {
            "users": list(users.values())
        },
        broadcast=True
    )


@socketio.on("message")
def handle_message(data):

    nickname = users.get(request.sid)

    if not nickname:
        return

    message = data.get("message", "").strip()

    if not message:
        return

    emit(
        "chat_message",
        {
            "nickname": nickname,
            "message": message
        },
        broadcast=True
    )


@socketio.on("disconnect")
def handle_disconnect():

    nickname = users.pop(request.sid, None)

    if nickname:

        emit(
            "system_message",
            {
                "message": f"{nickname} left the chat."
            },
            broadcast=True
        )

        emit(
            "user_list",
            {
                "users": list(users.values())
            },
            broadcast=True
        )


if __name__ == "__main__":

    print("Chat server is running...")
    print("Open http://127.0.0.1:5000")

    socketio.run(
        app,
        host="127.0.0.1",
        port=5000,
        allow_unsafe_werkzeug=True
    )