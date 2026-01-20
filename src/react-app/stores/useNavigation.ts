import { create } from 'zustand';

interface NavigationState {
    skipCover: boolean;
    page: string;
    pageId: string;
    setSkipCover: (skip: boolean) => void;
    setPage: (page: string) => void;
    setPageId: (id: string) => void;
    initialize: (menuItems: Array<{ id: string }>) => void;
}

export const useNavigation = create<NavigationState>((set, get) => ({
    skipCover: false,
    page: '',
    pageId: '',

    setSkipCover: (skip: boolean) => {
        set({ skipCover: skip });
        
        const params = new URLSearchParams(window.location.search);
        if (skip) {
            params.set('skipCover', '');
        } else {
            params.delete('skipCover');
        }
        
        const { page, pageId } = get();
        const path = pageId ? `/${page}/${pageId}` : `/${page}`;
        const newUrl = params.toString() ? `${path}?${params.toString()}` : path;
        window.history.pushState({}, '', newUrl);
    },

    setPage: (page: string) => {
        set({ page, pageId: '' });
        
        const params = new URLSearchParams(window.location.search);
        const newUrl = params.toString() ? `/${page}?${params.toString()}` : `/${page}`;
        window.history.pushState({}, '', newUrl);
    },

    setPageId: (id: string) => {
        set({ pageId: id });
        
        const { page } = get();
        const params = new URLSearchParams(window.location.search);
        const path = id ? `/${page}/${id}` : `/${page}`;
        const newUrl = params.toString() ? `${path}?${params.toString()}` : path;
        window.history.pushState({}, '', newUrl);
    },

    initialize: (menuItems: Array<{ id: string }>) => {
        // Parse URL params
        const params = new URLSearchParams(window.location.search);
        const skipCover = params.has('skipCover');

        // Parse URL path
        const pathname = window.location.pathname;
        const parts = pathname.split('/').filter(Boolean);

        let page = menuItems[0]?.id || '';
        let pageId = '';

        if (parts.length > 0) {
            const matchedItem = menuItems.find(
                item => item.id.toLowerCase() === parts[0].toLowerCase()
            );
            if (matchedItem) {
                page = matchedItem.id;
            }
            if (parts.length > 1) {
                pageId = parts[1];
            }
        }

        set({ skipCover, page, pageId });

        // Listen for browser back/forward buttons
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            const skipCover = params.has('skipCover');

            const pathname = window.location.pathname;
            const parts = pathname.split('/').filter(Boolean);

            let page = menuItems[0]?.id || '';
            let pageId = '';

            if (parts.length > 0) {
                const matchedItem = menuItems.find(
                    item => item.id.toLowerCase() === parts[0].toLowerCase()
                );
                if (matchedItem) {
                    page = matchedItem.id;
                }
                if (parts.length > 1) {
                    pageId = parts[1];
                }
            }

            set({ skipCover, page, pageId });
        };

        window.addEventListener('popstate', handlePopState);
        
        // Return cleanup function
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    },
}));