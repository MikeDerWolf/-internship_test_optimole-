jest.setTimeout(900000);
let { handler } = require("../index");
test("Test your code", async done => {
		try {
			let response = await handler( { optimoleKey: 'bHVja3k=' });
			expect(new Buffer(response.pass).toString('base64')).toBe('bHVja3k=');
			expect(typeof response.optimized).toBe('object');
			expect(response.optimized.length).toBe(7);
			for (const optimized of response.optimized) {
				expect(typeof optimized.filePath).toBe('string');
				expect(typeof optimized.procent).toBe('number');
				expect(optimized.procent < 80).toBeTruthy();
				expect(optimized.procent > 3).toBeTruthy();
			}
			done();
		}
		catch (err) {
			done(err);
		}
});
