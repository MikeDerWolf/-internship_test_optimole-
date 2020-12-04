const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const imageminGifsicle = require('imagemin-gifsicle'); 
const fs = require('fs');
const path = require('path');
const sizeOfImage = require('image-size')
const sharp = require('sharp');
const {execFile} = require('child_process');
const gifsicle = require('gifsicle');
const svgson = require('svgson');



exports.handler = async function ( event ) {

	let optimized = []

	let receivedKey = event.optimoleKey;
	let buffer = Buffer.from(receivedKey, 'base64');					//decoding optimoleKey
	let message = buffer.toString();


	if (!fs.existsSync('temp')){
		fs.mkdirSync(path.join(__dirname, 'temp'))
  	}
  
  	if (!fs.existsSync('optimized')){
	  fs.mkdirSync(path.join(__dirname, 'optimized'))
  	}


	const images = await imagemin(['images/*.{jpg,png,gif,svg}'],{        //optimization using imagemin
		destination: 'temp',
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality:[0.7, 0.9]
			}),
			imageminGifsicle(),
			imageminSvgo()
		]
	})	


	const files = fs.readdirSync('temp')

	for (file of files) {																		//resizing using different methods for the given images
		try {																					//in order to obtain the same formats	
			if (path.extname(file) == ".jpg" || path.extname(file) == ".png"){
				sharp('temp/' + file)
				.resize({height: 500, width: 500, fit: sharp.fit.inside})
				.toFile('optimized/'+ file)
				
			}

			if (path.extname(file) == ".gif"){
				execFile(gifsicle, ['--resize-fit-width', '500', '-o', 'optimized/'+ file, 'temp/' + file])
			}

			if (path.extname(file) == ".svg"){
				const data = fs.readFileSync('temp/' + file, 
							{encoding:'utf8', flag:'r'}); 


				var obj = svgson.parseSync(data)

				obj.attributes['width'] = '500'
				obj.attributes['height'] = '500'
				obj.attributes['preserveAspectRatio'] = 'xMidYMid meet'


				const mysvg = svgson.stringify(obj)

				fs.writeFileSync('optimized/' + file, mysvg); 
				
			}

			let originalDimensions = sizeOfImage('images/' + file)
			let originalSize = originalDimensions.width * originalDimensions.height
			let modifiedDimensions = sizeOfImage('optimized/' + file)
			let modifiedSize = modifiedDimensions.width * modifiedDimensions.height

			let percentage = (modifiedSize / originalSize) * 100							//calculating the percentage of resizing
			
			optimized.push({filePath: "optimized/" + file, procent: percentage})
		}
		catch(err) {
			console.log(err)
		}
		
	}

	return {pass: message, optimized: optimized}
};
