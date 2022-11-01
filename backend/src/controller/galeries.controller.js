const galeriesService = require('../services/db/galeries.services.js');

class GaleriesController {
  async getGaleries(req, res, next) {
    try {
      const {page, limit} = req.query;

      const galeries = await galeriesService.getGaleries(page, limit);
      
      res.status(200).json(galeries);
    } catch (error) {
      next(error);
    }
  }

  // async getBooksByAuthor(req, res, next) {
  //   try {
  //     const {id, page, limit} = req.query;

  //     const books = await booksService.getBooks(id, page, limit);
      
  //     res.status(200).json(books);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = new GaleriesController();
