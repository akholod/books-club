'use strict';

module.exports = function($state, Restangular, ModalWindow) {
    this.createTradeRequest = function(bookId) {
        return Restangular.one('books', bookId).put()
            .then((response) => {
                return response;
            }, (dataError) => {
                new Error((dataError));
            });
    };
    this.addToUsersBooks = function (book) {
        return Restangular.all('books').post({
            title: book.title,
            language: book.language,
            image: book.thumbnail,
            authors: book.authors,
            pageCount: book.pageCount,
            description: book.description,
        }).then((response) => {
            console.log(response);
            ModalWindow.openModalWindow(response.message, 'Success!');
            $state.go('books');
            return response;
        }, (dataError) => {
            new Error((dataError));
        });
    }
}