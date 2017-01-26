'use strict';

describe  ('app', function () {
    beforeEach(module('app'));

    describe ('Books catalog controller', function () {

        var BooksCatalog,
            BooksActions,
            BooksCtrl,
            $controller,
            $q;

        beforeEach(inject(function (_BooksCatalog_,_BooksActions_ ,_$controller_, _$q_) {
            BooksCatalog = _BooksCatalog_;
            BooksActions = _BooksActions_;
            $controller = _$controller_;
            $q = _$q_;
            BooksCtrl = $controller('BooksCtrl', {BooksCatalog: BooksCatalog, BooksActions: BooksActions});

            spyOn(BooksActions, 'createTradeRequest').and.returnValue($q.when());
        }));

        it('should be BooksCtrl defined', function () {
            expect(BooksCtrl).toBeDefined();
        });
        it('should be call BooksActions service method', function () {
            BooksCtrl.createTradeRequest(12);
            expect(BooksActions.createTradeRequest).toHaveBeenCalled();
        });

    });
});