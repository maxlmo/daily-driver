import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css'
import App from './App'
import {isChromeExtension} from './infrastructure/isChromeExtension';

const body = document.querySelector('body')
const app = document.createElement('div')

app.id = 'react-root'

if (body) {
    body.prepend(app)
}

const container = document.getElementById('react-root');
const root = createRoot(container!);

root.render(<App/>)

if (isChromeExtension) {
    app.style.display = 'none';
    chrome.runtime.onMessage.addListener(
        function (message, sender, sendResponse) {
            if (message == "on") {
                app.style.display = 'inline';
            }
            if (message == "off") {
                app.style.display = 'none';
            }
        }
    );
}
