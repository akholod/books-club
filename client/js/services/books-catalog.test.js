'use strict';
describe  ('app', function () {
    beforeEach(module('app'));

    describe ('Books catalog service', function () {

        var BooksCatalog,
            $httpBackend,
            $rootScope,
            mockBooks = [{"_id":"5877aafddf4e4511000ed791","bookId":96,"createdAt":"2017-01-12T16:12:45.484Z","owner":"9","image":"https://books.google.com/books/content?id=KOFtT4KMrA0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","language":"ru","title":"Дюма Александр. Три мушкетера. Том 2","__v":0,"requestAccepted":false,"authors":[]},{"_id":"58874fc8a6d0ba1529b6dab8","bookId":106,"createdAt":"2017-01-24T12:59:52.062Z","description":"A new edition of the most comprehensive guide to Ukraine, featuring practical information and in-depth culture and history.","owner":"8","pageCount":440,"image":"http://books.google.com/books/content?id=sxRtNoL-E3cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","language":"en","title":"Ukraine","__v":0,"requestAccepted":false,"authors":["Andrew Evans","Massimiliano Di Pasquale"]}];

        beforeEach(inject(function (_BooksCatalog_, _$httpBackend_) {
            BooksCatalog = _BooksCatalog_;
            $httpBackend = _$httpBackend_;


            $httpBackend.whenGET('/api/books/1').respond(mockBooks[0]);
        }));

        afterEach(inject(function(_$httpBackend_, _$rootScope_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;

            $httpBackend.flush();
            $rootScope.$digest();

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }));

        it('should return books', inject(function () {
            $httpBackend.expectGET('http://localhost:3000/api/books')
                .respond(mockBooks);

            BooksCatalog.getBooks().then(function (res) {
                expect(res[0].bookId).toBe(mockBooks[0].bookId);
                expect(res[0].bookId).not.toBe('');
                expect(res.length).toBe(mockBooks.length);
            });
        }));

        it('should return book by id', inject(function () {
            $httpBackend.expectGET('http://localhost:3000/api/books/96')
                .respond(mockBooks[0]);

            BooksCatalog.getBook(96).then(function (res) {
                expect(res.bookId).toBe(96);
                expect(res.bookId).not.toBe('');
            });
        }));
    });
});

