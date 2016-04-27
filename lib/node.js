'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = slackOutput;

var _request = require('request');

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint camelcase: "off" */


const levelToSlackColor = {
    [_nightingaleLevels2.default.TRACE]: '#808080',
    [_nightingaleLevels2.default.DEBUG]: '#808080',
    [_nightingaleLevels2.default.INFO]: '#808080',
    [_nightingaleLevels2.default.WARN]: 'warning',
    [_nightingaleLevels2.default.ERROR]: 'danger',
    [_nightingaleLevels2.default.CRITICAL]: 'danger',
    [_nightingaleLevels2.default.FATAL]: 'danger',
    [_nightingaleLevels2.default.EMERGENCY]: 'danger'
};

/**
 * @function
 * @param slackConfig
*/function slackOutput(slackConfig) {
    return (/**
            * @function
            * @param text
            * @param
           */function write(text, _ref) {
            let level = _ref.level;
            let message = _ref.message;

            const body = {
                channel: slackConfig.channel,
                username: slackConfig.username,
                icon_url: slackConfig.iconUrl,
                icon_emoji: slackConfig.iconEmoji,
                attachments: [{
                    fallback: text, // we could use raw-formatter here
                    title: message,
                    color: levelToSlackColor[level],
                    text: text, // eslint-disable-line
                    mrkdwn_in: ['text']
                }]
            };

            (0, _request.post)({ url: slackConfig.webhookUrl, body: body, json: true }).on('error', err2 => console.error(err2.stack));
        }
    );
}
//# sourceMappingURL=node.js.map