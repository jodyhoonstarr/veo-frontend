# Veteran Employment Outcomes Explorer

This is the repostory containing the VEO Explorer application vue2 project.

## Prereqs

Install [nodejs](https://nodejs.org/en/) and [vue cli](https://cli.vuejs.org/guide/installation.html) and configure for your own environment.

## Install Packages

Install the project dependencies.

```shell
git clone
npm install
```

## Compiles and hot reload for development

To work on the project locally run a development server on localhost.

```shell
npm run dev
```

> Note: the app is configured to run in a subdirectory. Attempts to navigate to the root `/` will likely fail unless configured. Navigate directly to the url displayed in console.

## Prepare deployment

The application uses vue router which passes the URL path to the application for handling. This works as expected when served from the root website directory (e.g. ```www.website.com```) but requires some configuration if depoloyed elsewhere.

In vue.config.js set the public path to be the home project directory. If this application is to be served from the root directory then set
```publicPath = "/"```

If deployment is in a subdirectory, such as ```www.website.com/project/app``` then the path variables should use
```publicPath = "/project/app"```

This must be done before building the application files.

### Build and minify for production

Bundle all project files into the `dist/` directory.

```shell
npm run build
```

At this point all files exist and need to be copied into place

```shell
cp dist/ /tmp/ -r
chmod 755 /tmp/dist -R

# copy into place
sudo su - lehdadm
cd /data/website/applications/veo
rm -rf *
cp /tmp/dist/* .

# cleanup
logout
rm -rf /tmp/dist
```

### Push to all servers

```shell
rsync -avz  /path/to/veo servername:/path/to/veo
```

### Apache config (if deployed to a subdirectory)

The last configuration option is handling the application level routing. Configure apache as follows if not deployed to
the webserver root directory.

Using the example deploy directory of ```/project/app``` the following block must be added to the apache vhost for the
parent site.

```conf
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /project/app
      RewriteRule ^project/app/index\.html$ - [L]
      # if the request uri starts with the veo path, and does not exist, pass to index
      RewriteCond %{REQUEST_URI} ^/project/app/. [NC]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /project/app/index.html [R,L]
    </IfModule>
```

### USWDS Header

The USWDS header is set in to reference `${publicPath}/assets/uswds...` files.
When using the vue router these links don't resolve at the url routing scheme (e.g. `/occupation/detail`)
but should work when properly configured in apache to redirect any virtual directories created by
vue router back to the root index page.
