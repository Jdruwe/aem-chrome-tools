<img align="left" width="80" height="80" src="https://github.com/Jdruwe/aem-chrome-tools/blob/master/icons/icon128.png?raw=true" alt="AEM Chrome Tools Logo">

# AEM Chrome Tools

## Features

### Environment Display

This feature will allow you to easily identify which environment you are working on. The following screens are supported:

* Default UI
* CRX Develop
* CRX Package Manager

<img src="https://github.com/Jdruwe/aem-chrome-tools/blob/master/plugin-src/images/environment-display.png?raw=true"
     width="500"/>

### Component Detail

This feature will allow you to easily open up the corresponding node of your component in CRX Develop.

<img src="https://github.com/Jdruwe/aem-chrome-tools/blob/master/plugin-src/images/component-detail.gif?raw=true"
     width="500"/>

## Other

### Import Settings

Share your settings with others and switch between multiple configurations with ease. The current format is the following:

```
{
   "environments":[
      {
         "url":"http://your-production.domain",
         "color":"#FF0000"
      },

      {
         "url":"http://your-acceptance.domain",
         "color":"#FFA500"
      },
      {
         "url":"http://your-test.domain",
         "color":"#0000FF"
      },
      {
         "url":"http://localhost:4502",
         "color":"#008000"
      }
   ],
   "features":{
      "environmentDisplay":false,
      "componentDetail":true
   }
}

```

## Planned

* Export functionality
