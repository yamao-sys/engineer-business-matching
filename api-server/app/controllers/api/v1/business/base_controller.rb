class Api::V1::Business::BaseController < ApplicationController
  include ErrorFormattable
  include BusinessAuthenticatable
end
