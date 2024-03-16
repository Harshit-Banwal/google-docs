import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import { io } from 'socket.io-client';
import 'quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { TOOLBAR_OPTIONS } from '../utils/toolbar';

const HomeScreen = () => {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  // Set up a Socket.IO connection when the component mounts
  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Set up a Quill text editor
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText('Loading...');
    setQuill(q);
  }, []);

  // Loading the document content from the server when the component mounts
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit('get-document', documentId);
  }, [socket, quill, documentId]);

  // Set up a listener on the Quill editor instance to detect text changes made by the user.
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  //Set up a listener on the socket connection to receive text changes from the server.
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  // Set up an interval to periodically save the document content to the server.
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return <div id="container" ref={wrapperRef}></div>;
};

export default HomeScreen;
