module Jekyll
  module ShuffleFilter
    # Randomize array items using a seed based on build time
    # This ensures randomization happens at build time, not client-side
    def shuffle_with_seed(input, seed = nil)
      return input unless input.respond_to?(:shuffle)

      # Use build time as seed if not provided
      # This makes the shuffle deterministic for a given build
      seed ||= Time.now.to_i

      # Create a seeded random number generator
      rng = Random.new(seed)

      # Shuffle the array using the seeded RNG
      input.shuffle(random: rng)
    end

    # Simple shuffle without seed (truly random each build)
    def shuffle(input)
      return input unless input.respond_to?(:shuffle)
      input.shuffle
    end

    # Shuffle all items except the first one
    # Useful for randomizing articles while keeping the most recent one separate
    def shuffle_except_first(input)
      return input unless input.respond_to?(:shuffle)
      return input if input.size <= 1

      # Take all elements except the first and shuffle them
      input[1..-1].shuffle
    end
  end
end

Liquid::Template.register_filter(Jekyll::ShuffleFilter)
