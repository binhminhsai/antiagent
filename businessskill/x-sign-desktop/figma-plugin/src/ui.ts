import { toBinary } from '@divriots/c2d-sdk';

console.log('Figma Plugin UI started. Connecting to WS...');
const connect = () => {
    // Figma plugins can open websockets inside the UI iframe
    const ws = new WebSocket('ws://localhost:3000/ws');

    ws.onopen = () => {
        console.log('Connected to Auto-Figma WebSocket Server');
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.type === 'START_RENDER') {
                console.log('Received payload from server. Processing binaries...');
                const payload = {
                    output_model: data.payload.model,
                    output_images: toBinary(data.payload.images)
                };
                parent.postMessage({ pluginMessage: { type: 'render', payload } }, '*');
            }
        } catch (e) {
            console.error('WebSocket message parsing error', e);
        }
    };

    ws.onclose = () => {
        console.log('WebSocket disconnected. Reconnecting in 3s...');
        setTimeout(connect, 3000);
    };
};

connect();
