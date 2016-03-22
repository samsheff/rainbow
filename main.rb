require 'bundler/setup'
require 'json'

Bundler.require

def init_database
  set :database, 'sqlite://colors.db'

  migration "create the colors table" do
    database.create_table :colors do
      primary_key :id
      string      :colors
      string      :date
      string      :likes

      index :likes
      index :id
      index :date
    end
  end unless database.table_exists? :colors
end

Sequel.connect('sqlite://colors.db')

class Colors < Sequel::Model
  def to_itemer
      "itemer('#{id}', '#{colors}', '#{date}', '#{likes}');"
  end

end

configure do
  init_database
end

get "/" do
  redirect "/index.html"
end

get "/c/:id" do
  color = Colors[params[:id]]
  erb :color, locals: { itemer: color.to_itemer, color_id: color.id, color_code: color.colors }
end

post "/get" do
  colors_string = "<script>"

  colors = database[:colors].to_a
  colors.each { |c| colors_string += "itemer('#{c[:id]}', '#{c[:colors]}', '#{c[:date]}', '#{c[:likes]}');"}

  colors_string += "</script>"

  colors_string
end

post "/act" do
  color = Colors.create(colors: params["code"].to_s, date: Date.today.strftime("%-m/%-d/%Y"), likes: Random.rand(100))

  color.id.to_s
end

post "/like" do
  color = Colors[params[:id]]

  color.likes += 1
  color.save

  color.id.to_s
end

