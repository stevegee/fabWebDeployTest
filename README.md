Fabric Test Deploy
================
Basic testing instructions

## Option 1 - change the index page 

edit fabulous/index.html (anything works)

## Option 2 - change the main image

execute the following from the project root

you are looking to change the image0# ... there are 3 images so 1,2,3 all generate new visuals

rm -rf fabulous/img/test.jpg;cp fabulous/img/image0?.jpg fabulous/img/test.jpg

## Option 3 - change the css file

edit fabulous/css/fabulous.css 

set the color to any of the following colors ...

- FFFF00 	Yellow
- FF9900  Orange
- FF0000	Red
- 99FF00	Neon
- 990000	Maroon
- 669900	Green
- 330099	Blue

Push it back into git

git add .

git commit -m "I love testing and noodles"

git push origin master

... 

test your Fabric configuration
