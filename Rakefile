require 'bundler/setup'
require 'opal/rake_task'

Opal::RakeTask.new do |t|
  t.name = 'game_of_life_opal'
  t.files = '.'
end

task :default => [:opal]
