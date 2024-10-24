const API_URLS = {
    AUTH: {
        LOGIN: 'api/auth/login/',
        LOGOUT: 'api/auth/logout/',
        TERMINATE_TOKEN: 'api/auth/terminate-token/'
    },
    USERS: {
        USERS: 'api/users/',
        getUserDetails: (id) => `api/users/${id}/`,
        getUserPermissions: (id) => `api/users/${id}/permissions/`,
        CURRENT_USER: 'api/users/current/',
        CURRENT_USER_PERMISSIONS: 'api/users/current/permissions/'
    },
};
  
export default API_URLS;