export const UI_ELEMENTS = {
    CONTACT_PANEL: document.getElementById('CONTACT_PANEL'),
    CONTACT_CARD: document.getElementById('CONTACT_CARD'),
    SEARCH_QUERY: document.getElementById('SEARCH_QUERY'),
    SEARCH_CLEAR: document.getElementById('SEARCH_CLEAR')
};

export const LOADING_SPINNER = () => {
    UI_ELEMENTS.CONTACT_PANEL.innerHTML = `
        <div class="SPINNER_WRAPPER">
            <div class="SPINNER"></div>
        </div>`;
};

export const RENDER_UI = (dataArray, activeTab = 'Calls') => {
    UI_ELEMENTS.CONTACT_PANEL.innerHTML = "";
    UI_ELEMENTS.CONTACT_PANEL.classList.remove('VISIBLE');
    
    if (dataArray.length === 0) {
        UI_ELEMENTS.CONTACT_PANEL.innerHTML = `<p style="text-align:center; padding:25px; color:#808080;">No results found.</p>`;
        
        requestAnimationFrame(() => {
            UI_ELEMENTS.CONTACT_PANEL.classList.add('VISIBLE');
        });
        
        return;
    }

    const batchFragment = document.createDocumentFragment();
    let lastChar = "";

    dataArray.forEach(item => {
        const firstChar = item.Name.charAt(0).toUpperCase();
        
        if (firstChar !== lastChar) {
            lastChar = firstChar;
            
            const header = document.createElement('div');
            header.className = 'ALPHABET_GROUP';
            header.textContent = lastChar;
            
            batchFragment.appendChild(header);
        }

        const instance = UI_ELEMENTS.CONTACT_CARD.content.cloneNode(true);
        
        instance.querySelector('.CONTACT_NAME').textContent = item.Name;
        instance.querySelector('.CONTACT_NUMBER').textContent = item.Number;
        
        const actionButton = instance.querySelector('.CALL');
        const cleanNumber = item.Number.replace(/\D/g, ''); 
        
        if (activeTab === 'Calls') {
            actionButton.href = `tel:${cleanNumber}`;
            actionButton.classList.remove('WHATSAPP');
        } else {
            actionButton.href = `https://wa.me/${cleanNumber}`;
            actionButton.classList.add('WHATSAPP');
        }
        
        batchFragment.appendChild(instance);
    });

    UI_ELEMENTS.CONTACT_PANEL.appendChild(batchFragment);
    
    requestAnimationFrame(() => {
        UI_ELEMENTS.CONTACT_PANEL.classList.add('VISIBLE');
    });
};