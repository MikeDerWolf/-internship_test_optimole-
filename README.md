# Optimole Internship Test

<b> Requirements: </b> 

<ul><li> 
	 You will build a Node.js script that will optimize all images from the folder
	  with the same name and resize the images as close to 500px X 500px while keeping
	   the image aspect ratio, the optimized/resized images can be saved in the most suitable 
	   format 
	</li>
	<li>
	 The processed images will be stored in a new folder called "optimized" and will 
	have the same name as the original ones (extension may vary) 
	</li>
	<li>
	 For optimizing/resizing I recommend using some of the following node packages: 
	 <ul>
	 <li>
	   Sharp: https://www.npmjs.com/package/sharp
	 </li>
	 <li> 
		Imagemin: https://www.npmjs.com/package/imagemin
	 </li>
	 <li>
		Jimp: https://www.npmjs.com/package/jimp
	 </li>     
	 </ul>
	 These are just suggestions, if you feel like using something else be free to do so
	</li>
	<li>
	 The main code of you your script will be written on the exported handler from index.js file
	</li>
	<li>
	  Your code will receive only one parameter which is a js object and contains one key named 
	  "optimoleKey" which stores some data encoded as a base64 string. You will decode that and
	  return it under the key "pass" in the final returned object of your script. 
	</li>
	<li>
		Your code will return an object after processing all images which will contain besides the
		above mentioned "pass" key, one key named "optimized" which will contain an array of objects,
		each object of the array will contain two keys : <ul>
		<li>"filePath" which contains the path to
		the optimized image </li>
		<li> "procent": which contains a number representing how much smaller is the optimized image
		compared to the original one</li>
		 </ul>
		Returned  object example: <br>
	</li>      
</ul>  

```javascript
{ 
  pass: "secret",
  optimized : [
	{filePath :"optimized/image1.jpg", procent : 70},
	{filePath :"optimized/image2.png", procent :60},
             ]
}
```


<b> Observations: </b>
<ul>
<li> 
You will clone this repository, add on it your code, then send us a link to the repository where you 
added your solution so we can check it out
</li>
<li>
If the resize part is to hard for you do just the optimize part and send the script as is
</li>
<li>
If you get stuck at some point send what you had build and we will look at it
</li>
<li>
You can run `npm run test` to check your code
</li>
<li>
Bonus: if you want to step out add some tests besides the existing one under `__tests__`
</li>
</ul>
