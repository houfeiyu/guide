module.exports = {
    appPath: (function () {
        var pathname = window.location.pathname;
        pathname = pathname.replace(/(\/([a-zA-Z]+.html)?)$/gi, '');
        return pathname;
    })(),
    proxyUrl: 'proxyHandler?',
};
