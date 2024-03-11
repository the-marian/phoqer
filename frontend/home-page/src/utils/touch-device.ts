export const isTouchDevice = (): boolean => {
    // regex from this npm package https://www.npmjs.com/package/is-mobile
    const mobileDevices =
        /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
    const tabletDevices = /android|ipad|playbook|silk/i;

    return mobileDevices.test(window.navigator.userAgent) || tabletDevices.test(window.navigator.userAgent);
};
