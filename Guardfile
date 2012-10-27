require 'guard/guard'
module ::Guard
  class Opal < ::Guard::Guard

    def run_on_change(paths)
      paths.each { |path|
        js_file = path.sub ".rb", ".js"
        system "opal #{path} > #{js_file}"
      }
    end

  end
end


guard "opal" do
  watch /.+\.rb/
end
