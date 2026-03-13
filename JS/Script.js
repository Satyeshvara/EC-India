import { CONTACT_API } from './API-Manager.js';
import { DEBOUNCE } from './Utils-Manager.js';
import { UI_ELEMENTS, RENDER_UI, LOADING_SPINNER } from './UI-Manager.js';
import { STATE, INITIALIZE_TABS } from './Tabs-Manager.js';

const SOURCE_CALLS = 'Database/EC-Calls.json';
const SOURCE_CHATS = 'Database/EC-WhatsApp.json';

const INITIALIZE_APP = async () => {
    LOADING_SPINNER();
    
    try {
        const [callsData, chatsData] = await Promise.all([
            CONTACT_API(SOURCE_CALLS),
            CONTACT_API(SOURCE_CHATS)
        ]);
        
        STATE.DATA_CALLS = Object.freeze(callsData.sort((a, b) => a.Name.localeCompare(b.Name)));
        STATE.DATA_CHATS = Object.freeze(chatsData.sort((a, b) => a.Name.localeCompare(b.Name)));
        
        INITIALIZE_TABS(() => {
            UI_ELEMENTS.SEARCH_QUERY.value = ""; 
            UI_ELEMENTS.SEARCH_CLEAR.style.visibility = "hidden";
            RENDER_CURRENT_STATE();
        });

        RENDER_CURRENT_STATE();
    } catch (err) {
        UI_ELEMENTS.CONTACT_PANEL.innerHTML = `<p style="text-align:center; padding:25px; color:#D93636;">Something went wrong.</p>`;
    }
};

const RENDER_CURRENT_STATE = () => {
    const currentData = STATE.ACTIVE_TAB === 'Calls' ? STATE.DATA_CALLS : STATE.DATA_CHATS;
    RENDER_UI(currentData, STATE.ACTIVE_TAB);
};

const SEARCH_PROCESS = DEBOUNCE((e) => {
    const term = e.target.value.trim().toLowerCase();
    
    UI_ELEMENTS.SEARCH_CLEAR.style.visibility = term.length > 0 ? "visible" : "hidden";

    const currentData = STATE.ACTIVE_TAB === 'Calls' ? STATE.DATA_CALLS : STATE.DATA_CHATS;

    const filtered = currentData.filter(contact => {
        const safeName = contact.Name.toLowerCase();
        const safeNumber = contact.Number.toString();
        
        return safeName.includes(term) || safeNumber.includes(term);
    });
    
    RENDER_UI(filtered, STATE.ACTIVE_TAB);
}, 250);

UI_ELEMENTS.SEARCH_QUERY.addEventListener('input', SEARCH_PROCESS);

UI_ELEMENTS.SEARCH_CLEAR.addEventListener('click', () => {
    UI_ELEMENTS.SEARCH_QUERY.value = "";
    UI_ELEMENTS.SEARCH_CLEAR.style.visibility = "hidden";
    
    RENDER_CURRENT_STATE();
    UI_ELEMENTS.SEARCH_QUERY.focus();
});

document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

INITIALIZE_APP();

const DEV_OVERVIEW = document.getElementById('DEV_OVERVIEW');
const DEV_OVERLAY = document.getElementById('DEV_OVERLAY');
const DEV_OVERLAY_CLOSE = document.getElementById('DEV_OVERLAY_CLOSE');

if (DEV_OVERVIEW && DEV_OVERLAY && DEV_OVERLAY_CLOSE) {
    DEV_OVERVIEW.addEventListener('click', () => {
        DEV_OVERLAY.classList.add('ACTIVE');
    });

    DEV_OVERLAY_CLOSE.addEventListener('click', () => {
        DEV_OVERLAY.classList.remove('ACTIVE');
    });
}