class Api::V1::Talent::BaseController < ApplicationController
  include ErrorFormattable
  include TalentAuthenticatable
end
