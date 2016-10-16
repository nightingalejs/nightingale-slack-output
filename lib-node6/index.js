'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slackOutput;

var _request = require('request');

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

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

function slackOutput(slackConfig) {
  return function write(_ref, _ref2) {
    let markdown = _ref.markdown;
    let raw = _ref.raw;
    let level = _ref2.level;
    let message = _ref2.message;

    const body = {
      channel: slackConfig.channel,
      username: slackConfig.username,
      icon_url: slackConfig.iconUrl,
      icon_emoji: slackConfig.iconEmoji,
      attachments: [{
        fallback: raw,
        title: message,
        color: levelToSlackColor[level],
        text: markdown,
        mrkdwn_in: ['text']
      }]
    };

    (0, _request.post)({ url: slackConfig.webhookUrl, body: body, json: true }).on('error', err2 => console.error(err2.stack));
  };
}
//# sourceMappingURL=index.js.map