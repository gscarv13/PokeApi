# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'net/http'

pokemon_counter = 252
    base_url = 'https://pokeapi.co/api/v2/pokemon'
  
    while pokemon_counter < 387
      uri = URI("#{base_url}/#{pokemon_counter}")
      res = Net::HTTP.get(uri)
      json = JSON.parse(res)
  
      poke = {
        name: json['name'],
        base_experience: json['base_experience'],
        image: json['sprites']['versions']['generation-v']['black-white']['animated']['front_default'],
      }
  
      pp = Pokemon.create(poke)
      puts "created #{pp.name}"
      pokemon_counter += 1
end
