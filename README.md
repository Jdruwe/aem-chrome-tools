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

The current implementation is using the `location.startsWith` strategy, keep this in mind when specifying your environments.

### Component Detail

This feature will allow you to easily open up the corresponding node of your component in CRX Develop.

<img src="https://github.com/Jdruwe/aem-chrome-tools/blob/master/plugin-src/images/component-detail.gif?raw=true"
     width="500"/>

## Other

### Import/Export Settings

Share your settings with others and switch between multiple configurations with ease. The current format is the following:

```
{
   "environments":[
      {
         "url":"https://your-production.domain",
         "color":"#FF0000"
      },

      {
         "url":"https://your-acceptance.domain",
         "color":"#FFA500"
      },
      {
         "url":"https://your-test.domain",
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

## Development

* Local development
    * yarn start
* Production build
    * yarn build_prd

### OneFlow

I am testing out the OneFlow's branching model in this repository, more information can be found <a  target="_blank" href="https://www.endoflineblog.com/oneflow-a-git-branching-model-and-workflow">here</a>.