const badConfig = {
   test: i18n('test'),
   another: i18n('another'), 
};

const badConfig2 = [
    i18n('test3'),
    i18n('test6'),
];

const goodConfig = () => {
    return ({
        test: i18n('test'),
        another: i18n('another'),
    });
}