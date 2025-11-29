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
  end
end

Liquid::Template.register_filter(Jekyll::ShuffleFilter)
