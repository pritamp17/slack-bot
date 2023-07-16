# slack-bot
slack-bot using nodejs

- [Demo Vedio](https://youtu.be/_qYv5TRtPQw)

# Run Project locally
- clone this repo
- `npm install`
- create .env file
- `APP_PORT=3017
  EXPRESS_SERVER_PORT=3016
  SLACK_SIGNING_SECRET=
  OPENAI_API_KEY=
  SLACK_BOT_TOKEN=`
- please add this env varaible before npm run dev
- `npm run dev` 
- open another terminal
- download and install ngrok from https://dashboard.ngrok.com/get-started/setup
- run `ngrok http 3017`
# Or for running with docker
- fill the env variables In docker-compose.yml file and save file
- Open a terminal
- cd to project dir
- `docker-compose build`
- `docker-compose up`
-  open new terminal
     - `ngrok http 3017`
     - copy the url generated
     - in api.slack.com create new app
     - at events & subscription section paste **url/slack/events**  url is which we get after running `ngrok http 3017`
- [**setting project with docker - demo Vedio**](https://youtu.be/5i3YxZZ5HU0)
 
# Creating a Slack App and getting  SLACK_SIGNING_SECRET and  SLACK_BOT_TOKEN

## Steps

1. Sign in to the Slack API website: Go to [https://api.slack.com/](https://api.slack.com/) and sign in using your Slack account credentials.

2. Create a new Slack app: Click on "Create an App" to start creating a new app.
   - on left side on Basic Information tab copy `Signing Secret` that will our `SLACK_SIGNING_SECRET`

3. Configure your app:
   - In the left sidebar, click on "OAuth & Permissions".
   -  get `Bot User OAuth Token` which is our `SLACK_BOT_TOKEN`
   - Scroll down to the "Scopes" section and add the necessary scopes for your app's functionality.
   - For bot integration, we will need scopes like `channels:history`, `channels:join`, `chat:write`, `im:read`. `im:history`, `mpim:read`
   - Click on "Save Changes" to save your scope selections.

4. Install your app in your workspace:
   - In the left sidebar, click on "Install App".
   - Review the requested scopes and click on `"Allow"` to install the app in your workspace.

5. Set up event subscriptions:
   - In the left sidebar, click on "Event Subscriptions".
   - Enable events by toggling the switch at the top right of the page.
   - `Enter a Request URL where Slack can send event notifications`  `url/slack/events`.
   - Note- url is one which we get after running `ngrok http 3017`
   - Subscribe to specific events related to bot integration  `app_mention`, `message.im` .
   - Click on "Save Changes" to save your event subscription settings.

# for getting OPENAI_API_KEY
- https://platform.openai.com/account/api-keys
- generate api key and add it to .env and docker-compose.yml

# after running project locally 
- install app on channel
- @botname question ?
