import { amazon, db } from '../api/api';


describe('Basic API test', () => {
	test('GET /', async () => {
 		const response = await amazon.get('/api/',  { params: 'B07L95Y5C9' });
		expect(response.status).toEqual(200);
 		expect(response.statusText).toContain('OK');
 	});
});

describe('JSON Server Post Test', () => {
	test('POST /', async () => {
 		const response = await db.post('/products', {
 			asin: "B0761NDT8X",
 			productCategory: "Office Products",
 			productDimensions: "11.3 x 5.8 x 0.7 inches",
 			productImage: "data:image/jpeg;base64,/9j/4AAQSkZJR...",
 			productRanking: "#10,836 in Office Products  #300 in Gel Ink Pens",
 			productTitle: "Feela 360 Colors Gel Pens Set 180 Unique Gel Pen Plus 180 Refills for Adult Coloring Books Drawing"

 		})
		expect(response.status).toEqual(201);
 	});
});