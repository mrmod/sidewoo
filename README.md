# SideWoo

A way for businesses to communicate events and happenings in their community.

## Status: Abandoned

Eventually, planning sessions for the project revealed Slack was simpler and more appropriate for what Sidewoo was trying to use. This was co-developed with my partner and I think the landscape of what is available wasn't really known to them. A good lesson, for sure, when following an idea is having a brief discussion about the existing landscape.

## What worked

Vue. This was my first Vue project and I really enjoyed working with it. It was light, simple to reason about, and just worked.

## What didn't

Using a lot of polymorphic models, and, using Vue. The project (probably) could have been run from server rendered HTML and worked fine with a sprinkling of Javascript here and there. Meanwhile, the models where built anticipating features because I dislike `ALTER TABLE`-style migrations. `YAGNI for code, YAGNI for models` is my new tattoo.

## Final Thoughts

I would choose Vue over React and wouldn't shy away from trying to convert other projects to it. React has the heavy feel of Java these days while Vue is like sunshine.

This project reminded me of the joy of writing Ruby. It's a language I don't use much these days, instead writing in Python, JS, or Go, and it's a little sad. Perhaps in the future there'll be another project idea it's well suited for so we can spend more time together.

## Prerequisites

* A Google API key for Google maps

## Building

```
bundle install
yarn install
```

## Running

```
./start_postgres.sh
rails s
# OR
./start_prod.sh
```