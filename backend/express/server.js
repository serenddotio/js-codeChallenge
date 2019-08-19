const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = process.env.PORT || 5000;

// Use cors
app.use(cors());

// Console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Request
app.get('/api/', async (req, res, next) => {
	try {
			const response = await axios.get(`https://www.amazon.com/dp/${req.query.asin}`);
			// Captured DOM
			const $ = cheerio.load(response.data);
			// Title
			const title = $('#productTitle').text().trim();
			// Category
			const category = $('.a-list-item').first().text().trim();
			// Ranking
			const ranking = $('#productDetails_feature_div th:contains("Best Sellers Rank")').siblings().text().trim().replace(/\([^()]*\)/g,'').replace(/\s/g,' ');
			// Dimensions
			const dimensions = $('#productDetails_feature_div th:contains(" Dimensions")').siblings().text().trim().replace(/\([^()]*\)/g,'');
			// Image
			const image = $('#imgTagWrapperId img').first().attr('src').replace(/(\r\n|\n|\r)/gm, '');
			
			// Send crawled infomation back to the application
			res.setHeader('Content-Type', 'application/json');
			res.json({ 
				asin: req.query.asin,
				productTitle: title,
				productCategory: category,
				productRanking: ranking,
				productDimensions: dimensions,
				productImage: image
			});
		}
		catch (err) {
			// Pass error with 200 to display the message 
			res.status(200).json(err);
		}
});

