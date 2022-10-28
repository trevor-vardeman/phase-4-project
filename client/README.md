# seenit

## GIF Preview

![gif preview](https://i.imgur.com/ad7E7ti.gif)

## Introduction
I wanted to create an app that is much like one of my favorite social media platforms. This would allow users to sign up, login, create communities, and create posts within those communities. They can also upvote and downvote both posts and comments to get their favorite posts to the front page, and their favorite comments to the top of each post, respectively. 

Please see the [video walkthrough](https://youtu.be/joeDw3KDZ2I) if you'd like to see the app in action. Also feel free to check out my [blog post](https://dev.to/trevortx/rails-a-hidden-gem-seed-dump-3hpj) about a gem I found useful during development called Seed Dump.

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