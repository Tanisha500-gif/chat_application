# Simple Chat Application

## 1. Project Overview

The **Simple Chat Application** is a real-time network-based messaging application developed using **Python socket programming and multithreading**.

The application follows the **Client-Server Architecture**, where a central server manages connections from multiple clients and facilitates communication between them.

The server listens for incoming client connections on a specified IP address and port. Once a client connects, the client provides a nickname and can exchange messages with other connected clients.

The project demonstrates fundamental concepts of:

- Client-Server Architecture
- Computer Networking
- TCP/IP Communication
- Socket Programming
- Multithreading
- Concurrent Client Handling
- Message Broadcasting
- Connection Management
- Exception Handling
- Git and GitHub based project development

The application can be executed locally by running one server and multiple client instances.

---

## 2. Objectives

The main objectives of this project are:

1. To understand the fundamentals of Client-Server Architecture.
2. To implement TCP-based communication using Python sockets.
3. To establish communication between a server and multiple clients.
4. To understand IP addresses and port numbers.
5. To implement real-time message communication.
6. To use multithreading for handling multiple clients simultaneously.
7. To implement message broadcasting between connected clients.
8. To understand client connection and disconnection handling.
9. To gain practical experience with network programming.
10. To use Git and GitHub for version control and project management.

---

## 3. Technology Stack

| Component | Technology |
|---|---|
| Programming Language | Python |
| Networking | Python Socket Programming |
| Communication Protocol | TCP/IP |
| Concurrency | Python Threading |
| Application Type | Command-Line Application |
| Architecture | Client-Server Architecture |
| IP Version | IPv4 |
| Version Control | Git |
| Repository | GitHub |
| Development Environment | Visual Studio Code |
| Operating System | Windows / Linux / macOS |

---

## 4. System Architecture

The application follows a **Client-Server Architecture**.

The server acts as the central communication point and multiple clients connect to it.

```text
                         SIMPLE CHAT APPLICATION
                                  |
                                  |
                           +--------------+
                           |    SERVER    |
                           |              |
                           | 127.0.0.1    |
                           | Port: 5555   |
                           +------+-------+
                                  |
                    +-------------+-------------+
                    |             |             |
                    |             |             |
                    v             v             v
              +----------+  +----------+  +----------+
              | Client 1 |  | Client 2 |  | Client 3 |
              |  Alice   |  |   Bob    |  |  User 3  |
              +----------+  +----------+  +----------+
```

The communication flow is:

```text
Client
   |
   | Connect
   v
Server
   |
   | Receive Message
   |
   | Broadcast
   +--------------------+
   |                    |
   v                    v
Other Client       Other Client
```

For example:

```text
Alice
  |
  | "Hello Bob"
  v
Server
  |
  +---------> Bob
  |
  +---------> Charlie
```

The server receives the message from Alice and broadcasts it to the connected clients.

---

## 5. Application Components

The application consists of two primary components:

### 5.1 Server

The server is responsible for:

- Creating the server socket.
- Binding the socket to an IP address and port.
- Listening for incoming connections.
- Accepting client connections.
- Maintaining a list of connected clients.
- Maintaining client nicknames.
- Creating threads for connected clients.
- Receiving messages from clients.
- Broadcasting messages.
- Detecting client disconnections.
- Removing disconnected clients.

The server implementation is located in:

```text
server/server.py
```

---

### 5.2 Client

The client is responsible for:

- Creating a client socket.
- Connecting to the server.
- Providing a nickname.
- Sending messages.
- Receiving messages.
- Displaying messages received from the server.
- Maintaining communication with the server.

The client implementation is located in:

```text
client/client.py
```

---

## 6. How the System Works

The application works through the following sequence.

### Step 1: Server Initialization

The server creates a TCP socket.

```python
socket.socket(socket.AF_INET, socket.SOCK_STREAM)
```

The server then binds the socket to:

```text
IP Address: 127.0.0.1
Port: 5555
```

The server starts listening for incoming client connections.

---

### Step 2: Client Connection

A client creates its own socket and connects to the server.

```text
Client
   |
   | Connection Request
   v
Server
```

The server accepts the connection.

---

### Step 3: Nickname Registration

After connecting, the client is asked to provide a nickname.

Example:

```text
Choose your nickname: Alice
```

The server stores the nickname along with the client's socket.

---

### Step 4: Multiple Clients Connect

Multiple clients can connect to the same server.

For example:

```text
Alice
Bob
Charlie
```

The server maintains the connected clients in memory.

---

### Step 5: Client Threads

A separate thread is created for each connected client.

```text
                    SERVER
                       |
          +------------+------------+
          |            |            |
          v            v            v
      Thread 1     Thread 2     Thread 3
          |            |            |
        Alice         Bob        Charlie
```

This allows the server to communicate with multiple clients concurrently.

---

### Step 6: Sending Messages

Suppose Alice sends:

```text
Hello Bob!
```

The message is sent to the server.

The server receives the message and broadcasts it to the connected clients.

```text
Alice
  |
  | Hello Bob!
  v
Server
  |
  +-------------> Bob
  |
  +-------------> Charlie
```

The receiving clients display the message.

---

### Step 7: Client Disconnection

When a client disconnects:

1. The server detects the disconnection.
2. The client is removed from the client list.
3. The nickname is removed.
4. The socket connection is closed.
5. Other connected clients are notified.

---

## 7. Socket Programming Concepts

This project uses Python's built-in `socket` module.

### 7.1 Socket

A socket is an endpoint used for communication between two processes over a network.

The application creates a TCP socket using:

```python
socket.socket(socket.AF_INET, socket.SOCK_STREAM)
```

---

### 7.2 AF_INET

`AF_INET` specifies that the application uses **IPv4 addressing**.

---

### 7.3 SOCK_STREAM

`SOCK_STREAM` specifies a TCP socket.

TCP provides reliable and ordered data transmission.

Therefore:

```python
socket.AF_INET
```

represents IPv4 communication, while:

```python
socket.SOCK_STREAM
```

represents TCP communication.

---

## 8. IP Address and Port

The application uses:

```text
IP Address: 127.0.0.1
Port: 5555
```

### IP Address

`127.0.0.1` is the localhost address.

It refers to the same computer on which the application is running.

This allows the project to be tested locally without requiring multiple physical computers.

### Port

The port number identifies the network service with which the client wants to communicate.

The server uses:

```text
5555
```

Therefore, the server endpoint is:

```text
127.0.0.1:5555
```

---

## 9. Important Socket Operations

### Server Side

The server uses several important socket operations.

#### `bind()`

Associates the server socket with an IP address and port.

```python
server.bind((HOST, PORT))
```

#### `listen()`

Places the server into listening mode.

```python
server.listen()
```

#### `accept()`

Accepts an incoming client connection.

```python
client, address = server.accept()
```

---

### Client Side

The client uses:

#### `connect()`

Connects the client socket to the server.

```python
client.connect(('127.0.0.1', 5555))
```

---

### Communication

The application uses:

```python
send()
```

to send data and:

```python
recv()
```

to receive data.

---

## 10. Multithreading

Multithreading is one of the important concepts implemented in this project.

A single server needs to handle multiple clients at the same time.

For example:

```text
                 SERVER
                    |
       +------------+------------+
       |            |            |
       v            v            v
     Alice         Bob        Charlie
    Thread 1      Thread 2     Thread 3
```

Each client is handled by a separate thread.

The server creates a thread using:

```python
threading.Thread(target=handle, args=(client,))
```

The thread is then started using:

```python
thread.start()
```

This allows multiple clients to communicate without blocking each other.

---

## 11. Message Broadcasting

The server uses a broadcasting mechanism to distribute messages to connected clients.

Conceptually:

```text
             Alice
               |
               v
             SERVER
          /     |     \
         /      |      \
        v       v       v
      Alice     Bob   Charlie
```

The server maintains a list of connected clients.

When a message is received, it is sent to the clients in the list.

This enables real-time group communication.

---

## 12. Client Connection Management

The server maintains two important lists:

```python
clients = []
nicknames = []
```

### Clients List

Stores the socket connections of connected users.

### Nicknames List

Stores the nicknames associated with the connected clients.

The server uses these lists to:

- Track connected users.
- Send messages.
- Broadcast messages.
- Identify users.
- Remove disconnected clients.

---

## 13. Error and Disconnection Handling

The application includes basic exception handling to deal with unexpected client disconnections.

When communication fails, the server:

- Identifies the disconnected client.
- Removes the client from the list.
- Removes the associated nickname.
- Closes the socket.
- Notifies other clients.

This prevents disconnected clients from remaining in the active client list.

---

## 14. Project Structure

```text
chat_application/
│
├── client/
│   └── client.py
│
├── server/
│   └── server.py
│
├── README.md
│
└── .gitignore
```

### `client/client.py`

Contains the client-side networking and messaging implementation.

### `server/server.py`

Contains the server-side connection management, multithreading, and message broadcasting implementation.

### `README.md`

Contains complete project documentation.

### `.gitignore`

Contains files and folders that should not be tracked by Git.

---

## 15. Requirements

The project requires:

- Python 3.x
- Git
- Visual Studio Code or another Python-compatible IDE
- Windows, Linux, or macOS

The project uses Python's built-in modules:

```python
socket
threading
```

Therefore, no external Python packages are required.

---

## 16. Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Tanisha500-gif/chat_application.git
```

Move into the project directory:

```bash
cd chat_application
```

---

### Step 2: Verify Python

Run:

```bash
python --version
```

Example:

```text
Python 3.x.x
```

---

## 17. Running the Application

### Step 1: Start the Server

From the project root directory:

```bash
python server/server.py
```

The server displays:

```text
Server is running...
```

Keep the server terminal running.

---

### Step 2: Start Client 1

Open another terminal:

```bash
python client/client.py
```

Enter a nickname:

```text
Choose your nickname: Alice
```

---

### Step 3: Start Client 2

Open another terminal:

```bash
python client/client.py
```

Enter:

```text
Choose your nickname: Bob
```

---

### Step 4: Start Additional Clients

Additional clients can be started using:

```bash
python client/client.py
```

Each client can use a different nickname.

---

## 18. Example Execution

### Server

```text
Server is running...

Connected with ('127.0.0.1', 58988)
Nickname: Alice

Connected with ('127.0.0.1', 58990)
Nickname: Bob
```

### Alice

```text
Choose your nickname: Alice

Alice: Hello Bob
```

### Bob

```text
Choose your nickname: Bob

Alice: Hello Bob
Bob: Hi Alice
```

This demonstrates successful communication between multiple clients through the server.

---

## 19. Testing

The application was tested using multiple client instances.

### Test 1: Server Startup

Expected:

```text
Server is running...
```

Result:

```text
PASS
```

---

### Test 2: Client Connection

A client successfully connected to the server.

Result:

```text
PASS
```

---

### Test 3: Multiple Client Connections

Alice and Bob successfully connected simultaneously.

Result:

```text
PASS
```

---

### Test 4: Message Transmission

Messages were successfully exchanged between clients.

Result:

```text
PASS
```

---

### Test 5: Message Broadcasting

Messages sent through the server were received by connected clients.

Result:

```text
PASS
```

---

### Test 6: Client Disconnection

The server detects client disconnections and removes the disconnected client.

Result:

```text
PASS
```

---

## 20. Advantages

The application provides the following advantages:

1. Simple and lightweight implementation.
2. Real-time communication.
3. Supports multiple clients.
4. Uses reliable TCP communication.
5. Demonstrates practical networking concepts.
6. Uses Python's built-in libraries.
7. Easy to understand and extend.
8. Demonstrates concurrent programming using threads.
9. Provides practical understanding of client-server systems.

---

## 21. Current Limitations

The current implementation has several limitations:

1. No graphical user interface.
2. No user authentication.
3. No password protection.
4. No message encryption.
5. No database.
6. No persistent chat history.
7. No private messaging.
8. No file-sharing functionality.
9. Designed primarily for local testing.
10. Basic error handling.

---

## 22. Future Enhancements

The application can be extended with the following features:

### Graphical User Interface

A graphical interface can be developed using:

- Tkinter
- PyQt

### User Authentication

A login and registration system can be added.

### Database Integration

A database can store:

- User accounts
- Messages
- Chat history
- User information

### Private Messaging

Users could send messages to specific users.

Example:

```text
Alice → Bob
```

### Message History

Messages could be stored and retrieved when users reconnect.

### Encryption

Secure communication could be implemented to protect messages.

### File Sharing

Users could send files through the chat application.

### Online User List

The application could display currently connected users.

### Timestamps

Messages could display the time they were sent.

Example:

```text
[14:30] Alice: Hello!
```

---

## 23. Learning Outcomes

Through this project, the following concepts were implemented and understood:

- Client-Server Architecture
- TCP/IP Networking
- IPv4 Addressing
- Port Numbers
- Socket Programming
- TCP Connections
- `bind()`
- `listen()`
- `accept()`
- `connect()`
- `send()`
- `recv()`
- Multithreading
- Concurrent Client Handling
- Message Broadcasting
- Connection Management
- Exception Handling
- Git
- GitHub
- Project Documentation

---

## 24. Conclusion

The Simple Chat Application demonstrates the fundamentals of network communication through a practical client-server implementation.

The project uses Python TCP sockets to establish reliable communication between the server and multiple clients. Multithreading allows the server to handle multiple connected clients concurrently, while message broadcasting enables real-time communication between users.

The project provides practical experience in networking, socket programming, client-server architecture, concurrent programming, connection management, and Git/GitHub based project development.

The current implementation provides a foundation that can be extended into a more advanced messaging system with authentication, encryption, database storage, private messaging, file sharing, message history, and a graphical user interface.
