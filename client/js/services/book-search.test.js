'use strict';

describe  ('app', function () {
    beforeEach(module('app'));

    describe ('Books search service', function () {

        var BookSearch,
            $httpBackend;

        beforeEach(inject(function (_BookSearch_, _$httpBackend_) {
            BookSearch = _BookSearch_;
            $httpBackend = _$httpBackend_;
            $httpBackend.whenPOST('/api/books').respond({ message: 'Book added'});
        }));

        it('should return susses message', inject(function () {
            BookSearch.findBooks('Test').then(function (res) {
                expect( typeof res.message).toBe('string');
                expect( res.message).toBe('Book added');
            });
        }));

    });
});

