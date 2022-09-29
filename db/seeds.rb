# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Community.create(
  name: "us-politics",
  title: "a place to discuss US politics",
  description: "a community to discuss all things US policites. feel free to post memes, ask questions, or post links to articles."
)

Community.create(
  name: "dogmemes",
  title: "post your dog memes",
  description: "post your dog memes"
)