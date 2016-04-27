/* eslint camelcase: "off" */
import { post } from 'request';
import levels from 'nightingale-levels';

const levelToSlackColor = {
    [levels.TRACE]: '#808080',
    [levels.DEBUG]: '#808080',
    [levels.INFO]: '#808080',
    [levels.WARN]: 'warning',
    [levels.ERROR]: 'danger',
    [levels.CRITICAL]: 'danger',
    [levels.FATAL]: 'danger',
    [levels.EMERGENCY]: 'danger',
};

export default function slackOutput(slackConfig) {
    return function write(text, { level, message }) {
        const body = {
            channel: slackConfig.channel,
            username: slackConfig.username,
            icon_url: slackConfig.iconUrl,
            icon_emoji: slackConfig.iconEmoji,
            attachments: [
                {
                    fallback: text, // we could use raw-formatter here
                    title: message,
                    color: levelToSlackColor[level],
                    text: text, // eslint-disable-line
                    mrkdwn_in: ['text'],
                },
            ],
        };

        post({ url: slackConfig.webhookUrl, body: body, json: true })
            .on('error', (err2) => console.error(err2.stack));
    };
}
