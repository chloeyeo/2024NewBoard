## What will be implemented

-   From a list: implement "see more" (using skip and limit to pull out stored data), search, and sort
-   File Upload: either via 1. manually upload folder + create thumbnail using node.js library, OR 2. use AWS S3 bucket to upload files and use AWS Lambda to make a function; a functional program to create thumbnail and store the uploaded files into the S3 bucket
-   Downsize the uploaded image file by creating a thumbnail with a much smaller size (to control traffic size)
-   Create routes using outlet
-   Create a slider (not using swiper js so slides on button click, does not have on touch swipe)
-   Write posts and create a page
-   Use navigator to move page to list page after finish writing post
-   Query String: frontend sends it as req.params which backend receives it as req.query
-   Checkbox, radio button, search functionality
