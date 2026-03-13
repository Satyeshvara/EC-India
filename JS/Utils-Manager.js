export const DEBOUNCE = (func, delay) => {
    let timeout;
    
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

export const SANITIZATION = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    
    return div.innerHTML;
};