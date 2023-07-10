# slack-bot
slack-bot using nodejs

[![demo vedio]([demo](https://drive.google.com/file/d/1lYTsMgavZNvjz5lSs_Zmpgr1OVNOy1Rr/view?usp=sharing)https://drive.google.com/file/d/1lYTsMgavZNvjz5lSs_Zmpgr1OVNOy1Rr/view?usp=sharing)](https://drive.google.com/file/d/1lYTsMgavZNvjz5lSs_Zmpgr1OVNOy1Rr/view?usp=sharing)

# Run Project locally
- clone this repo
- `npm install`
- create .env file
- `APP_PORT=3017
  EXPRESS_SERVER_PORT=3016
  SLACK_SIGNING_SECRET=
  OPENAI_API_KEY=
  SLACK_BOT_TOKEN=`
- `npm run dev`
- open another terminal
- download and install ngrok from https://dashboard.ngrok.com/get-started/setup
- run `ngrok http 3017`
  
# Creating a Slack App and getting  SLACK_SIGNING_SECRET and  SLACK_BOT_TOKEN

## Steps

1. Sign in to the Slack API website: Go to [https://api.slack.com/](https://api.slack.com/) and sign in using your Slack account credentials.

2. Create a new Slack app: Click on "Create an App" to start creating a new app.

3. Provide basic information:
   - Enter an App Name for your Slack app.
   - Select the Workspace where you want to install the app.
   - Click on "Create App" to proceed.
   - on left side on Basic Information tab copy `Signing Secret` that will our `SLACK_SIGNING_SECRET`

4. Configure your app:
   - In the left sidebar, click on "OAuth & Permissions".
   - Scroll down to the "Scopes" section and add the necessary scopes for your app's functionality.
   - For bot integration, you may need scopes like `channels:history`, `channels:join`, `chat:write`, `im:read`. `im:history`, `mpim:read`
   - Click on "Save Changes" to save your scope selections.

5. Install your app in your workspace:
   - In the left sidebar, click on "Install App".
   - Review the requested scopes and click on `"Allow"` to install the app in your workspace.

6. Retrieve OAuth access tokens:
   - In the left sidebar, click on "OAuth & Permissions".
   - Under the `& Redirect URLs"` section, you will find your `OAuth Access Token` which is our `SLACK_BOT_TOKEN`.
     - Make sure to copy this token as it will be required for authenticating requests from your app.

7. Set up event subscriptions:
   - In the left sidebar, click on "Event Subscriptions".
   - Enable events by toggling the switch at the top right of the page.
   - `Enter a Request URL where Slack can send event notifications`  `url/slack/events`.
   - Note- URL is one which we get after running `ngrok http 3017`
   - Subscribe to specific events related to bot integration  `app_mention`, `message.im` .
   - Click on "Save Changes" to save your event subscription settings.
   - 
9. Install the app to your workspace:
   - In the left sidebar, click on "App Home".
   - Click on "Install App to Workspace" and follow any additional prompts.
