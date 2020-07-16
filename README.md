# Veteran Employment Outcomes Explorer
This is the repostory containing the VEO Explorer application vue2 project. 


### Prereqs
Install [nodejs](https://nodejs.org/en/) and [vue cli](https://cli.vuejs.org/guide/installation.html) and configure for your own environment.

``` 
npm install -g @vue/cli
```

### Install Packages
Install the project dependencies.
```
git clone
npm install
```

### Compiles and hot reload for development
To work on the project locally run a development server on localhost.
```
vue-cli-service serve
```

### Prepare deployment
The application uses vue router which passes the URL path to the application for handling. This works as expected when served from the root website directory (e.g. ```www.website.com```) but requires some configuration if depoloyed elsewhere.

In vue.config.js and src/constants/config set the public path to be the home project directory. If this application is to be served from the root directory then set
```publicPath = "/"``` and ```PUBLICPATH = "/"```. 

If deployment is in a subdirectory, such as ```www.website.com/project/app``` then the path variables should use 
```publicPath = "/project/app"``` and ```PUBLICPATH = "/project/app"```. 

This must be done before building the application files.

### Build and minify for production
Bundle all project files in the dist/ directory. 
```
# if vue cli installed globally
vue-cli-service build --modern

# else
npx vue-cli-service build --modern
```

### Pull to production
Some config variables exist that change across servers. These should be configured better but until then, when pulling new code, run the following.
```
git stash
git pull
git stash pop
```

### Zip all project files in dist/ and deliver to webserver
This process can vary depending on work-flow. Project files are not large but corporate email clients will flag them as malicious and block delivery if sent as an attachment. A good alternative is to upload the zip archive to a [s3 bucket](https://aws.amazon.com/s3/), set the zip file to be "public" in d3, download directly to the webserver, and unzip the archive.

Once files are available on the server, you should be able to view the app.

### Apache config (if deployed to a subdirectory)
The last configuration option is handling the application level routing. Configure apache as follows if not deployed to the webserver root directory.

Using the example deploy directory of ```/project/app``` the following block must be added to the apache vhost for the parent site.
```
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /project/app
      RewriteRule ^project/app/index\.html$ - [L]
      # if the request uri starts with the veo path, and does not exist, pass to index
      RewriteCond %{REQUEST_URI} ^/project/app/. [NC]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /project/app/index.html [L]
    </IfModule>
```
