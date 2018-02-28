# sticky-header

AngularJS directive to freeze header of table on the container top. 
Includes possibility to resize columns.

## Installing via bower

bower install ng-sticky-header --save

## Installing via npm

npm i ng-sticky-header

## Using

It has two required directives:

- ```sticky-viewer``` should be set to container which has limited height and causes scroll event on table.
- ```sticky-header``` is set to table element whose header need be sticky.

```html
<div sticky-viewer>
  <table sticky-header>
    ...
  </table>
</div>
```

## Demo

http://codepen.io/titov-max/pen/WxJYry

## Build

Use command ```gulp build``` to concat sources

## Licence

Code licensed under MIT license
