const movies = require('../../data/movies.json');

const hostIndex = (req, res) => {
  res.render('index');
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

const getData = (req, res) => {
  res.json(movies.filter(m => m.title === 'Taken'));
}

const results = (req, res) => {
  let results = movies;
  if (req.query.title) {
    const lowerTitle = req.query.title.toLowerCase();
    results = results.filter(m => m.title.toLowerCase().includes(lowerTitle));
  }

  if (req.query.year) {
    const year = parseInt(req.query.year, 10);
    results = results.filter(m => m.year === year);
  }

  if (req.query.starring) {
    results = results.filter(m => m.cast.includes(req.query.starring));
  }

  res.render('results', {
    search: req.query,
    movies: results,
  });
}

module.exports = {
  index: hostIndex,
  notFound,
  getData,
  results
};
