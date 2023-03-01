# thedevdadbot

## Env

Copy + paste the existing `.env.example` and rename it `.env`
In this file you will need to add your twitch username, oauth token and twitch channel.

Visit https://twitchapps.com/tmi/ to generate a token, this will be `TWITCH_ACCESS_TOKEN`.

For example if my bot's username was `thedevdadbot`, my main channel was `thedevdad_` and the page above gave me `oauth:8ae9ep3d2xgjbp41i5g87fb1s3mg4w`, I would use the following.

```
TWITCH_USERNAME=thedevdadbot
TWITCH_ACCESS_TOKEN=`oauth:8ae9ep3d2xgjbp41i5g87fb1s3mg4w`
TWITCH_CHANNEL=thedevdad_
```

## Development

1. `npm run dev`
2. Profit 💸

## Production

1. `npm run build`
2. `npm run start`
3. Profit 💸


## Tests

Unit tests: `npm run test`
Coverage: `npm run coverage`
