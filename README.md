# seenit

## Vidoe Walkthrough

[![Link to YouTube video walkthrough](https://img.youtube.com/vi/sbYQtzzUwZA/0.jpg)](https://www.youtube.com/watch?v=sbYQtzzUwZA)

## Introduction
I wanted to create an app that is similar to one of my favorite social media platforms. 

seenit allows users to sign up, login, create communities, create posts anonymously within those communities, and comment on posts. They can also upvote and downvote both posts and comments to get their favorite posts to the front page, and their favorite comments to the top of each post, respectively. 

Admin users have the ability to delete both posts and comments in order to moderate, while users that leave comments have the ability to both edit and delete their own comments.

Feel free to check out my [blog post](https://dev.to/trevortx/rails-a-hidden-gem-seed-dump-3hpj) about a gem I found useful during the development of seddit called Seed Dump.

## Technology
This app uses Ruby on Rails as an API, a PostgreSQL database, and a React front end. More specifically, here's everything you need to run the application:
* Ruby "2.7.4"
* Rails '~> 6.1.3', '>= 6.1.3.2'
* PostgreSQL '~> 1.1'
* Node "16.x"
* React "^17.0.2"
* React-Router-Dom "^6.4.0"
* React-Bootstrap "^2.5.0"
* Heroku CLI

## Deployed App
If you'd like to use the deployed app via Heroku, [click here](https://seenit-flatiron.herokuapp.com/).

## Installation Instructions
1. Navigate to the project's [GitHub page](https://github.com/trevor-vardeman/seenit) and choose your favorite method of downloading the project. I use SSH, so I would click "Code", ensure "SSH" is chosen, and copy the link.
2. Then open your terminal and navigate to a directory in which you'd like to install the app. 
3. Type `git clone` followed by the link you copied from GitHub, and the app should be installed.
`git clone https://github.com/trevor-vardeman/seenit`
4. cd into the project's folder:
`cd seenit`
5. Then type the following command in your terminal to install the Rails dependences: 
`bundle install`
6. Use the following command to install all the React dependencies:
`npm install --prefix client`
7. To start the server, use this command:
`rails s`
8. To start the client, use the following command:
`npm start --prefix client`