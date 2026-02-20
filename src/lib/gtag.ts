export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID as string;

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

// 页面访问
export const pageview = (url: string) => {
    window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
};

// 自定义事件
export const event = (
    action: string,
    params?: Record<string, any>
) => {
    window.gtag("event", action, params);
};