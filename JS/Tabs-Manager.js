export const STATE = {
    ACTIVE_TAB: 'Calls',
    DATA_CALLS: [],
    DATA_CHATS: []
};

export const INITIALIZE_TABS = (onTabChangeCallback) => {
    const tabs = document.querySelectorAll('.TABS_SWITCH');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('ACTIVE')) return;
            
            tabs.forEach(t => t.classList.remove('ACTIVE'));
            tab.classList.add('ACTIVE');
            
            STATE.ACTIVE_TAB = tab.getAttribute('Data-Tabs');
            
            if (typeof onTabChangeCallback === 'function') {
                onTabChangeCallback();
            }
        });
    });
};