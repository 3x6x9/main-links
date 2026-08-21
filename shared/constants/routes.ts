export const routes = {
    home: "/",
    signin: "/signin",
    signup: "/signup",
    getStarted: "/get-started",
    dashboard: "/dashboard",
    settings: "/settings",
    pricing: "/pricing",

    user(username: string) {
        return `/u/${username}`;
    }
} as const;
