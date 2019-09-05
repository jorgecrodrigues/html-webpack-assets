const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Inject chunks inside tag head or body
 *
 * @param headChunks
 * @param bodyChunks
 * @return {{b: *, h: *}}
 */
function getHeadAndBodyChunks(headChunks, bodyChunks) {
    const onHead = [];
    const onBody = [];

    bodyChunks.forEach(chunk => {
        if (chunk.attributes.src && chunk.attributes.src.includes("head")) {
            onHead.push(chunk);
        } else {
            onBody.push(chunk);
        }
    });

    headChunks.forEach(chunk => {
        if (chunk.attributes.src && chunk.attributes.src.includes("body")) {
            onBody.push(chunk);
        } else {
            onHead.push(chunk);
        }
    });

    return {onHead, onBody};
}

class HtmlWebpackAssetsPlugin {
    apply(compiler) {
        if (HtmlWebpackPlugin.getHooks) {
            compiler.hooks.compilation.tap('HtmlWebpackAssetsPlugin', (compilation) => {
                HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                    'HtmlWebpackAssetsPlugin', (data, callback) => {
                        const ch = getHeadAndBodyChunks(data.headTags, data.bodyTags);
                        data.headTags = ch.onHead;
                        data.bodyTags = ch.onBody;
                        callback(null, data)
                    }
                )
            });
        } else {
            compiler.plugin("compilation", compilation => {
                compilation.plugin("html-webpack-plugin-alter-asset-tags", data => {
                    const ch = getHeadAndBodyChunks(data.head, data.body);
                    data.head = ch.onHead;
                    data.body = ch.onBody;
                });
            });
        }
    }
}

module.exports = HtmlWebpackAssetsPlugin;
