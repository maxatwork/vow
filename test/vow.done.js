module.exports = {
    'exception should be throwed if argument is a promise' : function(test) {
        var resolver,
            promise = Vow.promise(function(_resolver) {
                resolver = _resolver;
            }),
            e = Error();

        resolver.reject(e);
        Vow.done(promise);

        process.once('uncaughtException', function(_e) {
            test.strictEqual(_e, e);
            test.done();
        });
    },

    'nothing to be happen if argument is not a promise' : function(test) {
        Vow.done('val');
        test.done();
    }
};