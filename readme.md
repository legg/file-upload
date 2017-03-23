This demo shows how to plumb together file upload, and image preview with standard html input type=file in React

Start the app

    npm start
    
Start the mock api

    npm run api

The mock api is created with a raml file and raml-mock-server. It's there to show how to GET and POST the same data.

To select and preview an image I used <input type="file"/>, onChange gets the base64 URL object of the image, which is used as the image src.

To upload I take the same base64 and wrap it in a FormData object then pass it to body prop of fetch POST.

To preview the image from the api is there to show GET/POST of the image.