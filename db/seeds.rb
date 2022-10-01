# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding..."

User.create(
  username: "admin",
  password: "admin",
  password_confirmation: "admin",
  admin: true
)

User.create(
  username: "test",
  password: "test",
  password_confirmation: "test",
  admin: false
)

Community.create(
  name: "us-politics",
  description: "a community to discuss all things US policites. feel free to post memes, ask questions, or post links to articles.",
  user_id: 1
)

Community.create(
  name: "dogmemes",
  description: "post your dog memes",
  user_id: 1
)

Community.create(
  name: "football",
  description: "let's talk about the NFL!",
  user_id: 2
)

Post.create(
  title: "me right now",
  text: "me right now",
  image_url: "https://www.rd.com/wp-content/uploads/2020/04/DogMeme1.jpg",
  points: 500,
  community_id: 2,
  user_id: 1,
)

Post.create(
  title: "how i feel",
  text: "",
  image_url: "https://www.rd.com/wp-content/uploads/2020/04/DogMeme2.jpg",
  points: 300,
  community_id: 2,
  user_id: 1,
)

Post.create(
  title: "so serious",
  text: "",
  image_url: "https://www.rd.com/wp-content/uploads/2020/04/DogMeme4.jpg",
  points: 100,
  community_id: 2,
  user_id: 1,
)

Post.create(
  title: "tua shouldn't have been in the game",
  text: "seriously, how can the nfl allow it? the guy couldn't walk straight after last week's hit, then they send him this week so quickly. pretty irresponsible. anything for entertainment, am i right?",
  image_url: "https://sportshub.cbsistatic.com/i/r/2022/09/30/92367559-c2f8-44ab-8fd4-ca1fb9a15ac1/thumbnail/770x433/8070086a2e664c6e99a36735c4f4c590/tua-getty.jpg",
  points: 450,
  community_id: 3,
  user_id: 1,
)

puts "Seeding complete!"