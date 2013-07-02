module.exports = {
    'resulting promise should be rejected after timeout' : function(test) {
        var resPromise = Vow.promise().timeout(10);
        setTimeout(function() {
            test.ok(resPromise.isRejected());
            test.deepEqual(resPromise.valueOf(), new Error('timed out'));
            test.done();
        }, 20);
    },

    'resulting promise should be fulfilled before timeout' : function(test) {
        var resolver,
            origPromise = Vow.promise(function(_resolver) {
                resolver = _resolver;
            }),
            resPromise = origPromise.timeout(20);

        setTimeout(function() {
            resolver.fulfill('val');
        }, 10);

        resPromise.then(function(val) {
            test.strictEqual(val, 'val');
            test.done();
        });
    },

    'resulting promise should be rejected before timeout' : function(test) {
        var resolver,
            origPromise = Vow.promise(function(_resolver) {
                resolver = _resolver;
            }),
            resPromise = origPromise.timeout(20),
            error = new Error('error');

        setTimeout(function() {
            resolver.reject(error);
        }, 10);

        resPromise.then(null, function(_error) {
            test.strictEqual(_error, error);
            test.done();
        });
    }
};