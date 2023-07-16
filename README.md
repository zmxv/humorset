# HumorSet

HumorSet is a data set to evaluate AI model's sense of humor and ability to explain jokes.

## humorset-1
**humorset-1** contains a JSON-formatted list of 128 short jokes in English that involve puns, irony, self-references, absurdity, cultural references, dark humor, and multilingual wordplay (selected from [TEG](https://playteg.com) puzzles). A few of them might be a little bit offensive, but none are sexual.

For each AI explanation, a score between 0 and 1 is rated by a human judge:
* 0: AI doesn't get the joke at all or refuses to answer.
* 0.25: AI misses the key point.
* 0.5: AI gives a partial explanation.
* 0.75: AI explains the joke with minor issues.
* 1: AI interprets the joke well.

The final score is simply the sum of all ratings.

## Preliminary results

| model | score |
|-------|-------|
| GPT-4 | 125 / 128 (97.7%) |
| Claude 2| 104 / 128 (81.3%) |


## Future work
* Evaluate other LLMs
* Curate long-form jokes
* Curate jokes in other languages
* Judge AI output with AI
