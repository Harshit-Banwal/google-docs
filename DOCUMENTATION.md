# Google Docs Clone

## Overview
This documentation outlines the architecture, technologies used, and the approach for implementing real-time document collaboration in our application.

## Architecture
Our real-time document collaboration system follows a client-server architecture model:

* Client: The client-side application where users interact with the document editor.
* Server: The server-side application responsible for handling client connections, managing documents, and facilitating real-time communication.

## Technologies Used

* Backend
1. Socket.IO: Used for enabling real-time bidirectional communication between clients and the server.
2. Express.js: A minimalist web framework for Node.js, used for building the backend server.

3. MongoDB: A NoSQL database used for storing document data.

* Frontend

1. React: A JavaScript library for building user interfaces, used for the frontend application.

2. Quill: A modern WYSIWYG text editor, used for creating and editing documents.

3. Socket.IO Client: Used for establishing a WebSocket connection with the server from the client-side.

## Real-Time Synchronization Approach
Our real-time synchronization approach involves the following steps:

Connection Establishment: When a client connects to the server, a Socket.IO connection is established.

Document Retrieval: Upon receiving a request to get a document, the server retrieves the document content from the database. If the document doesn't exist, it creates a new document.

Document Editing: Clients can edit the document using the Quill editor. Text changes made by the user are captured by the Quill editor.

Sending Changes to Server: When a user makes changes to the document, the changes (in the form of deltas) are sent to the server via Socket.IO.

Broadcasting Changes: The server receives the changes and broadcasts them to all connected clients except the sender, ensuring real-time updates across all clients.

Periodic Saving: The server periodically saves the document content to the database to ensure data persistence. This is achieved through an interval set up on the server, which triggers a save operation at regular intervals.

## Conclusion
By implementing real-time document collaboration, we provide users with a seamless and collaborative editing experience. Our system ensures that changes made by one user are instantly reflected across all connected clients, enabling efficient collaboration on documents.