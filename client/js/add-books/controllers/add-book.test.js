'use strict';

describe  ('app', function () {
    beforeEach(module('app'));

    describe ('Add book controller', function () {

        var BookSearch,
            BooksActions,
            AddBooksCtrl,
            $controller,
            $q;

        beforeEach(inject(function (_BookSearch_,_BooksActions_ ,_$controller_, _$q_) {
            BookSearch = _BookSearch_;
            BooksActions = _BooksActions_;
            $controller = _$controller_;
            $q = _$q_;
            AddBooksCtrl = $controller('AddBooksCtrl', {BookSearch: BookSearch, BooksActions: BooksActions});

            spyOn(BookSearch, 'findBooks').and.returnValue($q.when());
            spyOn(BooksActions, 'addToUsersBooks').and.returnValue($q.when());
        }));

        it('should be AddBooksCtrl defined and call BookSearch service method', function () {
            expect(AddBooksCtrl).toBeDefined();

            AddBooksCtrl.searchBook('Books');
            expect(BookSearch.findBooks).toHaveBeenCalled();
        });

        it('should be call BooksActions service method', function () {
            AddBooksCtrl.addToUserBooks({});
            expect(BooksActions.addToUsersBooks).toHaveBeenCalled();
        });

    });
});