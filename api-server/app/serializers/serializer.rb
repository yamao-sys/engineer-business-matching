class Serializer
  def self.call(serializer, objects, params = {})
    new(serializer, objects, params).call
  end

  def initialize(serializer, objects, params = {})
    @serializer = serializer
    @objects = [ objects ].flatten

    if @objects.present?
      preloads = serializer.const_get(:PRELOADS) if serializer.const_defined?(:PRELOADS)
      preloads&.each do |associations, scope_lambda|
        if associations.is_a?(Proc)
          instance_exec(params[:params], &associations)
        else
          if scope_lambda
            scope = @objects.first.class.reflect_on_association(associations).klass.instance_exec(&scope_lambda)
          end
          ActiveRecord::Associations::Preloader.new(records: @objects, associations:, scope:).call
        end
      end
    end

    @params = params
  end

  def call
    @objects.count == 1 ? serialize_object : serialize_objects
  end

  def serialize_object
    @serializer.new(@objects.first, @params).serializable_hash[:data][:attributes]
  end

  def serialize_objects
    @serializer.new(@objects, @params).serializable_hash[:data].pluck(:attributes)
  end
end
