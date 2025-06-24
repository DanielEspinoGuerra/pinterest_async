import './Message.scss';

export function renderMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'message';
    msg.textContent = text;
    return msg;
}