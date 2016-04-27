'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _levelToSlackColor;

exports.default = slackOutput;

var _request = require('request');

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param obj
 * @param key
 * @param value
*/
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* eslint camelcase: "off" */


var levelToSlackColor = (_levelToSlackColor = {}, _defineProperty(_levelToSlackColor, _nightingaleLevels2.default.TRACE, '#808080'), _defineProperty(_levelToSlackColor, _nightingaleLevels2.default.DEBUG, '#808080'), _defineProperty(_levelToSlackColor, _nightingaleLevels2.default.INFO, '#808080'), _defineProperty(_levelToSlackColor, _nightingaleLevels2.default.WARN, 'warning'), _defineProperty(_levelToSlackColor, _nightingaleLevels2.default.ERROR, 'danger'), _defineProperty(_levelToSlackColor, _nightingaleLevels2.default.CRITICAL, 'danger'), _defineProperty(_levelToSlackColor, _nightingaleLevels2.default.FATAL, 'danger'), _defineProperty(_levelToSlackColor, _nightingaleLevels2.default.EMERGENCY, 'danger'), _levelToSlackColor);

/**
 * @function
 * @param slackConfig
*/function slackOutput(slackConfig) {
    return (/**
            * @function
            * @param text
            * @param
           */function write(text, _ref) {
            var level = _ref.level;
            var message = _ref.message;

            var body = {
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

            (0, _request.post)({ url: slackConfig.webhookUrl, body: body, json: true }).on('error', function (err2) {
                return console.error(err2.stack);
            });
        }
    );
}
//# sourceMappingURL=node.js.map