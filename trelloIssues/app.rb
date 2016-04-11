# app.rb

require 'bundler/setup'
require 'sinatra/base'
require "sinatra/reloader"

class TrelloIssues < Sinatra::Base

  configure :development do
    register Sinatra::Reloader
    enable :logging
  end

  get '/' do
    'Hello world! '
  end

  post '/test' do
    logger.info "loading some data"
    halt 401, 'fuck of'
  end

end