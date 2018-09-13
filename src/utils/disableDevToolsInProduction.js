export default (process.env.NODE_ENV === 'production'
    ? '<script>(function (global){global.__REACT_DEVTOOLS_GLOBAL_HOOK__&&(Object.seal(global.__REACT_DEVTOOLS_GLOBAL_HOOK__).inject=function(){})})(window)</script>'
    : '');
