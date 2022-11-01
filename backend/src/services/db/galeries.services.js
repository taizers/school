const FlibustaAPI = require('flibusta').default;
const db = require('../../db/models/index');

const Galery = db.Galery;

class GaleriesService {
  async getGaleries(page, limit) {

    const galeries = await Galery.findAll({ offset: page*limit, limit });

    return galeries;
  }

  // async getBooksByAuthor(id, page, limit) {
  //   const flibustaApi = new FlibustaAPI();
    
  //   const books = await flibustaApi.getBooksByAuthorOpdsPaginated(id, page, limit);
    
  //   return books;
  // }
}

module.exports = new GaleriesService();
